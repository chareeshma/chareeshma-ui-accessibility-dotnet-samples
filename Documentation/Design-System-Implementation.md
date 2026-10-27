# Design-system implementation

The samples share a small design-system foundation: reusable visual tokens and
component classes, semantic accessible components, documented keyboard behavior,
responsive support, and a workflow for assistive-technology testing. Accessibility
is part of the component contract, not a separate visual theme.

## Bootstrap/Material alignment: what was actually extended

No Bootstrap or Angular Material package is installed, and no upstream framework
source, component theme, or Sass variable map is overridden. Instead,
[`styles/layout.scss`](../styles/layout.scss) extends **Bootstrap-style
conventions** with a custom, framework-independent implementation. This is
Bootstrap-aligned styling, not a claim that Bootstrap or Material components
have been integrated. Material-specific behaviors such as ripples, elevation
tokens, and Material form controls are not implemented.

| Convention | Custom implementation |
| --- | --- |
| Container and grid | `.container` caps width at 76rem; `.sample-grid` starts with one flexible column and switches to two at 48rem. |
| Breakpoints | Sass `$breakpoint-md: 48rem` and `$breakpoint-lg: 64rem` provide a small Bootstrap-aligned breakpoint set, not Bootstrap's complete grid API. |
| Cards | `.card` supplies shared spacing, border, radius, and subtle shadow around semantic sections. |
| Buttons | `.btn` and `.btn-outline` share dimensions, typography, borders, hover states, and visible keyboard focus. |
| Form fields | `.form-field`, `.hint`, `.field-error`, and `.error-summary` provide consistent labeling and validation presentation. |
| Theme | `$primary` and `$border` are Sass tokens reused across controls; base typography, text colors, and surfaces live in the same stylesheet. Not every literal is tokenized. |

Both `react/src/main.tsx` and `angular/angular.json` include this stylesheet, so
changes to these shared primitives affect both applications. Additional themes
should be introduced centrally, with all text/control/focus states checked for
contrast; copying CSS into individual screens would weaken consistency.

## Reusable component boundaries

| Component / primitive | Responsibility and accessibility contract |
| --- | --- |
| `react/src/AccessibleModal.tsx` | Owns opening, native modal lifecycle, associated title/description, initial heading focus, close action, and restoration to its trigger. |
| `react/src/AccessibleDropdown.tsx` | Owns menu state, trigger relationships, item focus, arrow/Home/End navigation, selection feedback, Escape, Tab exit, and outside dismissal. It is an action menu, not a form select. |
| `react/src/AccessibleForm.tsx` | Owns field state, validation messages, unique IDs, hint/error associations, error-summary focus, and success feedback. |
| `react/src/AccessibleTable.tsx` | Preserves native table caption and header relationships while managing a single tab stop and bounded cell navigation. |
| `angular/src/app.component.*` | Demonstrates reactive form validation and a review dialog, using the same visual and focus conventions as React. |
| `shared/dialog-focus.ts` | A framework-independent helper wraps Tab/Shift+Tab between specified dialog controls, including backward navigation from the initially focused heading. |

These are focused teaching components with sample content, not a published
configurable component library. Reusing them on another screen requires adapting
content and IDs carefully; Angular's fixed IDs assume one instance per page.
React uses `useId` for repeatable instances. The dialog helper assumes its
provided first/last controls remain focusable; a dynamic dialog must update those
boundaries when controls are hidden or disabled.

Separate presentation from behavior: shared Sass defines the visual primitives,
framework components own state and semantic markup, and the shared focus helper
handles only the common boundary behavior. Avoid inventing generic wrappers
that hide required labels, dialog titles, or error associations.

## Accessibility integrated into the system

**Semantics first.** Use real buttons, labels, inputs, headings, landmarks, and
tables. Native `<dialog>.showModal()` supplies modal semantics and an inert
background; explicit boundary handling makes Tab wrapping predictable. Add ARIA
for information HTML alone does not express, such as menu expansion and status
messages, rather than replacing native roles.

**Keyboard behavior is part of the API.** Every interactive pattern documents its
keys on the page or in the root guide. Dialogs enter at the heading and restore
focus on close. Menus use arrow keys and permit normal exit. The table keeps one
tab stop, supports row/column movement, and retains screen-reader table commands.
Do not add `role="grid"` unless implementing the full interactive-grid contract.

**Validation supports recovery.** Fields have visible labels, required
instructions, and hints. Invalid states add both text and programmatic
associations. Submission focuses a linked summary; valid feedback uses a polite
status region. Color is supplementary rather than the only error cue.

**Responsive and perceivable defaults.** Flexible grids, wrapping content, local
table overflow, and constrained/scrollable dialogs support small viewports.
Shared outlines and forced-colors rules preserve focus visibility. Controls have
at least 2.75rem minimum height; this is a design choice, not an AA certification.
Zoom, text-spacing, actual contrast, and assistive-technology usability still need
manual verification.

## Extending the foundation

1. Choose semantic HTML and define the component's labels, state announcements,
   focus entry/exit, and keyboard behavior before styling it.
2. Reuse shared classes/tokens. Add a shared variant only when it represents a
   reusable visual or interaction pattern rather than a one-off page detail.
3. Keep IDs unique and association targets present. Use native controls unless
   a custom interaction is necessary and its complete keyboard model is supplied.
4. Add focused Playwright assertions for new states and include those states in
   axe scans. Check the [WCAG checklist](Accessibility-Checklist.md) rather than
   assuming reusable styling guarantees accessibility.
5. Complete manual WAVE, keyboard, zoom, forced-colors, and JAWS/NVDA checks and
   save genuine evidence under `Accessibility/`. Current WAVE and screen-reader
   records are pending, not completed test reports.

If Bootstrap or Material is adopted later, use its supported theming/extension
mechanisms and remove conflicting duplicate base styles deliberately. Recheck
focus, contrast, DOM semantics, and keyboard behavior after the integration;
framework adoption alone does not establish accessibility.
