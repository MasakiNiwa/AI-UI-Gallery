import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

type Kind = 'success' | 'error';

const CSS = `
.sc-ring{stroke-dasharray:166;stroke-dashoffset:166;animation:sc-draw .6s cubic-bezier(.65,0,.45,1) forwards}
.sc-fill{transform-origin:center;transform:scale(0);animation:sc-pop .4s .55s cubic-bezier(.34,1.56,.64,1) forwards}
.sc-mark{stroke-dasharray:48;stroke-dashoffset:48;animation:sc-draw .35s .85s cubic-bezier(.65,0,.45,1) forwards}
.sc-mark2{animation-delay:1.05s}
.sc-dot{animation:sc-burst .6s 1s ease-out forwards;opacity:0}
.sc-in{opacity:0;animation:sc-in .5s ease-out forwards}
.sc-shake{animation:sc-shake .4s 1.2s}
@keyframes sc-draw{to{stroke-dashoffset:0}}
@keyframes sc-pop{to{transform:scale(1)}}
@keyframes sc-burst{0%{opacity:1;transform:translate(0,0) scale(1)}100%{opacity:0;transform:translate(var(--x),var(--y)) scale(.4)}}
@keyframes sc-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes sc-shake{20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
@media (prefers-reduced-motion:reduce){.sc-ring,.sc-fill,.sc-mark,.sc-dot,.sc-in,.sc-shake{animation:none!important;stroke-dashoffset:0;transform:none;opacity:1}.sc-dot{opacity:0}}
`;

export default function Demo() {
  const [kind, setKind] = useState<Kind>('success');
  const [run, setRun] = useState(0);
  const ok = kind === 'success';
  const color = ok ? '#22c55e' : '#ef4444';

  const replay = (k: Kind) => {
    setKind(k);
    setRun((r) => r + 1);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 bg-bg p-6 text-center">
      <style>{CSS}</style>
      <div key={run} className="flex flex-col items-center">
        <div className={`relative ${ok ? '' : 'sc-shake'}`}>
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <span
                key={i}
                className="sc-dot absolute top-1/2 left-1/2 -mt-1 -ml-1 size-2 rounded-full"
                style={{
                  background: i % 2 ? color : '#facc15',
                  ['--x' as string]: `${Math.cos(a) * 58}px`,
                  ['--y' as string]: `${Math.sin(a) * 58}px`,
                }}
              />
            );
          })}
          <svg
            viewBox="0 0 56 56"
            className="size-24"
            role="img"
            aria-label={ok ? 'Success' : 'Error'}
          >
            <circle className="sc-fill" cx="28" cy="28" r="26" fill={color} />
            <circle
              className="sc-ring"
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke={color}
              strokeWidth="2.5"
            />
            {ok ? (
              <path
                className="sc-mark"
                d="M16 29l8 8 16-17"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <>
                <path
                  className="sc-mark"
                  d="M19 19l18 18"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  className="sc-mark sc-mark2"
                  d="M37 19L19 37"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
        </div>
        <h2
          className="sc-in mt-5 text-xl font-semibold"
          style={{ animationDelay: '1.1s' }}
          role="status"
        >
          {ok ? 'Payment complete' : 'Payment declined'}
        </h2>
        <p className="sc-in mt-1 text-sm text-muted" style={{ animationDelay: '1.2s' }}>
          {ok
            ? 'A receipt has been sent to your email.'
            : 'Your card was not charged. Please try another card.'}
        </p>
        <div
          className="sc-in mt-4 w-64 rounded-2xl border border-line bg-surface p-4 text-left text-sm"
          style={{ animationDelay: '1.3s' }}
        >
          <div className="flex justify-between">
            <span className="text-muted">Amount</span>
            <span className="font-semibold tabular-nums">$48.00</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-muted">Card</span>
            <span>•••• 4242</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {(['success', 'error'] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => replay(k)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-sm capitalize ${kind === k ? 'border-accent text-accent' : 'border-line text-muted hover:text-fg'}`}
          >
            <RotateCcw className="size-3.5" aria-hidden />
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}
