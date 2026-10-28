# JAWS / NVDA testing notes

**Status: NVDA testing performed (maintainer-reported); JAWS not recorded.**
See [`NVDA-notes.md`](NVDA-notes.md) for the existing summary. This file is a
checklist for adding detailed session results; it is not itself a record that
every listed check was completed. Playwright and axe checks are recorded
separately in `axe-results.md`.

## Test environment

| Screen reader | Version | Browser / version | OS | Date | Tester |
| --- | --- | --- | --- | --- | --- |
| JAWS | Not run | Not run | Not run | Not run | Not run |
| NVDA | 2024.x (exact version not recorded) | Chrome, latest (exact version not recorded) | Not recorded | Not recorded | Maintainer-reported |

## Checks to perform

For each application and screen reader, record observed speech, unexpected
behavior, and pass/fail for the following:

- Navigate headings and landmarks; activate the skip link and confirm focus lands
  on main content.
- Confirm each form label and hint is announced with the corresponding field.
- Submit an empty form; confirm the focused error summary and its links are
  announced and can move focus to each invalid field.
- Correct the fields; confirm invalid state and error associations are removed.
- Open the modal/review dialog; check its name, description, initial focus,
  Tab/Shift+Tab behavior, Escape dismissal, and focus restoration.
- In React, check the action menu's expanded state, item roles/names, arrow-key
  behavior, Escape dismissal, and Tab exit.
- Navigate the table using the screen reader's table-navigation commands and
  verify the caption and row/column headers are announced.
- Confirm success feedback is announced without unexpectedly moving focus.

## Findings

The existing NVDA summary reports no issues. Add detailed results and complete
the missing environment metadata when the test record is next updated. No JAWS
results are recorded.
