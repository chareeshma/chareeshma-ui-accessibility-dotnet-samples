# JAWS / NVDA testing notes

**Status: not manually tested.** This environment does not provide JAWS or NVDA,
and no human screen-reader session has been conducted. The notes below are a
test record template, not test results. Playwright and axe checks are recorded
separately in `axe-results.md`.

## Test environment

| Screen reader | Version | Browser / version | OS | Date | Tester |
| --- | --- | --- | --- | --- | --- |
| JAWS | Not run | Not run | Not run | Not run | Not run |
| NVDA | Not run | Not run | Not run | Not run | Not run |

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

No JAWS or NVDA findings are available until the checks above are performed by a
tester with those assistive technologies.
