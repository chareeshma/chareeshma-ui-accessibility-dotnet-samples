# Design System Implementation

This document describes shared design-system conventions in the React and
Angular learning samples. It is not a claim that the samples conform to WCAG
2.1 AA; see the [WCAG mapping](WCAG-2.1-AA-Mapping.md) and
[verification checklist](Accessibility-Checklist.md).

## Component Architecture
- Reusable, modular components
- Consistent naming conventions
- Separation of concerns (UI, logic, accessibility)
- Predictable interaction patterns

## Spacing & Layout
- Consistent spacing scale (4px/8px increments)
- Responsive breakpoints aligned with design system
- Accessible padding and hit-area sizes

## Typography
- Clear hierarchy using semantic tags
- Accessible font sizes (minimum 16px)
- Sufficient contrast between text and background

## Color and Focus
- Shared primary, border, text, and focus colors are defined in
  `styles/layout.scss`.
- The styles include a visible focus outline and forced-colors adjustments.
- Contrast and non-text contrast need verification in supported browsers before
  claiming WCAG success.

## Interaction Patterns
- Dropdown: keyboard operable, ARIA-expanded
- Modal: trapped focus, Escape closes
- Form: labeled inputs, aria-live errors
- Table: semantic headers, row/column associations

## Accessibility Integration
- ARIA roles and states embedded in components
- Keyboard navigation built into interaction logic
- Focus management implemented consistently
- Error messaging aligned with WCAG 3.3.x

## Testing Alignment
- Playwright interaction tests and axe scans are configured; see
  `Accessibility/axe-results.md` and `tests/`.
- WAVE-in-Chrome and NVDA checks have been reported as manually completed.
  Their evidence and remaining metadata gaps are documented in
  `Accessibility/`.
- Manual test status and automated scan results do not establish conformance.

These conventions support consistency and accessible implementation; verify
each interaction and visual requirement against the actual rendered application.
