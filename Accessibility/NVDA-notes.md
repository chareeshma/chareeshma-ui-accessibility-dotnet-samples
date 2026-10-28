1. NVDA Environment
NVDA Version: 2024.x

Browser: Chrome (latest)

Test Pages:

React Accessible Dropdown

React Accessible Form

React Accessible Modal

Angular Accessible Form

Angular Accessible Table

2. Heading Navigation (H key)
Findings:

NVDA correctly announced all headings in hierarchical order (H1 → H2 → H3).

No skipped heading levels detected.

Headings were descriptive and matched visible labels.

Example NVDA output:

“Heading level 1: Accessible UI Samples”
“Heading level 2: Accessible Dropdown Component”

3. Landmark Navigation (D key)
Findings:

NVDA detected main landmarks:

main

form

navigation (if present)

Landmarks were announced correctly and allowed quick navigation.

Example NVDA output:

“Main landmark”
“Form landmark”

4. Form Labels (F key)
Findings:

NVDA announced form labels correctly for all input fields.

Required fields were announced as “required.”

Error messages were announced immediately after invalid input.

Example NVDA output:

“First Name, edit, required”
“Error: First Name is required.”

5. Buttons (B key)
Findings:

NVDA announced button names correctly.

ARIA labels were read as expected.

Disabled buttons were announced as “unavailable.”

Example NVDA output:

“Submit, button”
“Cancel, button”
“Submit, button, unavailable”

6. Keyboard Navigation (Tab / Shift+Tab)
Findings:

Focus order matched visual order.

No keyboard traps detected.

Modal correctly trapped focus until closed.

Dropdown opened and closed with Enter/Space.

Escape key closed modal and dropdown.

Example NVDA output:

“Close Modal, button”
“Modal dialog”
“Back to main content”

7. ARIA Roles & States
Findings:

NVDA announced ARIA roles for dropdown, modal, and table.

ARIA-expanded and ARIA-selected states updated correctly.

Table headers were announced with correct associations.

Example NVDA output:

“Dropdown, collapsed”
“Dropdown, expanded”
“Table with 4 columns and 5 rows”
“Column header: Status”

8. Error Messaging & Validation
Findings:

NVDA announced validation errors immediately after form submission.

Errors were associated with the correct input fields.

Error messages used semantic markup (aria-live="assertive").

Example NVDA output:

“Error: Email is invalid.”
“Email, edit, invalid entry.”

9. Focus Management
Findings:

Focus moved to the first invalid field after form submission.

Modal received initial focus on open.

Focus returned to triggering element after modal close.

Example NVDA output:

“Close Modal, button”
“Submit, button” (after modal closes)

10. Overall NVDA Accessibility Summary
NVDA confirms the following accessibility behaviors:

Proper heading structure

Correct ARIA roles and states

Accurate form label announcements

Accessible error messaging

Correct focus management

No keyboard traps

Accessible modal behavior

Accessible dropdown behavior

Semantic HTML used consistently

WCAG 2.1 AA alignment for tested components

11. Issues Found & Remediation

No NVDA issues detected during testing. All components behaved as expected and met WCAG 2.1 AA accessibility requirements.
