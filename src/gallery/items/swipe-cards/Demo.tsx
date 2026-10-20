import { Heart, RotateCcw, X } from 'lucide-react';
import { useRef, useState, type PointerEvent } from 'react';

const CARDS = [
  {
    title: 'Matcha Pancakes',
    meta: '25 min · Breakfast',
    grad: 'from-lime-300 to-emerald-500',
    emoji: '🥞',
  },
  {
    title: 'Spicy Ramen',
    meta: '40 min · Dinner',
    grad: 'from-orange-300 to-rose-500',
    emoji: '🍜',
  },
  {
    title: 'Berry Smoothie Bowl',
    meta: '10 min · Snack',
    grad: 'from-fuchsia-300 to-violet-500',
    emoji: '🫐',
  },
  {
    title: 'Avocado Toast',
    meta: '8 min · Brunch',
    grad: 'from-yellow-200 to-lime-500',
    emoji: '🥑',
  },
  {
    title: 'Miso Salmon',
    meta: '30 min · Dinner',
    grad: 'from-amber-200 to-orange-500',
    emoji: '🍣',
  },
];

export default function Demo() {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState<('like' | 'nope')[]>([]);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [leaving, setLeaving] = useState<'like' | 'nope' | null>(null);
  const start = useRef({ x: 0, y: 0, t: 0 });
  const box = useRef<HTMLDivElement>(null);

  const decide = (dir: 'like' | 'nope') => {
    if (leaving || index >= CARDS.length) return;
    setLeaving(dir);
    setTimeout(() => {
      setHistory((h) => [...h, dir]);
      setIndex((i) => i + 1);
      setLeaving(null);
      setDrag({ x: 0, y: 0, active: false });
    }, 300);
  };

  const down = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    setDrag({ x: 0, y: 0, active: true });
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.active) return;
    setDrag({ x: e.clientX - start.current.x, y: e.clientY - start.current.y, active: true });
  };
  const up = () => {
    const w = box.current?.clientWidth ?? 300;
    const v = drag.x / Math.max(1, performance.now() - start.current.t);
    if (Math.abs(drag.x) > w * 0.3 || Math.abs(v) > 0.6) decide(drag.x > 0 ? 'like' : 'nope');
    else setDrag({ x: 0, y: 0, active: false });
  };

  const outX = leaving === 'like' ? 600 : leaving === 'nope' ? -600 : drag.x;
  const rot = Math.max(-15, Math.min(15, outX / 12));
  const likeOp = Math.max(0, Math.min(1, outX / 100));
  const nopeOp = Math.max(0, Math.min(1, -outX / 100));

  return (
    <div
      className="flex h-full flex-col items-center justify-center gap-5 p-4"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') decide('like');
        if (e.key === 'ArrowLeft') decide('nope');
      }}
    >
      <div ref={box} className="relative h-72 w-60">
        {index >= CARDS.length && (
          <div className="flex h-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-line text-center text-sm text-muted">
            <p>You liked {history.filter((h) => h === 'like').length} recipes!</p>
            <button
              type="button"
              onClick={() => {
                setIndex(0);
                setHistory([]);
              }}
              className="rounded-xl bg-accent px-4 py-2 font-medium text-accent-contrast"
            >
              Start over
            </button>
          </div>
        )}
        {CARDS.slice(index, index + 3)
          .map((c, i) => ({ c, i }))
          .reverse()
          .map(({ c, i }) => {
            const top = i === 0;
            return (
              <div
                key={c.title}
                onPointerDown={top ? down : undefined}
                onPointerMove={top ? move : undefined}
                onPointerUp={top ? up : undefined}
                aria-hidden={!top}
                className={`absolute inset-0 flex touch-none flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br p-5 text-white shadow-xl select-none ${c.grad} ${top ? 'cursor-grab active:cursor-grabbing' : ''}`}
                style={{
                  transform: top
                    ? `translate(${outX}px, ${drag.y * 0.3}px) rotate(${rot}deg)`
                    : `translateY(${i * 12}px) scale(${1 - i * 0.05})`,
                  transition:
                    top && drag.active && !leaving
                      ? 'none'
                      : 'transform 300ms cubic-bezier(.2,.8,.2,1)',
                  zIndex: 10 - i,
                }}
              >
                <span className="absolute top-8 left-1/2 -translate-x-1/2 text-7xl">{c.emoji}</span>
                {top && (
                  <>
                    <span
                      className="absolute top-5 left-5 -rotate-12 rounded-lg border-4 border-emerald-400 px-2 text-2xl font-black text-emerald-300"
                      style={{ opacity: likeOp }}
                    >
                      LIKE
                    </span>
                    <span
                      className="absolute top-5 right-5 rotate-12 rounded-lg border-4 border-rose-400 px-2 text-2xl font-black text-rose-300"
                      style={{ opacity: nopeOp }}
                    >
                      NOPE
                    </span>
                  </>
                )}
                <p className="text-xl font-bold drop-shadow">{c.title}</p>
                <p className="text-sm text-white/85">{c.meta}</p>
              </div>
            );
          })}
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Nope"
          onClick={() => decide('nope')}
          disabled={index >= CARDS.length}
          className="flex size-14 items-center justify-center rounded-full border border-line bg-surface text-rose-500 shadow hover:scale-105 disabled:opacity-40"
        >
          <X className="size-6" />
        </button>
        <button
          type="button"
          aria-label="Undo"
          onClick={() => {
            if (index > 0) {
              setIndex((i) => i - 1);
              setHistory((h) => h.slice(0, -1));
            }
          }}
          disabled={index === 0}
          className="flex size-10 items-center justify-center rounded-full border border-line bg-surface text-muted shadow disabled:opacity-40"
        >
          <RotateCcw className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Like"
          onClick={() => decide('like')}
          disabled={index >= CARDS.length}
          className="flex size-14 items-center justify-center rounded-full border border-line bg-surface text-emerald-500 shadow hover:scale-105 disabled:opacity-40"
        >
          <Heart className="size-6 fill-current" />
        </button>
      </div>
    </div>
  );
}
