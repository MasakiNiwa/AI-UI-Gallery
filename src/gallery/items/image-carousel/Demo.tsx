import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { DemoProps } from '../../types';
import { useReducedMotion } from '../../hooks';

const SLIDES = [
  {
    title: 'Northern lights',
    caption: 'Tromsø, Norway',
    grad: 'from-emerald-400 via-teal-600 to-indigo-900',
  },
  {
    title: 'Desert dunes',
    caption: 'Sahara, Morocco',
    grad: 'from-amber-300 via-orange-500 to-rose-700',
  },
  {
    title: 'Bamboo forest',
    caption: 'Arashiyama, Kyoto',
    grad: 'from-lime-300 via-green-600 to-emerald-900',
  },
  {
    title: 'Glacier lagoon',
    caption: 'Jökulsárlón, Iceland',
    grad: 'from-sky-200 via-cyan-500 to-blue-900',
  },
  {
    title: 'Lavender fields',
    caption: 'Provence, France',
    grad: 'from-fuchsia-300 via-violet-500 to-indigo-800',
  },
];

export default function Demo({ mode }: DemoProps) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(mode === 'full' && !reduced);
  const [hold, setHold] = useState(false);

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const n = (i + SLIDES.length) % SLIDES.length;
    el.scrollTo({ left: n * el.clientWidth, behavior: reduced ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    const el = track.current!;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) setIndex(Number((e.target as HTMLElement).dataset.i));
      },
      { root: el, threshold: 0.6 },
    );
    el.querySelectorAll('[data-i]').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || hold) return;
    const id = setTimeout(() => goTo(index + 1), 4000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, hold, index]);

  return (
    <div className="flex h-full items-center justify-center p-4 @sm:p-6">
      <section
        aria-roledescription="carousel"
        aria-label="Travel highlights"
        className="relative w-full max-w-2xl"
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onFocus={() => setHold(true)}
        onBlur={() => setHold(false)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') goTo(index - 1);
          if (e.key === 'ArrowRight') goTo(index + 1);
        }}
      >
        <div
          ref={track}
          tabIndex={0}
          className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto rounded-2xl"
        >
          {SLIDES.map((s, i) => (
            <div
              key={s.title}
              data-i={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SLIDES.length}`}
              className={`relative aspect-[16/9] w-full shrink-0 snap-center bg-gradient-to-br ${s.grad}`}
            >
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
                <p className="text-xl font-semibold">{s.title}</p>
                <p className="text-sm text-white/80">{s.caption}</p>
              </div>
            </div>
          ))}
        </div>
        {[
          { side: 'left-2', icon: ChevronLeft, label: 'Previous slide', to: index - 1 },
          { side: 'right-2', icon: ChevronRight, label: 'Next slide', to: index + 1 },
        ].map(({ side, icon: Icon, label, to }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            onClick={() => goTo(to)}
            className={`absolute top-1/2 ${side} flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-900 shadow backdrop-blur hover:bg-white`}
          >
            <Icon className="size-5" />
          </button>
        ))}
        <div className="mt-3 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause autoplay' : 'Start autoplay'}
            className="flex size-8 items-center justify-center rounded-full border border-line text-muted hover:text-fg"
          >
            {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          </button>
          <div className="flex gap-1.5">
            {SLIDES.map((s, i) => (
              <button
                key={s.title}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-accent' : 'w-2 bg-surface-3 hover:bg-muted'}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
