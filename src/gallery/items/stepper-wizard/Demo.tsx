import { Check } from 'lucide-react';
import { useState, type CSSProperties } from 'react';

const STEPS = ['Account', 'Profile', 'Preferences', 'Confirm'];

export default function Demo() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState({ email: '', name: '', role: 'Designer', newsletter: true });
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState(false);

  const valid =
    step === 0 ? /^\S+@\S+\.\S+$/.test(data.email) : step === 1 ? data.name.trim() !== '' : true;
  const go = (to: number) => {
    setDir(to > step ? 1 : -1);
    setStep(to);
    setTouched(false);
  };
  const next = () => {
    if (!valid) return setTouched(true);
    if (step === STEPS.length - 1) setDone(true);
    else go(step + 1);
  };

  const field =
    'mt-1 h-10 w-full rounded-xl border border-line bg-surface px-3 text-sm outline-none focus:border-accent';

  return (
    <div className="flex h-full items-start justify-center overflow-auto p-6">
      <style>{`@keyframes demo-step-in{from{opacity:0;transform:translateX(calc(var(--d) * 24px))}}`}</style>
      <div className="w-full max-w-md">
        <ol className="mb-6 hidden items-center @sm:flex">
          {STEPS.map((s, i) => (
            <li key={s} className="flex flex-1 items-center last:flex-none">
              <button
                type="button"
                disabled={i >= step || done}
                onClick={() => go(i)}
                aria-current={i === step ? 'step' : undefined}
                className="flex flex-col items-center gap-1"
              >
                <span
                  className={`flex size-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors ${i < step || done ? 'border-accent bg-accent text-accent-contrast' : i === step ? 'border-accent text-accent' : 'border-line text-muted'}`}
                >
                  {i < step || done ? <Check className="size-4" aria-hidden /> : i + 1}
                </span>
                <span className={`text-xs ${i === step ? 'font-medium' : 'text-muted'}`}>{s}</span>
              </button>
              {i < STEPS.length - 1 && (
                <span className="mx-1 mb-5 h-0.5 flex-1 overflow-hidden rounded bg-line">
                  <span
                    className="block h-full bg-accent transition-[width] duration-500"
                    style={{ width: i < step || done ? '100%' : '0%' }}
                  />
                </span>
              )}
            </li>
          ))}
        </ol>
        <div className="mb-4 @sm:hidden">
          <p className="text-sm text-muted">
            Step {step + 1} of {STEPS.length}:{' '}
            <span className="font-medium text-fg">{STEPS[step]}</span>
          </p>
          <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-surface-3">
            <span
              className="block h-full bg-accent transition-[width]"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </span>
        </div>

        <div
          key={done ? 'done' : step}
          className="rounded-2xl border border-line bg-surface p-5"
          style={{ animation: 'demo-step-in 250ms ease-out', '--d': dir } as CSSProperties}
        >
          {done ? (
            <div className="py-6 text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                <Check className="size-6" />
              </span>
              <p className="mt-3 font-semibold">All set, {data.name}!</p>
              <button
                type="button"
                onClick={() => {
                  setDone(false);
                  go(0);
                }}
                className="mt-3 text-sm text-accent"
              >
                Start over
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-semibold">{STEPS[step]}</h3>
              <div className="mt-3 text-sm">
                {step === 0 && (
                  <label className="block">
                    Email
                    <input
                      className={field}
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      placeholder="you@example.com"
                    />
                    {touched && !valid && (
                      <span className="mt-1 block text-xs text-rose-500">Enter a valid email.</span>
                    )}
                  </label>
                )}
                {step === 1 && (
                  <label className="block">
                    Display name
                    <input
                      className={field}
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      placeholder="Your name"
                    />
                    {touched && !valid && (
                      <span className="mt-1 block text-xs text-rose-500">Name is required.</span>
                    )}
                  </label>
                )}
                {step === 2 && (
                  <div className="space-y-3">
                    <label className="block">
                      Role
                      <select
                        className={field}
                        value={data.role}
                        onChange={(e) => setData({ ...data, role: e.target.value })}
                      >
                        <option>Designer</option>
                        <option>Engineer</option>
                        <option>Product manager</option>
                      </select>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={data.newsletter}
                        onChange={(e) => setData({ ...data, newsletter: e.target.checked })}
                      />
                      Send me product updates
                    </label>
                  </div>
                )}
                {step === 3 && (
                  <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
                    <dt className="text-muted">Email</dt>
                    <dd>{data.email}</dd>
                    <dt className="text-muted">Name</dt>
                    <dd>{data.name}</dd>
                    <dt className="text-muted">Role</dt>
                    <dd>{data.role}</dd>
                    <dt className="text-muted">Updates</dt>
                    <dd>{data.newsletter ? 'Yes' : 'No'}</dd>
                  </dl>
                )}
              </div>
              <div className="mt-5 flex justify-between">
                <button
                  type="button"
                  disabled={step === 0}
                  onClick={() => go(step - 1)}
                  className="rounded-xl px-4 py-2 text-sm text-muted hover:bg-surface-2 disabled:opacity-40"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="rounded-xl bg-accent px-5 py-2 text-sm font-medium text-accent-contrast"
                >
                  {step === STEPS.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
