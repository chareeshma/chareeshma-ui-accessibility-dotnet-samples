import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';

const actions = ['View details', 'Save for later', 'Share item'];

export function AccessibleDropdown() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const trigger = useRef<HTMLButtonElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);
  const openingIndex = useRef(0);
  const id = useId();

  useLayoutEffect(() => {
    if (open) items.current[openingIndex.current]?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !container.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);

  function show(index: number) {
    openingIndex.current = index;
    setOpen(true);
    if (open) items.current[index]?.focus();
  }

  function close() {
    setOpen(false);
    trigger.current?.focus();
  }

  function navigate(event: KeyboardEvent<HTMLUListElement>) {
    const index = items.current.indexOf(document.activeElement as HTMLButtonElement);
    let next: number;
    switch (event.key) {
      case 'ArrowDown': next = (index + 1) % actions.length; break;
      case 'ArrowUp': next = (index - 1 + actions.length) % actions.length; break;
      case 'Home': next = 0; break;
      case 'End': next = actions.length - 1; break;
      case 'Escape': event.preventDefault(); close(); return;
      case 'Tab':
        if (event.shiftKey) {
          event.preventDefault();
          close();
        }
        return;
      default: return;
    }
    event.preventDefault();
    items.current[next]?.focus();
  }

  return (
    <>
      <div className="dropdown" ref={container} onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}>
        <button ref={trigger} id={`${id}-trigger`} className="btn btn-outline" type="button"
          aria-haspopup="menu" aria-expanded={open} aria-controls={`${id}-menu`}
          onClick={() => open ? close() : show(0)}
          onKeyDown={event => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              show(event.key === 'ArrowUp' ? actions.length - 1 : 0);
            } else if (event.key === 'Escape' && open) {
              event.preventDefault();
              close();
            }
          }}>
          Item actions <span aria-hidden="true">&#9662;</span>
        </button>
        <ul id={`${id}-menu`} role="menu" aria-labelledby={`${id}-trigger`}
          className="dropdown-menu" hidden={!open} onKeyDown={navigate}>
          {actions.map((action, index) => (
            <li role="none" key={action}>
              <button type="button" role="menuitem" tabIndex={-1}
                ref={element => { items.current[index] = element; }}
                onClick={() => { setMessage(`${action} selected. This is a demonstration; no data was changed.`); close(); }}>
                {action}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <p className="status" role="status">{message}</p>
    </>
  );
}
