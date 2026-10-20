import { Heart } from 'lucide-react';
import { useState, type CSSProperties } from 'react';

const COLORS = [
  '#f43f5e',
  '#f59e0b',
  '#10b981',
  '#3b82f6',
  '#a855f7',
  '#ec4899',
  '#14b8a6',
  '#eab308',
];

export default function Demo() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(128);
  const [burst, setBurst] = useState(0);
  const [touched, setTouched] = useState(false);

  const toggle = () => {
    setTouched(true);
    setLiked((l) => !l);
    setCount((c) => c + (liked ? -1 : 1));
    if (!liked) setBurst((b) => b + 1);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
      <style>{`
        @keyframes demo-pop{0%{transform:scale(1)}30%{transform:scale(1.35)}55%{transform:scale(.9)}80%{transform:scale(1.08)}100%{transform:scale(1)}}
        @keyframes demo-shrink{50%{transform:scale(.8)}}
        @keyframes demo-ring{from{transform:scale(.3);opacity:.6}to{transform:scale(1.6);opacity:0}}
        @keyframes demo-dot{from{transform:rotate(var(--a)) translateY(0) scale(1);opacity:1}to{transform:rotate(var(--a)) translateY(-34px) scale(.3);opacity:0}}
        @keyframes demo-count{from{transform:translateY(60%);opacity:0}}
      `}</style>
      <div className="flex items-center gap-3 rounded-full border border-line bg-surface py-2 pr-5 pl-2">
        <button
          type="button"
          aria-pressed={liked}
          aria-label="Like"
          onClick={toggle}
          className="relative flex size-12 items-center justify-center rounded-full hover:bg-surface-2"
        >
          {liked && (
            <span key={burst} aria-hidden className="pointer-events-none absolute inset-0">
              <span
                className="absolute inset-1 rounded-full border-2 border-rose-400"
                style={{ animation: 'demo-ring 500ms ease-out forwards' }}
              />
              {COLORS.map((c, i) => (
                <span
                  key={c}
                  className="absolute top-1/2 left-1/2 -mt-1 -ml-1 size-2 rounded-full"
                  style={
                    {
                      background: c,
                      '--a': `${i * 45}deg`,
                      animation: 'demo-dot 600ms ease-out forwards',
                    } as CSSProperties
                  }
                />
              ))}
            </span>
          )}
          <Heart
            key={`${liked}`}
            className={`size-7 transition-colors ${liked ? 'fill-rose-500 text-rose-500' : 'text-muted'}`}
            style={{
              animation: !touched
                ? undefined
                : liked
                  ? 'demo-pop 500ms ease-out'
                  : 'demo-shrink 250ms ease-out',
            }}
          />
        </button>
        <span
          key={count}
          className="w-10 font-semibold tabular-nums"
          style={{ animation: touched ? 'demo-count 250ms ease-out' : undefined }}
        >
          {count}
        </span>
      </div>
      <p className="text-sm text-muted">{liked ? 'You liked this' : 'Tap the heart'}</p>
    </div>
  );
}
