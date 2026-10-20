import { Check, Eye, EyeOff } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';

function strength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
  return pw ? Math.max(1, s) : 0;
}

const LEVELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const COLORS = ['', 'bg-danger', 'bg-amber-500', 'bg-sky-500', 'bg-success'];

function Field({
  label,
  type = 'text',
  value,
  onChange,
  validate,
  trailing,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  validate: (v: string) => string | null;
  trailing?: ReactNode;
}) {
  const id = useId();
  const [touched, setTouched] = useState(false);
  const error = touched ? validate(value) : null;
  const valid = touched && !error;

  return (
    <div>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          placeholder=" "
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`peer h-14 w-full rounded-xl border bg-surface px-4 pt-5 pr-11 text-sm outline-none transition-colors ${error ? 'border-danger' : 'border-line focus:border-accent'}`}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute top-2 left-4 text-xs text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent"
        >
          {label}
        </label>
        <span className="absolute top-1/2 right-3 -translate-y-1/2">
          {trailing ?? (valid && <Check className="size-4 text-success" aria-hidden />)}
        </span>
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-1 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Demo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const level = strength(pw);

  return (
    <div className="flex h-full items-center justify-center p-6">
      <form className="flex w-full max-w-sm flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-lg font-semibold">Create account</h2>
        <Field
          label="Name"
          value={name}
          onChange={setName}
          validate={(v) => (v.trim() ? null : 'Please enter your name.')}
        />
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          validate={(v) => (/^\S+@\S+\.\S+$/.test(v) ? null : 'Enter a valid email address.')}
        />
        <div>
          <Field
            label="Password"
            type={show ? 'text' : 'password'}
            value={pw}
            onChange={setPw}
            validate={(v) => (v.length >= 8 ? null : 'Use at least 8 characters.')}
            trailing={
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? 'Hide password' : 'Show password'}
                className="text-muted hover:text-fg"
              >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            }
          />
          <div className="mt-2 flex gap-1" aria-hidden>
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${i <= level ? COLORS[level] : 'bg-surface-3'}`}
              />
            ))}
          </div>
          <p className="mt-1 h-4 text-xs text-muted" aria-live="polite">
            {LEVELS[level]}
          </p>
        </div>
        <button
          type="submit"
          className="h-11 rounded-xl bg-accent font-medium text-accent-contrast"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
