# Angular accessibility sample

This app is a standalone Angular component in `src/app.component.ts` and
`src/app.component.html`. It demonstrates a reactive form with associated labels,
hints, validation errors, a focusable error summary, and a native review dialog.

Run from the repository root with `npm run dev:angular`; build with
`npm run build --workspace angular`.

## Interaction and accessibility

- Each field has an explicit label, hint, required indicator, and conditional
  error association.
- Invalid submission focuses a summary with links that move focus to the
  corresponding field.
- Valid submission opens a named dialog and focuses its heading.
- Tab/Shift+Tab stay within the dialog; Escape or **Back to form** closes it and
  restores focus to **Review details**.
- Confirmation displays a local-only status message; form data is not sent or
  persisted.

## Verification

Run `npm test` from the repository root to execute Playwright interactions and
axe checks for both apps. WAVE-in-Chrome and NVDA checks have been reported as
manually completed; see [`../Accessibility/`](../Accessibility/) for notes,
captures, and remaining evidence metadata gaps. The Angular app does not include
the React sample's action menu or data table. Automated and manual checks do not
constitute a WCAG conformance certification.
