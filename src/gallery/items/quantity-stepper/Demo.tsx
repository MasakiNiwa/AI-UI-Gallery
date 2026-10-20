import { Minus, Plus, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const MAX = 20;

function Stepper({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  // The latest value, read by the press-and-hold timer.
  const latest = useRef(value);
  useEffect(() => {
    latest.current = value;
  }, [value]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const set = (v: number) => {
    const next = Math.max(0, Math.min(MAX, v));
    latest.current = next;
    onChange(next);
  };
  /** Press and hold: repeat the step, getting faster after a short delay. */
  const hold = (delta: number) => {
    set(latest.current + delta);
    let delay = 400;
    const tick = () => {
      set(latest.current + delta);
      delay = Math.max(60, delay * 0.8);
      timer.current = setTimeout(tick, delay);
    };
    timer.current = setTimeout(tick, 500);
  };
  const release = () => clearTimeout(timer.current);

  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowUp: 1, ArrowDown: -1, PageUp: 5, PageDown: -5 };
    if (e.key in map) set(value + map[e.key]);
    else if (e.key === 'Home') set(0);
    else if (e.key === 'End') set(MAX);
    else return;
    e.preventDefault();
  };

  const btn =
    'flex size-8 items-center justify-center rounded-lg hover:bg-surface-2 disabled:opacity-30 touch-none select-none';
  return (
    <div className="flex items-center rounded-xl border border-line bg-surface">
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        disabled={value <= 0}
        onPointerDown={() => hold(-1)}
        onPointerUp={release}
        onPointerLeave={release}
        className={btn}
      >
        {value <= 1 ? (
          <Trash2 className="size-3.5 text-rose-500" />
        ) : (
          <Minus className="size-3.5" />
        )}
      </button>
      <input
        role="spinbutton"
        aria-label={`${label} quantity`}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={MAX}
        inputMode="numeric"
        value={draft ?? value}
        onChange={(e) => setDraft(e.target.value.replace(/\D/g, ''))}
        onBlur={() => {
          if (draft !== null) set(Number(draft || 0));
          setDraft(null);
        }}
        onKeyDown={onKey}
        className="w-9 bg-transparent text-center text-sm font-semibold tabular-nums outline-none"
      />
      <button
        type="button"
        aria-label={`Increase ${label}`}
        disabled={value >= MAX}
        onPointerDown={() => hold(1)}
        onPointerUp={release}
        onPointerLeave={release}
        className={btn}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}

export default function Demo() {
  const [items, setItems] = useState([
    { name: 'Ceramic mug', price: 18, qty: 2, grad: 'from-amber-200 to-orange-400' },
    { name: 'Linen tote', price: 24, qty: 1, grad: 'from-lime-200 to-emerald-400' },
    { name: 'Notebook set', price: 9.5, qty: 3, grad: 'from-sky-200 to-indigo-400' },
  ]);
  const visible = items.filter((i) => i.qty > 0);
  const subtotal = visible.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 5;

  return (
    <div className="flex h-full items-center justify-center overflow-auto p-4">
      <style>{`@keyframes demo-flash{from{background:var(--accent-soft)}}`}</style>
      <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-4">
        <p className="mb-2 font-semibold">Your cart</p>
        <ul className="divide-y divide-line">
          {visible.map((item) => (
            <li key={item.name} className="flex items-center gap-3 py-3">
              <span className={`size-12 shrink-0 rounded-xl bg-gradient-to-br ${item.grad}`} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted">{usd.format(item.price)} each</p>
              </div>
              <Stepper
                label={item.name}
                value={item.qty}
                onChange={(qty) =>
                  setItems((all) => all.map((x) => (x.name === item.name ? { ...x, qty } : x)))
                }
              />
              <p
                key={item.qty}
                className="w-16 text-right text-sm font-medium tabular-nums"
                style={{ animation: 'demo-flash 600ms ease-out' }}
              >
                {usd.format(item.price * item.qty)}
              </p>
            </li>
          ))}
          {visible.length === 0 && (
            <li className="py-6 text-center text-sm text-muted">Your cart is empty.</li>
          )}
        </ul>
        <dl className="mt-2 space-y-1 border-t border-line pt-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd className="tabular-nums">{usd.format(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Shipping</dt>
            <dd className="tabular-nums">{shipping ? usd.format(shipping) : 'Free'}</dd>
          </div>
          <div
            key={subtotal}
            className="flex justify-between rounded-md font-semibold"
            style={{ animation: 'demo-flash 600ms ease-out' }}
          >
            <dt>Total</dt>
            <dd className="tabular-nums">{usd.format(subtotal + shipping)}</dd>
          </div>
        </dl>
        {subtotal > 0 && subtotal < 50 && (
          <p className="mt-2 text-xs text-muted">
            Add {usd.format(50 - subtotal)} more for free shipping.
          </p>
        )}
      </div>
    </div>
  );
}
