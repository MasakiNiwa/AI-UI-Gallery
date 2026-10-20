import { useRef, useState, type UIEvent } from 'react';

export default function Demo() {
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const last = useRef(0);
  const frame = useRef(0);
  const header = useRef<HTMLElement>(null);

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const y = el.scrollTop;
      const delta = y - last.current;
      setCompact(y > 40);
      setProgress(y / Math.max(1, el.scrollHeight - el.clientHeight));
      if (Math.abs(delta) >= 8) {
        const focusInside = header.current?.contains(document.activeElement);
        setHidden(delta > 0 && y > 200 && !focusInside);
        last.current = y;
      }
    });
  };

  return (
    <div className="relative h-full overflow-hidden">
      <header
        ref={header}
        className={`absolute inset-x-0 top-0 z-10 flex items-center gap-3 px-5 transition-all duration-300 ${compact ? 'h-14 bg-surface/80 shadow-md backdrop-blur-md' : 'h-24 bg-surface'} ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <span
          className={`rounded-xl bg-gradient-to-br from-accent to-teal-400 transition-all duration-300 ${compact ? 'size-8' : 'size-12'}`}
        />
        <span
          className={`font-bold transition-all duration-300 ${compact ? 'text-base' : 'text-2xl'}`}
        >
          Lumen Journal
        </span>
        <nav aria-label="Sections" className="ml-auto flex gap-1 text-sm">
          {['Latest', 'Design', 'Code'].map((l) => (
            <a
              key={l}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="rounded-lg px-2.5 py-1 text-muted hover:bg-surface-2 hover:text-fg"
            >
              {l}
            </a>
          ))}
        </nav>
        <span
          className="absolute bottom-0 left-0 h-0.5 bg-accent"
          style={{ width: `${progress * 100}%` }}
        />
      </header>
      <div onScroll={onScroll} className="h-full overflow-y-auto px-5 pt-28 pb-10">
        <article className="mx-auto max-w-prose space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-bold">Designing calm interfaces</h2>
          {Array.from({ length: 14 }, (_, i) => (
            <p
              key={i}
              className={i % 4 === 3 ? 'rounded-xl bg-surface-2 p-4 text-muted' : 'text-muted'}
            >
              {i % 4 === 3
                ? 'Scroll down to see the header shrink and hide, then scroll up a little to bring it back.'
                : 'Calm interfaces respect attention. They use restrained color, generous spacing and motion that explains rather than decorates. Every element earns its place, and the most important action is always obvious.'}
            </p>
          ))}
        </article>
      </div>
    </div>
  );
}
