# React accessibility samples

The React app is in `src/main.tsx` and uses the shared styles in
`../styles/layout.scss`. Start it from the repository root with
`npm run dev:react`; run `npm run build --workspace react` to build it.

## Components and keyboard behavior

| Component | Behavior |
| --- | --- |
| `AccessibleModal.tsx` | Opens a named native `<dialog>`, focuses its heading, wraps Tab/Shift+Tab at dialog controls, closes with Escape, and restores focus to the opener. |
| `AccessibleDropdown.tsx` | An action menu, not a select/listbox. Enter, Space, or Arrow keys open it; arrows wrap between menu items; Home/End move to the first/last item; Escape closes and restores trigger focus; Tab exits. Outside pointer interaction dismisses it. |
| `AccessibleForm.tsx` | Explicit labels, hints, required fields, validation errors associated with inputs, and a focusable error summary with links to invalid controls. Valid submission announces local-only status. |
| `AccessibleTable.tsx` | A semantic table with caption, column/row headers, and one roving tab stop across body cells. Arrows move by row/column without wrapping; Home/End move within a row; Ctrl+Home/End move to table boundaries; Tab exits. |

These are sample patterns; assistive technology may intercept some key
combinations. The table retains native table semantics and is not an ARIA grid.

## Verification

From the repository root, `npm test` runs Playwright interactions for React and
Angular, including axe checks. WAVE-in-Chrome and NVDA checks have been reported
as manually completed; see [`../Accessibility/`](../Accessibility/) for notes,
captures, and the remaining test-record metadata gaps. Automated tests and
manual checks do not constitute a WCAG conformance certification.
