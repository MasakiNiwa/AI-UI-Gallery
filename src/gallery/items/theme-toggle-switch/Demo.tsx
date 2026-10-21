import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';

type DocWithVT = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

export default function Demo() {
  // Start in the gallery's current theme.
  const [night, setNight] = useState(() => document.documentElement.classList.contains('dark'));
  const btn = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    const doc = document as DocWithVT;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!doc.startViewTransition || reduced) return setNight((n) => !n);
    const b = btn.current!.getBoundingClientRect();
    const x = b.left + b.width / 2;
    const y = b.top + b.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = doc.startViewTransition(() => flushSync(() => setNight((n) => !n)));
    void vt.ready.then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 600, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' },
      ),
    );
  };

  const ease = 'transition-all duration-500 ease-in-out';

  return (
    <div
      className={`flex h-full flex-col items-center justify-center gap-6 p-6 ${night ? 'bg-[#0f1424] text-slate-100' : 'bg-[#eef4fb] text-slate-800'}`}
    >
      <button
        ref={btn}
        type="button"
        role="switch"
        aria-checked={night}
        aria-label="Dark theme"
        onClick={toggle}
        className={`relative h-9 w-20 overflow-hidden rounded-full shadow-inner ${ease} ${night ? 'bg-[#1b2340]' : 'bg-sky-400'}`}
      >
        {[
          [12, 8],
          [24, 20],
          [16, 28],
          [32, 12],
          [40, 24],
        ].map(([l, t], i) => (
          <span
            key={i}
            className={`absolute size-0.5 rounded-full bg-white ${ease}`}
            style={{
              left: l,
              top: t,
              opacity: night ? 1 : 0,
              animation: night ? `demo-twinkle 2s ${i * 0.3}s infinite` : undefined,
            }}
          />
        ))}
        <span
          className={`absolute h-3 w-7 rounded-full bg-white/90 ${ease}`}
          style={{ left: night ? 90 : 40, top: 18 }}
        />
        <span
          className={`absolute h-2.5 w-5 rounded-full bg-white/70 ${ease}`}
          style={{ left: night ? 100 : 52, top: 9 }}
        />
        <span
          className={`absolute top-1 size-7 rounded-full ${ease} ${night ? 'bg-slate-200 shadow-[0_0_8px_rgba(226,232,240,.6)]' : 'bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,.9)]'}`}
          style={{ left: night ? 48 : 4 }}
        >
          {[
            [6, 6, 6],
            [15, 14, 4],
            [8, 17, 3],
          ].map(([l, t, s], i) => (
            <span
              key={i}
              className={`absolute rounded-full bg-slate-400/60 ${ease}`}
              style={{ left: l, top: t, width: s, height: s, opacity: night ? 1 : 0 }}
            />
          ))}
        </span>
      </button>
      <style>{`@keyframes demo-twinkle{50%{opacity:.2}}`}</style>
      <div
        className={`w-full max-w-xs rounded-2xl border p-5 ${night ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}
      >
        <p className="font-semibold">{night ? 'Good evening' : 'Good morning'}</p>
        <p className={`mt-1 text-sm ${night ? 'text-slate-400' : 'text-slate-500'}`}>
          Flip the switch: the new theme is revealed with a circle that grows from the toggle (View
          Transitions API).
        </p>
      </div>
    </div>
  );
}
