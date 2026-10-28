# WCAG 2.1 AA Mapping

This document maps each sample component to relevant WCAG 2.1 AA success criteria.

## 1. Accessible Dropdown (React)
- **1.3.1 Info and Relationships** — Semantic structure and ARIA roles.
- **2.1.1 Keyboard** — Fully operable with keyboard (Enter, Space, Arrow keys).
- **2.4.3 Focus Order** — Logical focus progression.
- **2.4.7 Focus Visible** — Clear focus ring.
- **3.3.2 Labels or Instructions** — Clear labeling.
- **4.1.2 Name, Role, Value** — ARIA-expanded and ARIA-selected states announced.

## 2. Accessible Modal (React)
- **1.3.1 Info and Relationships** — Dialog role and semantic structure.
- **2.1.2 No Keyboard Trap** — Focus trapped inside modal.
- **2.4.3 Focus Order** — Initial focus set correctly.
- **2.4.7 Focus Visible** — Visible focus indicators.
- **3.3.2 Labels or Instructions** — Clear instructions inside modal.
- **4.1.2 Name, Role, Value** — Dialog role announced by screen readers.

## 3. Accessible Form (React + Angular)
- **1.3.1 Info and Relationships** — Proper `<label>` associations.
- **1.4.3 Contrast (Minimum)** — AA contrast levels.
- **2.1.1 Keyboard** — Full keyboard operability.
- **3.3.1 Error Identification** — Errors announced via aria-live.
- **3.3.2 Labels or Instructions** — Required fields clearly indicated.
- **3.3.3 Error Suggestion** — Helpful error messages.
- **4.1.2 Name, Role, Value** — ARIA-invalid and aria-describedby used.

## 4. Accessible Table (React + Angular)
- **1.3.1 Info and Relationships** — Proper table semantics.
- **1.3.2 Meaningful Sequence** — Correct reading order.
- **2.4.6 Headings and Labels** — Column headers announced.
- **4.1.2 Name, Role, Value** — Table role and structure announced.

## 5. Global WCAG Techniques Used
- Semantic HTML
- ARIA roles and states
- Keyboard navigation
- Focus management
- Accessible error messaging
- Responsive design
