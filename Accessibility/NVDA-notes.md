# NVDA manual testing notes

**Status: performed, as reported by the maintainer.** These notes record manual
NVDA checks of the React and Angular samples. The original record lists NVDA
2024.x and Chrome (latest), but does not include exact versions, OS, test date,
or a named tester. The observations below are a summary, not a verbatim
transcript. They do not establish WCAG conformance.

## Areas checked and reported observations

- **Headings and landmarks:** heading hierarchy and main/form landmarks were
  navigable and announced.
- **Form controls and validation:** labels and required state were announced;
  invalid submissions exposed associated error messaging.
- **Keyboard and focus:** reported focus order was logical; dialog focus entry,
  containment, Escape dismissal, and return focus behaved as expected.
- **Menu and table:** the React menu's role/state and keyboard interactions and
  the React table's header associations were reported to work as expected.

The original findings reported no NVDA issues. Record exact application states,
browser/OS versions, date, and detailed observed announcements when refreshing
this test record. See [`screen-reader-notes.md`](screen-reader-notes.md) for a
repeatable checklist. JAWS testing is not recorded here.
