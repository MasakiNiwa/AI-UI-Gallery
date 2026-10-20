import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useState, type FormEvent } from 'react';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
    <path
      fill="#EA4335"
      d="M12 10.2v3.9h5.4c-.2 1.3-1.6 3.8-5.4 3.8-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.3 14.6 2.3 12 2.3 6.6 2.3 2.3 6.6 2.3 12s4.3 9.7 9.7 9.7c5.6 0 9.3-3.9 9.3-9.5 0-.6-.1-1.1-.2-1.6H12z"
    />
  </svg>
);

export default function Demo() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; pw?: string }>({});
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next = {
      email: /^\S+@\S+\.\S+$/.test(email) ? undefined : 'Enter a valid email address.',
      pw: pw.length >= 8 ? undefined : 'Password must be at least 8 characters.',
    };
    setErrors(next);
    if (next.email || next.pw) return;
    setState('loading');
    setTimeout(() => setState('done'), 1200);
  };

  const field = (err?: string) =>
    `mt-1 h-11 w-full rounded-xl border bg-surface px-3 text-sm outline-none ${err ? 'border-rose-500' : 'border-line focus:border-accent'}`;

  return (
    <div className="flex h-full overflow-auto">
      <aside className="relative hidden flex-1 flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-teal-500 p-8 text-white @2xl:flex">
        <div className="absolute -top-20 -right-20 size-72 rounded-full bg-white/10 blur-2xl" />
        <p className="relative flex items-center gap-2 font-bold">
          <span className="size-7 rounded-lg bg-white/25" /> Lumen
        </p>
        <figure className="relative">
          <blockquote className="text-lg leading-relaxed">
            “Lumen turned our scattered ideas into a design system in a weekend.”
          </blockquote>
          <figcaption className="mt-3 text-sm text-white/75">
            Hana Ito · Design Lead, Northwind
          </figcaption>
        </figure>
      </aside>
      <main className="flex flex-1 items-center justify-center p-6">
        <form noValidate onSubmit={submit} className="w-full max-w-sm">
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="mt-1 text-sm text-muted">Sign in to continue to Lumen.</p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-line text-sm font-medium hover:bg-surface-2"
            >
              <GoogleIcon /> Google
            </button>
            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-line text-sm font-medium hover:bg-surface-2"
            >
              <span className="size-4 rounded-full bg-fg" aria-hidden /> GitHub
            </button>
          </div>
          <div className="my-5 flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-line" /> or continue with email{' '}
            <span className="h-px flex-1 bg-line" />
          </div>
          {state === 'done' ? (
            <p
              role="status"
              className="rounded-xl bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300"
            >
              Signed in as {email} 🎉
            </p>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm font-medium">
                Email
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!errors.email}
                  className={field(errors.email)}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <span className="mt-1 block text-xs font-normal text-rose-500">
                    {errors.email}
                  </span>
                )}
              </label>
              <label className="block text-sm font-medium">
                <span className="flex justify-between">
                  Password
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="font-normal text-accent"
                  >
                    Forgot password?
                  </a>
                </span>
                <span className="relative block">
                  <input
                    type={show ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    aria-invalid={!!errors.pw}
                    className={`${field(errors.pw)} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? 'Hide password' : 'Show password'}
                    className="absolute top-1/2 right-3 -translate-y-1/2 pt-1 text-muted"
                  >
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </span>
                {errors.pw && (
                  <span className="mt-1 block text-xs font-normal text-rose-500">{errors.pw}</span>
                )}
              </label>
              <label className="flex items-center gap-2 text-sm text-muted">
                <input type="checkbox" defaultChecked /> Remember me
              </label>
              <button
                type="submit"
                disabled={state === 'loading'}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent font-medium text-accent-contrast disabled:opacity-70"
              >
                {state === 'loading' && (
                  <LoaderCircle className="size-4 animate-spin" aria-hidden />
                )}
                {state === 'loading' ? 'Signing in…' : 'Sign in'}
              </button>
            </div>
          )}
          <p className="mt-5 text-center text-sm text-muted">
            New here?{' '}
            <a href="#" onClick={(e) => e.preventDefault()} className="font-medium text-accent">
              Create an account
            </a>
          </p>
        </form>
      </main>
    </div>
  );
}
