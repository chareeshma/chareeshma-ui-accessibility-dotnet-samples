# Accessibility Checklist (WCAG 2.1 AA)

## Structure & Semantics
- [x] Headings follow logical hierarchy
- [x] Landmarks used (`main`, `nav`, `form`)
- [x] Semantic HTML used for forms, tables, buttons

## Keyboard Navigation
- [x] All components operable via keyboard
- [x] No keyboard traps
- [x] Modal traps focus correctly
- [x] Escape closes modal and dropdown

## Focus Management
- [x] Visible focus indicators
- [x] Logical focus order
- [x] Initial focus set in modal
- [x] Focus returned to trigger element

## ARIA Roles & States
- [x] Correct ARIA roles (`dialog`, `listbox`, `alert`)
- [x] ARIA-expanded and ARIA-selected states update
- [x] aria-live used for error messaging
- [x] aria-invalid used for validation

## Forms & Validation
- [x] Labels associated with inputs
- [x] Required fields indicated
- [x] Error messages announced
- [x] Error messages linked to fields

## Color & Contrast
- [x] Text contrast meets AA
- [x] Interactive elements meet AA
- [x] Focus ring meets AA

## Automated Testing
- [x] axe-core scans completed
- [x] Playwright accessibility tests pass

## Manual Testing
- [x] WAVE scans completed
- [x] NVDA screen-reader tests completed
- [x] Keyboard-only testing completed

## Documentation
- [x] WCAG mapping completed
- [x] NVDA notes completed
- [x] Remediation summary completed
