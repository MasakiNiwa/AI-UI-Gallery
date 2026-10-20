import { ArrowRight } from 'lucide-react';
import { useRef, type PointerEvent } from 'react';
import { useReducedMotion } from '../../hooks';

const SPRING = 'transform 500ms cubic-bezier(.34,1.56,.64,1)';

export default function Demo() {
  const btn = useRef<HTMLButtonElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse' || !btn.current || !label.current) return;
    const r = btn.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    btn.current.style.transition = 'transform 100ms linear';
    label.current.style.transition = 'transform 100ms linear';
    btn.current.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
    label.current.style.transform = `translate(${dx * 0.2}px, ${dy * 0.2}px)`;
  };

  const leave = () => {
    for (const el of [btn.current, label.current]) {
      if (!el) continue;
      el.style.transition = SPRING;
      el.style.transform = 'translate(0, 0)';
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-6">
      {/* The hit area is larger than the button so the pull starts before the pointer touches it. */}
      <div onPointerMove={move} onPointerLeave={leave} className="p-10">
        <button
          ref={btn}
          type="button"
          className="rounded-full bg-fg px-8 py-4 font-semibold text-bg shadow-lg"
        >
          <span ref={label} className="inline-flex items-center gap-2">
            Get started <ArrowRight className="size-4" aria-hidden />
          </span>
        </button>
      </div>
      <p className="text-sm text-muted">Move your mouse near the button.</p>
    </div>
  );
}
