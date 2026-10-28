# WCAG 2.1 AA implementation mapping

This is a guide to relevant criteria and sample implementation points, not a
conformance assessment. Applicable criteria depend on the complete page and
user-agent behavior. Playwright/axe results and outstanding manual verification
are summarized in [`../Accessibility/remediation-summary.md`](../Accessibility/remediation-summary.md).

| Sample | Relevant criteria | Implementation points and verification limits |
| --- | --- | --- |
| React action menu | 1.3.1 Info and Relationships; 2.1.1 Keyboard; 2.4.3 Focus Order; 2.4.7 Focus Visible; 4.1.2 Name, Role, Value | `react/src/AccessibleDropdown.tsx` provides a labeled menu button, `aria-expanded`/`aria-controls`, menuitem roles, arrow/Home/End navigation, Escape, and Tab exit. Browser automation covers interactions; NVDA checks are reported as completed, but detailed per-state observations are not recorded. |
| React modal and Angular review dialog | 1.3.1 Info and Relationships; 2.1.2 No Keyboard Trap; 2.4.3 Focus Order; 2.4.7 Focus Visible; 4.1.2 Name, Role, Value | Native `<dialog>` elements have accessible names/descriptions, focus entry, Tab wrapping, Escape dismissal, and focus restoration. Automated interaction checks exist; NVDA checks are reported as completed, with full session metadata and detailed per-state observations outstanding. |
| React and Angular forms | 1.3.1 Info and Relationships; 2.1.1 Keyboard; 3.3.1 Error Identification; 3.3.2 Labels or Instructions; 3.3.3 Error Suggestion; 4.1.2 Name, Role, Value | Labels, hints, required indicators, associated errors, invalid state, focusable error summaries, and status messages are implemented in `AccessibleForm.tsx` and `app.component.html`. Verify announcement behavior manually. |
| React semantic table | 1.3.1 Info and Relationships; 1.3.2 Meaningful Sequence; 2.1.1 Keyboard; 2.4.6 Headings and Labels | `react/src/AccessibleTable.tsx` uses a caption, column headers, row headers, and a documented roving tab stop. NVDA table/header behavior is reported as checked; detailed per-state observations are not recorded. The Angular sample does not contain a table. |
| Shared responsive styling | 1.4.3 Contrast (Minimum); 1.4.11 Non-text Contrast; 1.4.10 Reflow; 2.4.7 Focus Visible | `styles/layout.scss` defines colors, focus indicators, responsive layout, and forced-colors rules. Contrast, reflow, zoom, and forced-colors need manual confirmation in supported browsers before claiming they meet a criterion. |

Use the [verification checklist](Accessibility-Checklist.md) to record test
results. A mapped criterion or passing automated scan alone does not demonstrate
WCAG conformance.
