import { useEffect, useRef, useState } from 'react';

const SECTIONS = [
  {
    title: 'Describe it',
    text: 'Start with a sentence: the UI you want and how it should feel.',
    grad: 'from-indigo-400 to-sky-400',
  },
  {
    title: 'Name it',
    text: 'Use the right vocabulary: bento grid, toast, command palette.',
    grad: 'from-teal-400 to-emerald-400',
  },
  {
    title: 'Generate it',
    text: 'Let AI write the first version in seconds.',
    grad: 'from-amber-400 to-rose-400',
  },
  {
    title: 'Refine it',
    text: 'Iterate with small, specific follow-up prompts.',
    grad: 'from-violet-400 to-fuchsia-400',
  },
  {
    title: 'Ship it',
    text: 'Test on mobile, check accessibility, and publish.',
    grad: 'from-sky-400 to-indigo-500',
  },
];

export default function Demo() {
  const scroller = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(new Set());

  useEffect(() => {
    const root = scroller.current!;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = Number((e.target as HTMLElement).dataset.i);
          if (e.isIntersecting) {
            setSeen((s) => (s.has(i) ? s : new Set(s).add(i)));
            setCurrent(i);
          }
        }
      },
      { root, threshold: 0.25 },
    );
    root.querySelectorAll('[data-i]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative h-full">
      <div className="absolute inset-x-0 top-0 z-10 h-1 bg-surface-3">
        <div
          className="h-full bg-accent transition-[width] duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <p className="absolute top-4 right-4 z-10 rounded-full bg-surface/90 px-3 py-1 text-xs font-medium tabular-nums shadow backdrop-blur">
        {current + 1} / {SECTIONS.length}
      </p>
      <div
        ref={scroller}
        onScroll={(e) => {
          const el = e.currentTarget;
          setProgress(el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight));
        }}
        className="h-full overflow-y-auto px-6"
      >
        <div className="flex h-[70%] flex-col items-center justify-center text-center">
          <p className="text-sm text-muted">Scroll down ↓</p>
          <h2 className="mt-2 text-2xl font-bold @md:text-4xl">From idea to UI in five steps</h2>
        </div>
        {SECTIONS.map((s, i) => {
          const on = seen.has(i);
          const reveal = (delay: number) => ({
            className: `transition-all duration-700 ease-out motion-reduce:transition-none ${on ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'}`,
            style: { transitionDelay: `${delay}ms` },
          });
          return (
            <section
              key={s.title}
              data-i={i}
              className={`mx-auto flex min-h-[80%] max-w-3xl flex-col items-center justify-center gap-6 py-10 @2xl:flex-row ${i % 2 ? '@2xl:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 space-y-2">
                <p {...reveal(0)}>
                  <span className="text-sm font-semibold text-accent">Step {i + 1}</span>
                </p>
                <h3 {...reveal(100)}>
                  <span className="text-2xl font-bold">{s.title}</span>
                </h3>
                <p {...reveal(200)}>
                  <span className="text-muted">{s.text}</span>
                </p>
              </div>
              <div {...reveal(300)}>
                <div
                  className={`aspect-[4/3] w-64 rounded-3xl bg-gradient-to-br shadow-xl ${s.grad}`}
                />
              </div>
            </section>
          );
        })}
        <div className="h-[30%]" />
      </div>
    </div>
  );
}
