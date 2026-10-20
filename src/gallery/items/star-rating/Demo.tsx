import { Star } from 'lucide-react';
import { useState } from 'react';

const WORDS = ['', 'Terrible', 'Bad', 'OK', 'Good', 'Great!'];
const BREAKDOWN = [62, 21, 9, 5, 3];

function Stars({ value, size = 'size-5' }: { value: number; size?: string }) {
  return (
    <span className="relative inline-flex" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${size} text-surface-3`} fill="currentColor" strokeWidth={0} />
      ))}
      <span
        className="absolute inset-0 flex overflow-hidden"
        style={{ width: `${(value / 5) * 100}%` }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`${size} shrink-0 text-amber-400`}
            fill="currentColor"
            strokeWidth={0}
          />
        ))}
      </span>
    </span>
  );
}

export default function Demo() {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="grid w-full max-w-md gap-6 rounded-2xl border border-line bg-surface p-5 @md:grid-cols-2">
        <div>
          <p className="text-4xl font-bold">4.3</p>
          <Stars value={4.3} />
          <p className="mt-1 text-xs text-muted">1,284 reviews</p>
          <ul className="mt-3 space-y-1">
            {BREAKDOWN.map((pct, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-muted">
                <span className="w-3">{5 - i}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-3">
                  <span
                    className="block h-full rounded-full bg-amber-400"
                    style={{ width: `${pct}%` }}
                  />
                </span>
                <span className="w-7 text-right tabular-nums">{pct}%</span>
              </li>
            ))}
          </ul>
        </div>
        <fieldset className="flex flex-col items-start justify-center">
          <legend className="mb-2 font-medium">Rate this product</legend>
          <div className="flex" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className="cursor-pointer p-0.5" onMouseEnter={() => setHover(n)}>
                <input
                  type="radio"
                  name="demo-rating"
                  value={n}
                  checked={value === n}
                  onChange={() => setValue(n)}
                  className="peer sr-only"
                  aria-label={`${n} star${n > 1 ? 's' : ''}`}
                />
                <Star
                  className={`size-8 transition-transform peer-focus-visible:outline-2 hover:scale-110 ${n <= shown ? 'text-amber-400' : 'text-surface-3'}`}
                  fill="currentColor"
                  strokeWidth={0}
                />
              </label>
            ))}
          </div>
          <p className="mt-2 h-5 text-sm font-medium text-amber-600 dark:text-amber-400">
            {WORDS[shown]}
          </p>
        </fieldset>
      </div>
    </div>
  );
}
