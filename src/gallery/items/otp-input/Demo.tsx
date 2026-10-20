import { LoaderCircle } from 'lucide-react';
import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';

const LEN = 6;
const CORRECT = '123456';

export default function Demo() {
  const [digits, setDigits] = useState<string[]>(Array(LEN).fill(''));
  const [status, setStatus] = useState<'idle' | 'checking' | 'ok' | 'error'>('idle');
  const [resendIn, setResendIn] = useState(30);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const id = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [resendIn]);

  const submit = (code: string) => {
    setStatus('checking');
    setTimeout(() => {
      if (code === CORRECT) setStatus('ok');
      else {
        setStatus('error');
        setTimeout(() => {
          setDigits(Array(LEN).fill(''));
          setStatus('idle');
          refs.current[0]?.focus();
        }, 600);
      }
    }, 800);
  };

  const update = (next: string[]) => {
    setDigits(next);
    if (next.every(Boolean)) submit(next.join(''));
  };

  const onChange = (i: number, raw: string) => {
    const d = raw.replace(/\D/g, '').slice(-1);
    if (!d) return;
    const next = [...digits];
    next[i] = d;
    update(next);
    refs.current[Math.min(i + 1, LEN - 1)]?.focus();
  };

  const onKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const next = [...digits];
      if (next[i]) next[i] = '';
      else if (i > 0) {
        next[i - 1] = '';
        refs.current[i - 1]?.focus();
      }
      setDigits(next);
    } else if (e.key === 'ArrowLeft') refs.current[i - 1]?.focus();
    else if (e.key === 'ArrowRight') refs.current[i + 1]?.focus();
  };

  const onPaste = (e: ClipboardEvent) => {
    const code = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, LEN);
    if (!code) return;
    e.preventDefault();
    const next = Array.from({ length: LEN }, (_, i) => code[i] ?? '');
    update(next);
    refs.current[Math.min(code.length, LEN - 1)]?.focus();
  };

  const border =
    status === 'ok'
      ? 'border-emerald-500'
      : status === 'error'
        ? 'border-rose-500'
        : 'border-line focus:border-accent';

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
      <style>{`@keyframes demo-shake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}`}</style>
      <div>
        <h2 className="text-lg font-semibold">Enter verification code</h2>
        <p className="text-sm text-muted">
          We sent a code to your phone. (Try <span className="font-mono">123456</span>)
        </p>
      </div>
      <div
        className="flex gap-2"
        onPaste={onPaste}
        style={{ animation: status === 'error' ? 'demo-shake 300ms 2' : undefined }}
      >
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={d}
            onChange={(e) => onChange(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onFocus={(e) => e.target.select()}
            inputMode="numeric"
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            aria-label={`Digit ${i + 1}`}
            disabled={status === 'checking' || status === 'ok'}
            className={`size-11 rounded-xl border-2 bg-surface text-center text-xl font-semibold outline-none transition-colors @sm:size-12 ${border}`}
          />
        ))}
      </div>
      <p className="h-5 text-sm" aria-live="polite">
        {status === 'checking' && (
          <span className="inline-flex items-center gap-1.5 text-muted">
            <LoaderCircle className="size-4 animate-spin" aria-hidden /> Verifying…
          </span>
        )}
        {status === 'ok' && (
          <span className="text-emerald-600 dark:text-emerald-400">Verified!</span>
        )}
        {status === 'error' && (
          <span className="text-rose-600 dark:text-rose-400">Incorrect code</span>
        )}
      </p>
      <button
        type="button"
        disabled={resendIn > 0}
        onClick={() => setResendIn(30)}
        className="text-sm text-accent disabled:text-muted"
      >
        {resendIn > 0 ? `Resend code in ${resendIn}s` : 'Resend code'}
      </button>
    </div>
  );
}
