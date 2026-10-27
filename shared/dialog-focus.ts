type TabEvent = Pick<KeyboardEvent, 'key' | 'shiftKey' | 'preventDefault'>;

export function containDialogFocus(
  event: TabEvent,
  first: HTMLElement,
  last: HTMLElement,
  initial: HTMLElement,
): void {
  if (event.key !== 'Tab') return;
  const active = first.ownerDocument.activeElement;
  if (event.shiftKey && (active === first || active === initial)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}
