import {
  Check,
  CreditCard,
  House,
  Package,
  ShoppingBag,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';

const STEPS: { icon: LucideIcon; title: string; desc: string; time: string; iso: string }[] = [
  {
    icon: ShoppingBag,
    title: 'Order placed',
    desc: 'We received your order #A-2048.',
    time: 'Oct 18, 09:12',
    iso: '2026-10-18T09:12',
  },
  {
    icon: CreditCard,
    title: 'Payment confirmed',
    desc: 'Visa ending in 4242.',
    time: 'Oct 18, 09:13',
    iso: '2026-10-18T09:13',
  },
  {
    icon: Package,
    title: 'Shipped',
    desc: 'Left the Osaka warehouse.',
    time: 'Oct 19, 14:40',
    iso: '2026-10-19T14:40',
  },
  {
    icon: Truck,
    title: 'Out for delivery',
    desc: 'Your courier is on the way.',
    time: 'Oct 20, 08:05',
    iso: '2026-10-20T08:05',
  },
  {
    icon: House,
    title: 'Delivered',
    desc: 'Left at the front door.',
    time: 'Expected today',
    iso: '2026-10-20',
  },
];

export default function Demo() {
  const [current, setCurrent] = useState(2);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 overflow-auto p-6">
      <style>{`@keyframes demo-pulse{0%{box-shadow:0 0 0 0 var(--accent)}100%{box-shadow:0 0 0 10px transparent}}`}</style>
      <ol className="w-full max-w-sm">
        {STEPS.map((s, i) => {
          const done = i < current;
          const now = i === current;
          const Icon = done ? Check : s.icon;
          return (
            <li
              key={s.title}
              aria-current={now ? 'step' : undefined}
              className="relative flex gap-4 pb-6 last:pb-0"
            >
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className={`absolute top-10 bottom-1 left-[19px] w-0.5 transition-colors duration-500 ${done ? 'bg-accent' : 'border-l-2 border-dashed border-line'}`}
                />
              )}
              <span
                className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-500 ${done ? 'border-accent bg-accent text-accent-contrast' : now ? 'border-accent bg-surface text-accent' : 'border-line bg-surface text-muted'}`}
                style={{ animation: now ? 'demo-pulse 1.6s ease-out infinite' : undefined }}
              >
                <Icon className="size-4" aria-hidden />
              </span>
              <div className={`pt-1.5 ${i > current ? 'opacity-50' : ''}`}>
                <p className="font-medium">{s.title}</p>
                <p className="text-sm text-muted">{s.desc}</p>
                <time dateTime={s.iso} className="text-xs text-muted">
                  {s.time}
                </time>
              </div>
            </li>
          );
        })}
      </ol>
      <button
        type="button"
        onClick={() => setCurrent((c) => (c >= STEPS.length ? 0 : c + 1))}
        className="rounded-xl border border-line bg-surface px-4 py-2 text-sm hover:bg-surface-2"
      >
        {current >= STEPS.length ? 'Reset' : 'Simulate progress'}
      </button>
    </div>
  );
}
