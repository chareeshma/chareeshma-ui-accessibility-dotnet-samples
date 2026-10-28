# Accessibility Overview

This repository contains React and Angular sample components demonstrating WCAG 2.1 AA–aligned accessible UI patterns, automated accessibility testing, manual screen‑reader validation, and design‑system‑driven component implementation.

## Accessibility Goals
- Demonstrate WCAG 2.1 AA compliance across common UI components.
- Provide examples of semantic HTML, ARIA roles, keyboard navigation, and focus management.
- Show automated and manual accessibility testing workflows.
- Document accessibility findings, remediation, and verification steps.

## Components Covered
- Accessible Dropdown (React)
- Accessible Modal (React)
- Accessible Form (React + Angular)
- Accessible Table (React + Angular)

## Accessibility Techniques Used
- Semantic HTML (`<label>`, `<button>`, `<fieldset>`, `<legend>`)
- ARIA roles (`role="dialog"`, `role="listbox"`, `role="alert"`)
- ARIA states (`aria-expanded`, `aria-selected`, `aria-invalid`)
- Keyboard navigation (Tab, Shift+Tab, Enter, Space, Escape)
- Focus management (initial focus, trapped focus, return focus)
- Error messaging (`aria-live="assertive"` regions)
- Color contrast aligned with WCAG AA
- Responsive design with accessible breakpoints

## Automated Testing
Automated accessibility testing is performed using:
- **axe-core** (React + Angular)
- **Playwright accessibility tests**

All axe scans show:
- 0 violations
- Passing rules
- Incomplete rules requiring manual review

## Manual Testing
Manual testing includes:
- WAVE browser extension scans
- NVDA screen‑reader testing
- Keyboard-only navigation validation
- Focus order verification
- ARIA role/state announcements

See:
- `/Accessibility/WAVE-screenshots/`
- `/Accessibility/JAWS-NVDA-Notes.md`
- `/Accessibility/manual-testing-summary.md`

## WCAG Mapping
A detailed mapping of WCAG 2.1 AA criteria to each component is provided in:
- `Documentation/WCAG-2.1-AA-Mapping.md`

## Design System Alignment
Design system principles applied:
- Reusable components
- Consistent spacing, typography, and color tokens
- Accessible interaction patterns
- Predictable focus behavior
- Clear visual hierarchy

See:
- `Documentation/Design-System-Implementation.md`

## Remediation Summary
Accessibility issues found and resolved are documented in:
- `/Accessibility/remediation-summary.md`

This repository demonstrates a complete accessibility workflow suitable for government, enterprise, and regulated environments.
