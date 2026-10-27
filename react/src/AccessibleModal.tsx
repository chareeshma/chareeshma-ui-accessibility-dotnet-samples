import { useId, useRef } from 'react';
import { containDialogFocus } from '../../shared/dialog-focus';

export function AccessibleModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const note = useRef<HTMLInputElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const id = useId();

  function open() {
    dialog.current?.showModal();
    heading.current?.focus();
  }

  return (
    <>
      <button ref={trigger} className="btn" type="button" onClick={open}>Open accessible modal</button>
      <dialog ref={dialog} aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}
        onKeyDown={event => {
          if (note.current && closeButton.current && heading.current) {
            containDialogFocus(event, note.current, closeButton.current, heading.current);
          }
        }}
        onClose={() => trigger.current?.focus()}>
        <h2 id={`${id}-title`} ref={heading} tabIndex={-1}>A focused conversation</h2>
        <p id={`${id}-description`}>This native modal makes the background inert and contains keyboard focus until dismissed.</p>
        <label htmlFor={`${id}-note`}>Try typing a note</label>
        <input ref={note} id={`${id}-note`} type="text" />
        <div className="actions">
          <button ref={closeButton} className="btn" type="button" onClick={() => dialog.current?.close()}>Close modal</button>
        </div>
      </dialog>
    </>
  );
}
