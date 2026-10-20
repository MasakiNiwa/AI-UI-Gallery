import { useState } from 'react';

const TAGS = ['All', 'Interiors', 'Nature', 'Architecture'] as const;
const GRADS = [
  'from-amber-200 to-rose-300',
  'from-teal-200 to-sky-400',
  'from-indigo-300 to-violet-400',
  'from-lime-200 to-emerald-400',
  'from-stone-300 to-stone-500',
  'from-orange-200 to-amber-400',
];
const ITEMS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  title: [
    'Morning light',
    'Quiet forest',
    'Concrete lines',
    'Soft linen',
    'Coastal path',
    'Glass house',
    'Reading nook',
  ][i % 7],
  tag: TAGS[(i % 3) + 1],
  ratio: [0.75, 1.25, 1, 1.5, 0.8, 1.1][i % 6],
  grad: GRADS[i % GRADS.length],
  author: ['Aki', 'Leo', 'Mina', 'Sam'][i % 4],
}));

export default function Demo() {
  const [tag, setTag] = useState<(typeof TAGS)[number]>('All');
  const items = ITEMS.filter((i) => tag === 'All' || i.tag === tag);

  return (
    <div className="h-full overflow-auto p-4">
      <div className="mb-3 flex flex-wrap gap-2">
        {TAGS.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={t === tag}
            onClick={() => setTag(t)}
            className={`rounded-full px-3 py-1 text-sm ${t === tag ? 'bg-fg text-bg' : 'bg-surface-2 text-muted'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div
        key={tag}
        className="columns-1 gap-3 @sm:columns-2 @2xl:columns-3 @4xl:columns-4"
        style={{ animation: 'demo-fade 300ms ease-out' }}
      >
        <style>{`@keyframes demo-fade{from{opacity:0;transform:translateY(6px)}}`}</style>
        {items.map((it) => (
          <figure
            key={it.id}
            className="group relative mb-3 break-inside-avoid overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div
              className={`bg-gradient-to-br ${it.grad}`}
              style={{ aspectRatio: `1 / ${it.ratio}` }}
            />
            <div className="absolute inset-0 flex items-start justify-end bg-black/0 p-2 opacity-0 transition group-hover:bg-black/20 group-hover:opacity-100">
              <button
                type="button"
                className="rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white"
              >
                Save
              </button>
            </div>
            <figcaption className="p-3">
              <p className="text-sm font-medium">{it.title}</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                <span className="size-4 rounded-full bg-accent-soft" aria-hidden /> {it.author} ·{' '}
                {it.tag}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
