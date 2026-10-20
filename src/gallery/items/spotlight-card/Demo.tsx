import { Boxes, Cpu, GitBranch, Lock, Rocket, Zap, type LucideIcon } from 'lucide-react';
import { useRef, type PointerEvent } from 'react';

const FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Zap, title: 'Instant builds', desc: 'Incremental compilation in milliseconds.' },
  { icon: GitBranch, title: 'Preview branches', desc: 'Every pull request gets its own URL.' },
  { icon: Lock, title: 'Secure by default', desc: 'Secrets are encrypted at rest.' },
  { icon: Cpu, title: 'Edge functions', desc: 'Run code close to your users.' },
  { icon: Boxes, title: 'Monorepo ready', desc: 'Build only what changed.' },
  { icon: Rocket, title: 'One-click deploy', desc: 'Ship to production with confidence.' },
];

export default function Demo() {
  const grid = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    for (const card of grid.current?.children ?? []) {
      const el = card as HTMLElement;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--x', `${e.clientX - r.left}px`);
      el.style.setProperty('--y', `${e.clientY - r.top}px`);
      el.style.setProperty('--o', '1');
    }
  };
  const onLeave = () => {
    for (const card of grid.current?.children ?? [])
      (card as HTMLElement).style.setProperty('--o', '0');
  };

  return (
    <div className="flex h-full items-center justify-center overflow-auto bg-[#0d0f13] p-6">
      <div
        ref={grid}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="grid w-full max-w-3xl grid-cols-1 gap-3 @md:grid-cols-2 @3xl:grid-cols-3"
      >
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="relative rounded-2xl p-px"
            style={{
              // Border glow: a gradient on the 1px padding ring around the inner card.
              background:
                'radial-gradient(300px circle at var(--x, -999px) var(--y, -999px), rgba(160,180,230,calc(.55 * var(--o, 0))), rgba(255,255,255,.07) 60%)',
            }}
          >
            <div
              className="relative h-full rounded-[15px] bg-[#15181e] p-5 text-slate-200"
              style={{
                backgroundImage:
                  'radial-gradient(400px circle at var(--x, -999px) var(--y, -999px), rgba(160,180,230,calc(.09 * var(--o, 0))), transparent 70%)',
              }}
            >
              <Icon className="size-6 text-slate-400" aria-hidden />
              <p className="mt-3 font-semibold">{title}</p>
              <p className="mt-1 text-sm text-slate-400">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
