import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const scans: { app: string; state: string; violations: unknown[]; passes: number; incomplete: number }[] = [];

async function scan(page: Page, app: string, state: string): Promise<void> {
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  scans.push({
    app,
    state,
    violations: result.violations.map(({ id, impact, help, helpUrl, nodes }) => ({
      id,
      impact,
      help,
      helpUrl,
      affectedElements: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
    })),
    passes: result.passes.length,
    incomplete: result.incomplete.length,
  });
}

test('save axe scan results for the React and Angular sample states', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://127.0.0.1:5173');
  await scan(page, 'React', 'Initial page');
  await page.getByRole('button', { name: 'Validate details' }).click();
  await scan(page, 'React', 'Form validation errors');
  await page.getByRole('button', { name: 'Open accessible modal' }).click();
  await scan(page, 'React', 'Modal open');
  await page.getByRole('dialog').getByRole('button', { name: 'Close modal' }).click();
  await page.getByRole('button', { name: 'Item actions' }).click();
  await scan(page, 'React', 'Action menu open');

  await page.goto('http://127.0.0.1:4200');
  await scan(page, 'Angular', 'Initial page');
  await page.getByRole('button', { name: 'Review details' }).click();
  await scan(page, 'Angular', 'Form validation errors');
  await page.getByLabel('Name (required)').fill('Alex Taylor');
  await page.getByLabel('Email (required)').fill('alex@example.com');
  await page.getByRole('button', { name: 'Review details' }).click();
  await scan(page, 'Angular', 'Review dialog open');

  const report = [
    '# axe-core scan results',
    '',
    `- Run date (UTC): ${new Date().toISOString()}`,
    `- Browser: ${await page.evaluate(() => navigator.userAgent)}`,
    '- Engine: axe-core via @axe-core/playwright',
    '- Ruleset tags: WCAG 2.0 A/AA and WCAG 2.1 A/AA (`wcag2a`, `wcag2aa`, `wcag21aa`)',
    '- Scope: rendered page at each named state; automated scan only.',
    '',
    ...scans.flatMap(result => [
      `## ${result.app} — ${result.state}`,
      '',
      `- Violations: ${result.violations.length}`,
      `- Passing rules: ${result.passes}`,
      `- Incomplete rules: ${result.incomplete}`,
      ...(result.violations.length
        ? ['', '### Findings', '', '```json', JSON.stringify(result.violations, null, 2), '```']
        : ['- Findings: none.']),
      '',
    ]),
    'Automated axe results do not establish WCAG conformance and do not replace manual review.',
    '',
  ].join('\n');

  const output = path.join(process.cwd(), 'Accessibility', 'axe-results.md');
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, report, 'utf8');
  await context.close();
  expect(scans.flatMap(result => result.violations), 'axe reported accessibility violations').toEqual([]);
});
