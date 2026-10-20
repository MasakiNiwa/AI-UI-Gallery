import { Check, LoaderCircle, RotateCcw, Save } from 'lucide-react';
import { useEffect, useState } from 'react';

type State = 'idle' | 'loading' | 'success' | 'error';

const LOOK: Record<State, { label: string; className: string }> = {
  idle: { label: 'Save changes', className: 'bg-accent text-accent-contrast' },
  loading: { label: 'Saving…', className: 'bg-accent/80 text-accent-contrast' },
  success: { label: 'Saved', className: 'bg-emerald-600 text-white' },
  error: { label: 'Try again', className: 'bg-rose-600 text-white' },
};

export default function Demo() {
  const [state, setState] = useState<State>('idle');
  const [fail, setFail] = useState(false);

  useEffect(() => {
    if (state === 'loading') {
      const id = setTimeout(() => setState(fail ? 'error' : 'success'), 1500);
      return () => clearTimeout(id);
    }
    if (state === 'success' || state === 'error') {
      const id = setTimeout(() => setState('idle'), 2000);
      return () => clearTimeout(id);
    }
  }, [state, fail]);

  const Icon =
    state === 'loading'
      ? LoaderCircle
      : state === 'success'
        ? Check
        : state === 'error'
          ? RotateCcw
          : Save;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-6">
      <button
        type="button"
        disabled={state === 'loading'}
        aria-busy={state === 'loading'}
        onClick={() => setState('loading')}
        className={`inline-flex h-12 w-48 items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-300 ${LOOK[state].className}`}
      >
        <Icon className={`size-5 ${state === 'loading' ? 'animate-spin' : ''}`} aria-hidden />
        {LOOK[state].label}
      </button>
      <p className="sr-only" aria-live="polite">
        {state !== 'idle' && LOOK[state].label}
      </p>
      <label className="flex items-center gap-2 text-sm text-muted">
        <input type="checkbox" checked={fail} onChange={(e) => setFail(e.target.checked)} />
        Simulate an error
      </label>
    </div>
  );
}
