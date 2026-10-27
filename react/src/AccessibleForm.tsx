import { useId, useRef, useState, type FormEvent } from 'react';

type Values = { name: string; email: string };
type Errors = Partial<Record<keyof Values, string>>;
const fields = ['name', 'email'] as const;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = 'Enter your name.';
  if (!values.email.trim()) errors.email = 'Enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter an email address such as alex@example.com.';
  return errors;
}

export function AccessibleForm() {
  const id = useId();
  const [values, setValues] = useState<Values>({ name: '', email: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState('');
  const summary = useRef<HTMLDivElement>(null);
  const inputs = useRef<Partial<Record<keyof Values, HTMLInputElement | null>>>({});

  function submit(event: FormEvent) {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    setSubmitted(true);
    setStatus('');
    if (Object.keys(next).length) requestAnimationFrame(() => summary.current?.focus());
    else setStatus('Your details are valid. This demo does not send or store your information.');
  }

  return (
    <form noValidate onSubmit={submit}>
      <p>Both fields are required. Your information stays in this page.</p>
      {submitted && Object.keys(errors).length > 0 && (
        <div className="error-summary" ref={summary} tabIndex={-1} aria-labelledby={`${id}-errors`}>
          <h3 id={`${id}-errors`}>Please correct the following</h3>
          <ul>{fields.filter(field => errors[field]).map(field => (
            <li key={field}><a href={`#${id}-${field}`} onClick={event => {
              event.preventDefault();
              inputs.current[field]?.focus();
            }}>{errors[field]}</a></li>
          ))}</ul>
        </div>
      )}
      {fields.map(field => (
        <div className="form-field" key={field}>
          <label htmlFor={`${id}-${field}`}>{field === 'name' ? 'Name' : 'Email'} (required)</label>
          <p className="hint" id={`${id}-${field}-hint`}>
            {field === 'name' ? 'Use the name you would like us to use.' : 'For example, alex@example.com.'}
          </p>
          <input ref={element => { inputs.current[field] = element; }} id={`${id}-${field}`} name={field}
            type={field === 'email' ? 'email' : 'text'} autoComplete={field} required
            value={values[field]} aria-invalid={Boolean(errors[field])}
            aria-describedby={`${id}-${field}-hint${errors[field] ? ` ${id}-${field}-error` : ''}`}
            onChange={event => {
              const next = { ...values, [field]: event.target.value };
              setValues(next);
              setStatus('');
              if (submitted || errors[field]) setErrors(validate(next));
            }}
            onBlur={() => setErrors(previous => ({ ...previous, [field]: validate(values)[field] }))} />
          {errors[field] && <p className="field-error" id={`${id}-${field}-error`}>{errors[field]}</p>}
        </div>
      ))}
      <button className="btn" type="submit">Validate details</button>
      <p className="status" role="status">{status}</p>
    </form>
  );
}
