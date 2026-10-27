# chareeshma-ui-accessibility-dotnet
Code samples demonstrating WCAG 2.1 AA accessibility, UI/UX implementation, .NET Core APIs, secure coding, and CI/CD practices.

See the [documentation guide](Documentation/README.md) for the folder map, tool
status, [WCAG checklist](Documentation/Accessibility-Checklist.md), and
[design-system notes](Documentation/Design-System-Implementation.md).

## Accessible UI samples

Two independent TypeScript applications share a mobile-first Sass stylesheet. They
use semantic HTML before ARIA and require no Material or Bootstrap runtime.

### Run locally

Use Node.js 24 LTS and npm 11.

```sh
npm install
npm run dev:react       # http://127.0.0.1:5173
npm run dev:angular     # http://127.0.0.1:4200 (run in another terminal)
```

```sh
npm run build          # Build both applications
npx playwright install chromium
npm test               # Starts both apps and runs browser + axe checks
```

Build outputs are `react/dist/` and `angular/dist/accessible-form/browser/`.
No backend is needed. Form data is neither sent nor persisted.

### React components

| Component | Accessibility pattern |
| --- | --- |
| `react/src/AccessibleModal.tsx` | Named native `<dialog>`, descriptive text, initial heading focus, explicit Tab/Shift+Tab wrapping, inert background, Escape dismissal, and focus restoration. |
| `react/src/AccessibleDropdown.tsx` | Action menu button with `aria-haspopup`, `aria-expanded`, and `aria-controls`; `menu` / `menuitem` roles; Enter/Space activation; arrow keys with wrapping; Home/End; Escape; Tab exit; outside-pointer dismissal. This is an action menu, not a select replacement. |
| `react/src/AccessibleForm.tsx` | Explicit labels, autocomplete, required fields, validation on blur/submission, `aria-invalid`, associated hints/errors, focused error summary with field links, and a polite status message. |
| `react/src/AccessibleTable.tsx` | Native caption, column/row headers, and a single roving tab stop across body cells. Arrows move by row/column without wrapping; Home/End move to row boundaries; Ctrl+Home/End move to table boundaries. Tab exits normally. |

The table preserves native table semantics rather than claiming to be an editable
ARIA grid. Screen readers in browse mode may intercept arrow keys; their native
table-navigation commands remain available.

### Angular form

`angular/src/app.component.*` uses a standalone component and reactive forms.
Every input has a `<label for>`, a hint, and conditional error associations.
Required or invalid submissions focus a linked error summary. Valid submissions
open a named native review dialog: Tab/Shift+Tab stay within it, Escape and
Back to form dismiss it, and all closing paths restore focus to the review button.
Confirming announces a local-only success message.
Both dialogs use `shared/dialog-focus.ts` to wrap Tab at their control boundaries,
including Shift+Tab from the initially focused heading.

### Responsive Sass

`styles/layout.scss` provides a one-column mobile layout, a two-column grid at
48rem, and roomier spacing at 64rem. Bootstrap-aligned `.container`, `.card`,
`.btn`, and `.form-field` conventions offer familiar components without importing
a framework. It includes visible keyboard focus, 44px-minimum form controls and
buttons, wrapping content, a locally scrollable table, and forced-colors support.
Both apps include a skip link and header/main/footer landmarks.

### Accessibility verification

The Playwright suite in `tests/` covers modal containment and focus restoration,
menu and table keyboard behavior, form errors and recovery, skip navigation,
320/375/768/1280px layouts, and axe WCAG 2.1 A/AA checks in default, invalid-form,
and modal states. Automated checks are not a WCAG conformance certification.
Manually check both apps with keyboard only, browser zoom at 200% and 400%,
forced colors, and screen readers such as NVDA/Firefox and VoiceOver/Safari.
These samples assume modern browsers with native `HTMLDialogElement.showModal()`
support; older browsers need an evaluated accessible dialog alternative.

### Accessibility evidence

See [`Accessibility/`](Accessibility/) for generated axe scan output,
remediation notes, and clearly labeled WAVE and JAWS/NVDA evidence status.
Run `npm run test:axe-report` to regenerate `Accessibility/axe-results.md`.
WAVE screenshots and screen-reader findings require manual testing and are not
claimed until recorded.

## Backend API sample

[`Backend/`](Backend/) contains a runnable ASP.NET Core 10 Web API with
controller-based GET/POST endpoints, model validation, DI, request/error
middleware, OIDC-discovered JWT validation, role-based authorization, and
parameterized SQLite access. See its README for identity-provider configuration
and run instructions.

## CI/CD pipeline

[`CI-CD/`](CI-CD/) contains an Azure DevOps YAML sample covering restore, build,
accessibility tests, artifact publication, and opt-in Azure App Service
deployment with Key Vault secret retrieval and runtime environment variables.
