import { Check, X } from 'lucide-react';
import { useState } from 'react';

const FEATURES = [
  'Unlimited projects',
  'Custom domains',
  'Analytics',
  'Team roles',
  'Priority support',
];
const PLANS = [
  { name: 'Free', desc: 'For side projects', monthly: 0, included: 1, cta: 'Start free' },
  {
    name: 'Pro',
    desc: 'For professionals',
    monthly: 12,
    included: 3,
    cta: 'Upgrade to Pro',
    popular: true,
  },
  { name: 'Team', desc: 'For growing teams', monthly: 29, included: 5, cta: 'Contact sales' },
];

export default function Demo() {
  const [yearly, setYearly] = useState(true);

  return (
    <div className="h-full overflow-auto p-4 @sm:p-6">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5">
        <div
          role="radiogroup"
          aria-label="Billing period"
          className="inline-flex rounded-xl bg-surface-2 p-1 text-sm"
        >
          {[false, true].map((y) => (
            <button
              key={String(y)}
              type="button"
              role="radio"
              aria-checked={yearly === y}
              onClick={() => setYearly(y)}
              className={`rounded-lg px-4 py-1.5 ${yearly === y ? 'bg-surface font-medium shadow' : 'text-muted'}`}
            >
              {y ? 'Yearly' : 'Monthly'}
              {y && (
                <span className="ml-1.5 rounded bg-emerald-500/15 px-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                  −20%
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="grid w-full grid-cols-1 items-center gap-4 @2xl:grid-cols-3">
          {PLANS.map((p) => {
            const price = yearly ? Math.round(p.monthly * 0.8) : p.monthly;
            return (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl border bg-surface p-5 ${p.popular ? 'order-first border-2 border-accent shadow-xl @2xl:order-none @2xl:-my-2 @2xl:py-7' : 'border-line'}`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-xs font-medium text-accent-contrast">
                    Most popular
                  </span>
                )}
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-muted">{p.desc}</p>
                <p className="mt-3">
                  <span
                    key={price}
                    className="inline-block text-3xl font-bold tabular-nums"
                    style={{ animation: 'demo-price 300ms ease-out' }}
                  >
                    ${price}
                  </span>
                  <span className="text-sm text-muted"> / month</span>
                </p>
                <p className="h-4 text-xs text-muted">
                  {yearly && p.monthly > 0 ? `billed $${price * 12} yearly` : ''}
                </p>
                <button
                  type="button"
                  className={`mt-4 rounded-xl py-2 text-sm font-medium ${p.popular ? 'bg-accent text-accent-contrast' : 'border border-line hover:bg-surface-2'}`}
                >
                  {p.cta}
                </button>
                <ul className="mt-4 space-y-2 text-sm">
                  {FEATURES.map((f, i) => {
                    const ok = i < p.included;
                    return (
                      <li
                        key={f}
                        className={`flex items-center gap-2 ${ok ? '' : 'text-muted opacity-60'}`}
                      >
                        {ok ? (
                          <Check className="size-4 text-emerald-500" aria-label="Included" />
                        ) : (
                          <X className="size-4" aria-label="Not included" />
                        )}
                        {f}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`@keyframes demo-price{from{opacity:0;transform:translateY(-6px)}}`}</style>
    </div>
  );
}
