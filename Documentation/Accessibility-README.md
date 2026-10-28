# Accessibility Overview

This repository contains React and Angular examples of accessible UI patterns,
automated browser checks, and accessibility documentation. These are learning
samples, not a WCAG conformance claim or a substitute for testing with users and
assistive technology.

## Components

- **React:** native modal, action menu, validated form, and keyboard-navigable
  semantic table. The action menu is not a listbox or select replacement.
- **Angular:** reactive form with associated labels, hints, validation errors,
  an error summary, and a native review dialog.

See the [React guide](../react/README.md) and
[Angular guide](../angular/README.md) for component behavior and keyboard
instructions.

## Verification status

- Playwright exercises keyboard interactions, form validation, focus behavior,
  and responsive layouts for both applications.
- The axe report records seven automated page-state scans. The report includes
  incomplete-rule counts, which still require manual review; zero violations
  does not establish conformance.
- Maintainer-reported manual testing was performed with the WAVE browser
  extension in Chrome and with NVDA. The repository includes WAVE screenshots
  and NVDA notes. Exact test dates, browser/extension versions, and a complete
  screenshot-to-state mapping are not recorded.
- JAWS testing is not documented as performed.

Use the [accessibility checklist](Accessibility-Checklist.md) to track
verification. The manual testing status is based on the maintainer's report;
the remaining documentation gaps are to add reproducible session metadata and
map each screenshot to its tested state.

## WCAG and design documentation

- [WCAG 2.1 AA mapping](WCAG-2.1-AA-Mapping.md) describes relevant criteria and
  sample implementation points; it is not a conformance statement.
- [Design-system implementation](Design-System-Implementation.md) documents
  shared layout and interaction conventions.
- [Accessibility evidence and remediation status](../Accessibility/remediation-summary.md)
  records automated results and outstanding manual verification.
