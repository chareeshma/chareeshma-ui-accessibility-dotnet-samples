# Accessibility verification checklist

This checklist tracks implementation and evidence; it does not certify WCAG
conformance. Automated checks and code inspection do not replace manual
verification in supported browsers, assistive technologies, and user testing.

## Implemented patterns (verify on changes)

- [x] Semantic headings, landmarks, labels, buttons, and native table markup are
  present in the samples.
- [x] Dialogs set initial focus, contain Tab navigation, support Escape, and
  restore focus to their trigger.
- [x] React action menu documents and implements its supported keyboard keys.
- [x] Form hints and errors are programmatically associated, and invalid form
  submission presents a focusable error summary.
- [x] Visible focus styling and responsive layouts are implemented.

These are implementation observations, not proof that every criterion passes in
every browser or assistive technology.

## Automated verification

- [x] Playwright interaction and axe tests are configured in `tests/`.
- [x] A generated axe report is committed for seven application states.
- [ ] Re-run `npm test` after changes and retain the CI result.
- [ ] Identify and manually resolve or disposition the axe incomplete checks.

## Manual verification status

- [ ] Record standalone keyboard-only checks in both applications, including
  browser, viewport, steps, and results.
- [x] WAVE extension checks in Chrome have been performed (maintainer-reported);
  add dates, extension/browser versions, tested states, and screenshot mapping.
- [x] NVDA checks have been performed (maintainer-reported); add exact version,
  browser/OS, date, and per-component observations. JAWS testing is not recorded.
- [ ] Verify contrast, zoom/reflow at 200% and 400%, and forced-colors behavior
  in target browsers.
- [ ] Review the WCAG mapping against actual components and verified results.

See the [accessibility overview](Accessibility-README.md), [WCAG mapping](WCAG-2.1-AA-Mapping.md),
and [evidence status](../Accessibility/remediation-summary.md).
