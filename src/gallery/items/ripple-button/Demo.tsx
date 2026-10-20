import { useState, type KeyboardEvent, type PointerEvent } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

let nextId = 0;

function RippleButton({ label, className }: { label: string; className: string }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const add = (el: HTMLElement, x: number, y: number) => {
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.2;
    setRipples((r) => [...r, { id: nextId++, x, y, size }]);
  };

  const onPointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    add(e.currentTarget, e.clientX - rect.left, e.clientY - rect.top);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const rect = e.currentTarget.getBoundingClientRect();
    add(e.currentTarget, rect.width / 2, rect.height / 2);
  };

  return (
    <button
      type="button"
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      className={`relative overflow-hidden rounded-xl px-6 py-3 font-medium transition-colors ${className}`}
    >
      {label}
      {ripples.map((r) => (
        <span
          key={r.id}
          onAnimationEnd={() => setRipples((list) => list.filter((x) => x.id !== r.id))}
          className="pointer-events-none absolute rounded-full bg-current opacity-25"
          style={{
            left: r.x - r.size / 2,
            top: r.y - r.size / 2,
            width: r.size,
            height: r.size,
            animation: 'demo-ripple 600ms ease-out forwards',
          }}
        />
      ))}
    </button>
  );
}

export default function Demo() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
      <style>{`@keyframes demo-ripple{from{transform:scale(0);opacity:.35}to{transform:scale(1);opacity:0}}`}</style>
      <RippleButton label="Filled" className="bg-accent text-accent-contrast" />
      <RippleButton label="Outlined" className="border border-accent text-accent" />
      <RippleButton label="Text" className="text-accent hover:bg-accent-soft" />
    </div>
  );
}
