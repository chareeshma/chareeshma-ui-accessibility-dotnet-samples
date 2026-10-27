# WCAG 2.1 AA accessibility checklist

WCAG 2.1 AA includes both Level A and Level AA success criteria. This checklist
maps all 50 A/AA criteria to the current sample scope; it is not a conformance
statement. Consult the [WCAG 2.1 recommendation](https://www.w3.org/TR/WCAG21/)
for normative requirements.

**Evidence:** the saved axe report records zero violations in seven states, with
incomplete rules still requiring review. Playwright also checks keyboard and
layout behavior. WAVE scans, JAWS/NVDA testing, zoom, text-spacing, and other
manual checks remain pending. "Implemented" below means a supporting pattern is
present, not that every requirement has been manually verified.

## Perceivable

| Criterion (level) | Sample implementation / scope | Verification |
| --- | --- | --- |
| 1.1.1 Non-text Content (A) | The decorative dropdown arrow is hidden from assistive technology; no meaningful images are present. | Inspect the accessibility tree; give future meaningful images alternatives. |
| 1.2.1 Audio-only and Video-only (Prerecorded) (A); 1.2.2 Captions (Prerecorded) (A); 1.2.3 Audio Description or Media Alternative (Prerecorded) (A); 1.2.4 Captions (Live) (AA); 1.2.5 Audio Description (Prerecorded) (AA) | Not applicable to current pages: no audio/video. | Reassess whenever media is added. |
| 1.3.1 Info and Relationships (A) | Native landmarks/headings, explicit labels, table caption and scoped headers, named dialogs. | axe plus manual screen-reader heading, landmark, field, and table navigation. |
| 1.3.2 Meaningful Sequence (A) | DOM order remains the reading order; grid only changes the number of columns. | Read in a screen reader and with styles disabled. |
| 1.3.3 Sensory Characteristics (A) | Instructions refer to named controls/keys rather than color, shape, or position alone. | Review all instructions manually. |
| 1.3.4 Orientation (AA) | No orientation lock is applied. | Test portrait and landscape, including open dialogs. |
| 1.3.5 Identify Input Purpose (AA) | Name/email fields expose `autocomplete="name"` and `autocomplete="email"`. | Inspect attributes and check browser autofill. |
| 1.4.1 Use of Color (A) | Validation uses error text, a summary, and `aria-invalid`, not only red borders. | Check errors without color; confirm field associations. |
| 1.4.2 Audio Control (A) | Not applicable: no autoplay audio. | Reassess if audio is added. |
| 1.4.3 Contrast (Minimum) (AA) | Shared foreground/background colors are checked by axe where determinable. | Measure all text states: at least 4.5:1 for normal text or 3:1 for qualifying large text; review incomplete checks. |
| 1.4.4 Resize Text (AA) | Relative units, wrapping, and flexible cards support enlargement. | At 200% zoom, check no text or functionality is lost. |
| 1.4.5 Images of Text (AA) | Not applicable: content is rendered as text, not images of text. | Preserve real text when adding branding/content. |
| 1.4.10 Reflow (AA) | One-column mobile grid and locally scrollable table; page overflow tested at 320px. | Test at 400% zoom on a 1280px-wide window; only content legitimately requiring two dimensions may scroll in both directions. |
| 1.4.11 Non-text Contrast (AA) | Explicit input borders, button boundaries, and focus indicators; forced-colors overrides. | Measure relevant boundaries/states at 3:1 against adjacent colors; test forced colors manually. |
| 1.4.12 Text Spacing (AA) | Layout uses flexible heights for content and wrapping text. | Apply 1.5x line height, 2x paragraph spacing, .12em letter spacing, .16em word spacing; check for clipping/loss. |
| 1.4.13 Content on Hover or Focus (AA) | No tooltip/hover-only content. The action menu opens on explicit activation and is dismissible. | Check any future hover/focus content is dismissible, hoverable, and persistent. |

## Operable

| Criterion (level) | Sample implementation / scope | Verification |
| --- | --- | --- |
| 2.1.1 Keyboard (A) | Native controls, menu arrows/Home/End, table roving tabindex, form submission, and modal controls. | Run Playwright and complete the keyboard-only flow below. |
| 2.1.2 No Keyboard Trap (A) | Dialogs contain focus while open but close with Escape/buttons; menus and table allow Tab exit. | Check both Tab directions and all dismissal paths. |
| 2.1.4 Character Key Shortcuts (A) | Not applicable: no single-character shortcuts. | Reassess if shortcuts are introduced. |
| 2.2.1 Timing Adjustable (A); 2.2.2 Pause, Stop, Hide (A) | Not applicable: no timed UI tasks, auto-updating content, or moving content. | Reassess if these features are added; API token expiration is not a demonstrated timed UI flow. |
| 2.3.1 Three Flashes or Below Threshold (A) | No flashing content or animation is implemented. | Preserve this behavior when adding effects/media. |
| 2.4.1 Bypass Blocks (A) | Visible-on-focus skip link targets the focusable main landmark. | Playwright checks activation and main focus; also check with a screen reader. |
| 2.4.2 Page Titled (A) | Both HTML entry points provide descriptive titles. | Check browser tabs and screen-reader page announcements. |
| 2.4.3 Focus Order (A) | DOM tab order, initial dialog heading focus, error-summary focus, and restoration to openers. | Playwright plus manual checks after errors, dismissal, and responsive reflow. |
| 2.4.4 Link Purpose (In Context) (A) | Skip and error-summary links describe their purpose. | Read links in context and verify destinations. |
| 2.4.5 Multiple Ways (AA) | Each application is a single-page sample with no set of navigable content pages. | Reassess when multi-page navigation is added. |
| 2.4.6 Headings and Labels (AA) | Descriptive section headings, visible field labels, and named dialog titles. | Review outline and labels for clarity, not just presence. |
| 2.4.7 Focus Visible (AA) | Shared `:focus-visible` outlines and focused table/menu styles. | Inspect every interactive state, including dialog boundaries and forced colors. |
| 2.5.1 Pointer Gestures (A) | No multipoint or path-based gesture is required. | Verify all actions remain available through simple activation. |
| 2.5.2 Pointer Cancellation (A) | Actions use native click activation, not pointer-down execution; pointer-down only dismisses an outside menu. | Press a button, move away, and release; confirm no unintended action. |
| 2.5.3 Label in Name (A) | Controls use visible text as their accessible name; field labels are explicitly associated. | Compare visible labels with accessibility-tree names and try voice input. |
| 2.5.4 Motion Actuation (A) | Not applicable: no device-motion input. | Reassess if motion controls are introduced. |

## Understandable

| Criterion (level) | Sample implementation / scope | Verification |
| --- | --- | --- |
| 3.1.1 Language of Page (A) | Both HTML entry points declare `lang="en"`. | Inspect document language and screen-reader pronunciation. |
| 3.1.2 Language of Parts (AA) | Current copy is English throughout. | Mark language changes if multilingual passages are introduced. |
| 3.2.1 On Focus (A) | Focus alone does not submit forms or open dialogs/menus. | Tab through all controls and watch for unexpected context changes. |
| 3.2.2 On Input (A) | Editing fields updates validation/status without navigation; review requires explicit submission. | Edit, blur, and submit fields; check focus and context remain predictable. |
| 3.2.3 Consistent Navigation (AA) | No repeated multi-page navigation is implemented; both samples have consistent skip/main structure. | Reassess when a site-wide navigation system exists. |
| 3.2.4 Consistent Identification (AA) | Shared styling and consistent field/error terminology identify similar controls. | Review equivalent controls across both apps. |
| 3.3.1 Error Identification (A) | Text errors, `aria-invalid`, associated descriptions, and linked error summaries. | Submit empty/invalid values and verify field-specific feedback. |
| 3.3.2 Labels or Instructions (A) | Visible required labels, example email hints, and keyboard guidance. | Verify instructions are available before errors occur. |
| 3.3.3 Error Suggestion (AA) | Required-field messages and an example valid email explain recovery. | Correct each error and confirm stale invalid state is removed. |
| 3.3.4 Error Prevention (Legal, Financial, Data) (AA) | Not applicable: forms do not create legal/financial commitments or change stored user data. Angular demonstrates a review step only. | Reassess if real data submission or destructive actions are added. |

## Robust

| Criterion (level) | Sample implementation / scope | Verification |
| --- | --- | --- |
| 4.1.1 Parsing (A) | Native HTML and React-generated unique IDs support valid relationships. This criterion is included because the target is WCAG 2.1. | Check duplicate IDs, nesting, and label/ARIA references in each rendered state. |
| 4.1.2 Name, Role, Value (A) | Native controls, named dialogs, menu roles, and expanded/invalid states expose purpose and state. | axe plus manual JAWS/NVDA checks; native table semantics are preserved rather than claiming an editable ARIA grid. |
| 4.1.3 Status Messages (AA) | `role="status"` regions announce valid-form feedback and menu selection without moving focus. | Verify actual speech output; automated presence checks cannot establish announcement quality. |

The 44px-minimum button/input heights are an additional usability choice, not
proof of WCAG 2.1 AA: Target Size (2.5.5) is Level AAA in WCAG 2.1.

## Repeatable testing steps

1. Install dependencies with `npm ci`; run `npx playwright install chromium`,
   `npm run build`, and `npm test` from the repository root. Read test failures
   rather than treating a successful build as an accessibility check.
2. Run `npm run test:axe-report`. Inspect
   [`Accessibility/axe-results.md`](../Accessibility/axe-results.md) for its
   timestamp, scan states, violations, and incomplete counts. For incomplete
   counts, inspect the full result in the axe browser extension or debugger:
   the saved summary does not contain incomplete-node detail.
3. Start both apps (`npm run dev:react` and `npm run dev:angular` in separate
   terminals). With only the keyboard, activate the skip link, exercise each
   menu/table key, and confirm Tab exits both. Open each dialog, test Tab and
   Shift+Tab at both boundaries, then Escape and close buttons; verify focus
   returns to the opener.
4. Submit blank, whitespace-only, and malformed-email values. Check error
   summary focus, links to fields, associated messages, and correction.
   Submit valid values; confirm status feedback and the Angular review flow.
5. Test 320/375/768/1280px widths, portrait/landscape, 200%/400% zoom, text-spacing
   overrides, and forced colors. Confirm no clipped text, unreachable controls,
   lost focus indicators, or unintended page-level horizontal scrolling.
6. Run the WAVE browser extension on local initial, invalid-form, and open-dialog
   states. Save actual screenshots and tool/browser versions using
   [`WAVE-screenshots/README.md`](../Accessibility/WAVE-screenshots/README.md).
7. Test with JAWS and NVDA in supported Windows browser combinations. Record
   actual versions, observations, and pass/fail in
   [`screen-reader-notes.md`](../Accessibility/screen-reader-notes.md).
   Test both browse-mode table commands and interactive keyboard behavior;
   screen readers may intercept arrows. Verify labels, errors, dialog context,
   expanded states, and status speech.
8. Review every issue manually, fix the component or shared styles at the source,
   rerun affected tests, and update the
   [remediation summary](../Accessibility/remediation-summary.md). Keep pending
   checks explicit; do not convert them to passes based only on axe results.
