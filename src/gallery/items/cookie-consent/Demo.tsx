import { Check, Cookie } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import type { DemoProps } from '../../types';

const CATEGORIES = [
  {
    id: 'necessary',
    name: 'Strictly necessary',
    desc: 'Sign-in, security and your cookie choice. Always on.',
    locked: true,
  },
  { id: 'analytics', name: 'Analytics', desc: 'Anonymous usage statistics that help us improve.' },
  { id: 'marketing', name: 'Marketing', desc: 'Personalized ads and measuring campaigns.' },
] as const;

type Prefs = Record<(typeof CATEGORIES)[number]['id'], boolean>;

function Switch({
  on,
  disabled,
  label,
  onChange,
}: {
  on: boolean;
  disabled?: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={`relative h-6 w-10 shrink-0 rounded-full transition-colors disabled:opacity-60 ${on ? 'bg-accent' : 'bg-line'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-4' : ''}`}
      />
    </button>
  );
}

export default function Demo({ mode }: DemoProps) {
  const [open, setOpen] = useState(true);
  const [custom, setCustom] = useState(mode === 'preview');
  const [prefs, setPrefs] = useState<Prefs>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [toast, setToast] = useState('');
  const box = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (open && mode === 'full') box.current?.focus();
  }, [open, mode]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const save = (next: Prefs, message: string) => {
    setPrefs(next);
    setOpen(false);
    setCustom(false);
    setToast(message);
  };

  const btn = 'h-10 flex-1 rounded-xl text-sm font-medium transition-colors';

  return (
    <div className="relative h-full overflow-hidden bg-bg p-5">
      <div className="space-y-3 opacity-60" aria-hidden>
        <div className="h-6 w-1/2 rounded bg-surface-2" />
        <div className="h-3 w-5/6 rounded bg-surface-2" />
        <div className="h-3 w-2/3 rounded bg-surface-2" />
        <div className="mt-6 h-28 rounded-xl bg-surface-2" />
      </div>

      <div
        ref={box}
        tabIndex={-1}
        role="dialog"
        aria-labelledby={`${id}-title`}
        className={`absolute inset-x-3 bottom-3 rounded-2xl border border-line bg-surface p-4 shadow-2xl outline-none transition-all duration-500 ease-out @md:right-auto @md:left-4 @md:w-[360px] ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[120%] opacity-0'}`}
      >
        <div className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-amber-400/15 text-amber-500">
            <Cookie className="size-5" aria-hidden />
          </span>
          <div className="text-sm">
            <h2 id={`${id}-title`} className="font-semibold">
              We value your privacy
            </h2>
            <p className="mt-0.5 text-muted">
              We use cookies to run the site and, with your OK, to measure and improve it.{' '}
              <a
                href="#privacy"
                onClick={(e) => e.preventDefault()}
                className="text-accent underline-offset-2 hover:underline"
              >
                Privacy policy
              </a>
            </p>
          </div>
        </div>
        <div
          className={`grid transition-[grid-template-rows] duration-300 ${custom ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <ul className="overflow-hidden">
            {CATEGORIES.map((c) => (
              <li
                key={c.id}
                className="mt-3 flex items-start gap-3 rounded-xl bg-surface-2 p-3 first:mt-4"
              >
                <div className="flex-1 text-sm">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-muted">{c.desc}</p>
                </div>
                <Switch
                  on={prefs[c.id]}
                  disabled={'locked' in c}
                  label={c.name}
                  onChange={() => setPrefs((p) => ({ ...p, [c.id]: !p[c.id] }))}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex gap-2">
          {custom ? (
            <button
              type="button"
              className={`${btn} bg-accent text-accent-contrast hover:opacity-90`}
              onClick={() => save(prefs, 'Your choices were saved')}
            >
              Save choices
            </button>
          ) : (
            <>
              <button
                type="button"
                className={`${btn} border border-line hover:bg-surface-2`}
                onClick={() =>
                  save(
                    { necessary: true, analytics: false, marketing: false },
                    'Only necessary cookies are used',
                  )
                }
              >
                Reject all
              </button>
              <button
                type="button"
                className={`${btn} border border-line hover:bg-surface-2`}
                onClick={() =>
                  save(
                    { necessary: true, analytics: true, marketing: true },
                    'All cookies accepted',
                  )
                }
              >
                Accept all
              </button>
            </>
          )}
        </div>
        {!custom && (
          <button
            type="button"
            onClick={() => setCustom(true)}
            className="mt-2 w-full text-center text-sm text-muted hover:text-fg"
          >
            Customize
          </button>
        )}
      </div>

      <button
        type="button"
        aria-label="Cookie settings"
        onClick={() => setOpen(true)}
        className={`absolute bottom-4 left-4 grid size-11 place-items-center rounded-full border border-line bg-surface text-amber-500 shadow-lg transition-all duration-300 hover:scale-105 ${open ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Cookie className="size-5" />
      </button>

      <div
        role="status"
        className={`absolute top-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm whitespace-nowrap text-bg shadow-lg transition-all duration-300 ${toast ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'}`}
      >
        <Check className="size-4" aria-hidden />
        {toast}
      </div>
    </div>
  );
}
