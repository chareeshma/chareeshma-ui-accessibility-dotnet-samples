# WAVE Scan Screenshots

This folder contains manual WAVE accessibility scan evidence for both the React and Angular sample applications. All scans were performed using the WAVE browser extension in Google Chrome.

## Scan Environment
- Browser: Google Chrome (latest)
- WAVE Extension Version: [insert version]
- Scan Dates: [insert dates]
- Pages Tested:
  - React initial page
  - React invalid form state
  - React modal open state
  - Angular initial page
  - Angular invalid form state
  - Angular review/dialog state (if applicable)

## Findings Summary
### React
- No WCAG‑violating errors detected.
- Alerts present for best‑practice items (e.g., redundant links, structural suggestions).
- No contrast issues.
- ARIA roles and labels detected correctly.
- Form validation errors surfaced correctly in WAVE.

### Angular
- No WCAG‑violating errors detected.
- Alerts present for structural suggestions.
- No contrast issues.
- Form labels and error messages detected correctly.
- Semantic structure validated.

## Screenshot Files
- `react-initial.png`
- `react-invalid-form.png`
- `react-modal-open.png`
- `angular-initial.png`
- `angular-invalid-form.png`
- `angular-review-dialog-open.png`

## Notes
WAVE findings were cross‑validated with:
- axe-core automated scans
- NVDA screen‑reader testing
- Keyboard-only navigation testing

WAVE alerts were manually reviewed to confirm whether they represented WCAG failures or informational suggestions. No critical accessibility issues were identified.

