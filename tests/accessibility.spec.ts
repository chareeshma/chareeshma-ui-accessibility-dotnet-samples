import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const reactUrl = 'http://127.0.0.1:5173';
const angularUrl = 'http://127.0.0.1:4200';

test('React modal contains focus, closes with Escape, and restores focus', async ({ page }) => {
  await page.goto(reactUrl);
  const opener = page.getByRole('button', { name: 'Open accessible modal' });
  await opener.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('heading')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: 'Close modal' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(dialog.getByLabel('Try typing a note')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: 'Close modal' })).toBeFocused();
  await dialog.getByRole('button', { name: 'Close modal' }).click();
  await expect(opener).toBeFocused();
  await opener.click();
  await page.keyboard.press('Tab');
  await expect(dialog.getByLabel('Try typing a note')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Close modal' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(dialog.getByLabel('Try typing a note')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: 'Close modal' })).toBeFocused();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test('React menu supports arrows, boundaries, selection, Tab, and outside dismissal', async ({ page }) => {
  await page.goto(reactUrl);
  const trigger = page.getByRole('button', { name: 'Item actions' });
  await trigger.focus();
  await page.keyboard.press('ArrowUp');
  await expect(page.getByRole('menuitem', { name: 'Share item' })).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'View details' })).toBeFocused();
  await page.keyboard.press('End');
  await expect(page.getByRole('menuitem', { name: 'Share item' })).toBeFocused();
  await page.keyboard.press('Home');
  await page.keyboard.press('Enter');
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('status').filter({ hasText: 'View details selected' })).toBeVisible();
  await page.keyboard.press('Space');
  await expect(page.getByRole('menu')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.keyboard.press('Shift+Tab');
  await expect(trigger).toBeFocused();
  await expect(page.getByRole('menu')).not.toBeVisible();
  await trigger.click();
  await page.keyboard.press('Tab');
  await expect(page.getByLabel('Name (required)')).toBeFocused();
  await expect(page.getByRole('menu')).not.toBeVisible();
  await trigger.click();
  await page.getByRole('heading', { level: 1 }).click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('React table provides one tab stop and bounded two-dimensional navigation', async ({ page }) => {
  await page.goto(reactUrl);
  const first = page.getByRole('rowheader', { name: 'Semantic structure' });
  await first.focus();
  await page.keyboard.press('ArrowLeft');
  await expect(first).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await expect(first).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('cell', { name: 'Complete', exact: true })).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('cell', { name: 'In review' })).toBeFocused();
  await page.keyboard.press('Home');
  await expect(page.getByRole('rowheader', { name: 'Keyboard support' })).toBeFocused();
  await page.keyboard.press('End');
  await expect(page.getByRole('cell', { name: 'Alex' })).toBeFocused();
  await page.keyboard.press('Control+End');
  await expect(page.getByRole('cell', { name: 'Jordan' })).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('cell', { name: 'Jordan' })).toBeFocused();
  await expect(page.locator('tbody [tabindex="0"]')).toHaveCount(1);
  await page.keyboard.press('Control+Home');
  await expect(first).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('button', { name: 'Validate details' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(first).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('tbody :focus')).toHaveCount(0);
});

for (const sample of [
  { name: 'React', url: reactUrl, submit: 'Validate details' },
  { name: 'Angular', url: angularUrl, submit: 'Review details' },
]) {
  test(`${sample.name} form labels, errors, focus recovery, and success`, async ({ page }) => {
    await page.goto(sample.url);
    const name = page.getByLabel('Name (required)', { exact: true });
    const email = page.getByLabel('Email (required)', { exact: true });
    const submit = page.getByRole('button', { name: sample.submit });
    await submit.click();
    await expect(page.locator('.error-summary')).toBeFocused();
    await expect(name).toHaveAttribute('aria-invalid', 'true');
    await expect(email).toHaveAttribute('aria-describedby', /email-error/);
    await page.getByRole('link', { name: 'Enter your name.' }).click();
    await expect(name).toBeFocused();
    await name.fill('   ');
    await submit.click();
    await expect(name).toHaveAttribute('aria-invalid', 'true');
    await name.fill('Alex Taylor');
    await email.fill('not-an-email');
    await submit.click();
    await expect(page.locator('.error-summary')).toBeFocused();
    await expect(page.getByRole('link', { name: 'Enter an email address such as alex@example.com.' })).toBeVisible();
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    await email.fill('alex@example.com');
    await email.press('Enter');
    await expect(name).toHaveAttribute('aria-invalid', 'false');
    await expect(page.locator('.error-summary')).toHaveCount(0);
    if (sample.name === 'Angular') {
      const dialog = page.getByRole('dialog');
      await expect(dialog.getByRole('heading')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(dialog.getByRole('button', { name: 'Back to form' })).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(dialog.getByRole('button', { name: 'Confirm details' })).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(dialog.getByRole('button', { name: 'Back to form' })).toBeFocused();
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
      await page.keyboard.press('Escape');
      await expect(submit).toBeFocused();
      await submit.press('Enter');
      await page.getByRole('button', { name: 'Back to form' }).click();
      await expect(submit).toBeFocused();
      await submit.press('Enter');
      await page.getByRole('button', { name: 'Confirm details' }).click();
      await expect(submit).toBeFocused();
    }
    await expect(page.getByRole('status').filter({ hasText: 'Your details are valid.' })).toBeVisible();
    await email.fill('changed@example.com');
    await expect(page.getByRole('status').filter({ hasText: 'Your details are valid.' })).toHaveCount(0);
  });

  test(`${sample.name} mobile-first layout, landmarks, and automated accessibility checks`, async ({ page }) => {
    await page.goto(sample.url);
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('main')).toBeFocused();
    for (const width of [320, 375, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const columns = await page.locator('.sample-grid').evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length);
      expect(columns).toBe(width < 768 ? 1 : 2);
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    }
  });
}
