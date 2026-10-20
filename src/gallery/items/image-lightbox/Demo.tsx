import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useEffect, useRef, useState, type PointerEvent, type WheelEvent } from 'react';
import type { DemoProps } from '../../types';

const PHOTOS = [
  { title: 'Morning fog', grad: 'from-slate-300 via-sky-200 to-indigo-300' },
  { title: 'Desert road', grad: 'from-amber-300 via-orange-400 to-rose-500' },
  { title: 'Moss forest', grad: 'from-lime-300 via-emerald-500 to-teal-800' },
  { title: 'Night city', grad: 'from-indigo-900 via-violet-700 to-fuchsia-500' },
  { title: 'Sea glass', grad: 'from-cyan-200 via-teal-300 to-sky-600' },
  { title: 'Autumn path', grad: 'from-yellow-300 via-orange-500 to-red-700' },
  { title: 'Snow peak', grad: 'from-white via-slate-200 to-blue-400' },
  { title: 'Lavender', grad: 'from-fuchsia-200 via-violet-400 to-indigo-600' },
];

/** A gradient "photo" with a simple sun and hills so zooming shows detail. */
function Photo({ grad }: { grad: string }) {
  return (
    <div className={`relative size-full overflow-hidden bg-gradient-to-br ${grad}`}>
      <span className="absolute top-[18%] right-[22%] size-[14%] rounded-full bg-white/70" />
      <span className="absolute -bottom-[20%] -left-[10%] h-1/2 w-[70%] rounded-[50%] bg-black/20" />
      <span className="absolute right-[-10%] -bottom-[25%] h-1/2 w-[70%] rounded-[50%] bg-black/30" />
    </div>
  );
}

export default function Demo({ mode }: DemoProps) {
  const [index, setIndex] = useState<number | null>(mode === 'preview' ? 2 : null);
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const opener = useRef<HTMLButtonElement | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; vx: number; vy: number; moved: boolean } | null>(
    null,
  );
  const open = index !== null;

  const go = (delta: number) => {
    setIndex((i) => (i === null ? i : (i + delta + PHOTOS.length) % PHOTOS.length));
    setView({ scale: 1, x: 0, y: 0 });
  };
  const zoom = (factor: number) =>
    setView((v) => {
      const scale = Math.min(4, Math.max(1, v.scale * factor));
      return scale === 1 ? { scale, x: 0, y: 0 } : { ...v, scale };
    });
  const close = () => {
    setIndex(null);
    setView({ scale: 1, x: 0, y: 0 });
    opener.current?.focus();
  };

  useEffect(() => {
    if (!open || mode === 'preview') return;
    dialog.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'Tab') {
        // Keep focus inside the dialog.
        const els = [...(dialog.current?.querySelectorAll<HTMLElement>('button') ?? [])];
        const i = els.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        els[(i + (e.shiftKey ? -1 : 1) + els.length) % els.length]?.focus();
      }
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [open, mode]);

  const down = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y, moved: false };
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
    if (view.scale > 1) setView((v) => ({ ...v, x: d.vx + dx, y: d.vy + dy }));
  };
  const up = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    if (d && view.scale === 1 && Math.abs(e.clientX - d.x) > 50) go(e.clientX < d.x ? 1 : -1); // swipe
  };
  const onWheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) zoom(e.deltaY < 0 ? 1.2 : 1 / 1.2);
  };

  const btn =
    'flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20';

  return (
    <div className="relative h-full overflow-hidden p-4">
      <style>{`@keyframes demo-lb-in{from{opacity:0;transform:scale(.96)}}`}</style>
      <ul className="mx-auto grid max-w-lg grid-cols-4 gap-2">
        {PHOTOS.map((p, i) => (
          <li key={p.title}>
            <button
              type="button"
              aria-label={`Open ${p.title}`}
              onClick={(e) => {
                opener.current = e.currentTarget;
                setIndex(i);
              }}
              className="block aspect-square w-full overflow-hidden rounded-xl transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Photo grad={p.grad} />
            </button>
          </li>
        ))}
      </ul>
      {open && (
        <div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label={`${PHOTOS[index].title}, ${index + 1} of ${PHOTOS.length}`}
          tabIndex={-1}
          className="absolute inset-0 z-20 flex flex-col bg-black/90 outline-none"
          style={{ animation: 'demo-lb-in 200ms ease-out' }}
        >
          <div className="flex items-center gap-2 p-3 text-white">
            <p className="text-sm">
              <b>{PHOTOS[index].title}</b>{' '}
              <span className="text-white/60">
                {index + 1} / {PHOTOS.length}
              </span>
            </p>
            <span className="flex-1" />
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => zoom(1 / 1.5)}
              className={btn}
            >
              <ZoomOut className="size-5" />
            </button>
            <button type="button" aria-label="Zoom in" onClick={() => zoom(1.5)} className={btn}>
              <ZoomIn className="size-5" />
            </button>
            <button type="button" aria-label="Close" onClick={close} className={btn}>
              <X className="size-5" />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
            <div
              onPointerDown={down}
              onPointerMove={move}
              onPointerUp={up}
              onDoubleClick={() =>
                setView((v) => (v.scale > 1 ? { scale: 1, x: 0, y: 0 } : { ...v, scale: 2.5 }))
              }
              onWheel={onWheel}
              className={`aspect-[4/3] w-[min(90%,640px)] touch-none overflow-hidden rounded-lg ${view.scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
            >
              <div
                className="size-full transition-transform duration-150"
                style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
              >
                <Photo grad={PHOTOS[index].grad} />
              </div>
            </div>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(-1)}
              className={`${btn} absolute left-3`}
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(1)}
              className={`${btn} absolute right-3`}
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
          <div className="scrollbar-none flex justify-center gap-1.5 overflow-x-auto p-3">
            {PHOTOS.map((p, i) => (
              <button
                key={p.title}
                type="button"
                aria-label={`Show ${p.title}`}
                aria-current={i === index}
                onClick={() => {
                  setIndex(i);
                  setView({ scale: 1, x: 0, y: 0 });
                }}
                className={`size-12 shrink-0 overflow-hidden rounded-md transition ${i === index ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-80'}`}
              >
                <Photo grad={p.grad} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
