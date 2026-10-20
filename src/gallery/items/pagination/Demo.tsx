import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const TOTAL = 200;

/** Page numbers to show, with null for an ellipsis. */
function pages(current: number, count: number): (number | null)[] {
  const set = new Set(
    [1, count, current - 1, current, current + 1].filter((p) => p >= 1 && p <= count),
  );
  const sorted = [...set].sort((a, b) => a - b);
  const out: (number | null)[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push(p - sorted[i - 1] === 2 ? p - 1 : null);
    out.push(p);
  });
  return out;
}

export default function Demo() {
  const [page, setPage] = useState(4);
  const [size, setSize] = useState(10);
  const count = Math.ceil(TOTAL / size);
  const from = (page - 1) * size + 1;
  const to = Math.min(TOTAL, page * size);

  const changeSize = (s: number) => {
    setSize(s);
    setPage(Math.floor((from - 1) / s) + 1); // keep the first visible item on screen
  };

  const btn = 'flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm';

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <ul className="w-full max-w-lg divide-y divide-line rounded-xl border border-line bg-surface text-sm">
        {Array.from({ length: Math.min(4, to - from + 1) }, (_, i) => (
          <li key={i} className="flex justify-between px-4 py-2">
            <span>Result #{from + i}</span>
            <span className="text-muted">…</span>
          </li>
        ))}
      </ul>
      <p className="text-sm text-muted">
        Showing{' '}
        <b className="text-fg">
          {from}–{to}
        </b>{' '}
        of {TOTAL}
      </p>
      <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`${btn} border border-line disabled:opacity-40`}
          >
            <ChevronLeft className="size-4" />
          </button>
          <ul className="hidden items-center gap-1 @md:flex">
            {pages(page, count).map((p, i) =>
              p === null ? (
                <li key={`e${i}`} className="px-1 text-muted" aria-hidden>
                  …
                </li>
              ) : (
                <li key={p}>
                  <button
                    type="button"
                    aria-current={p === page ? 'page' : undefined}
                    aria-label={`Page ${p}`}
                    onClick={() => setPage(p)}
                    className={`${btn} ${p === page ? 'bg-accent font-semibold text-accent-contrast' : 'hover:bg-surface-2'}`}
                  >
                    {p}
                  </button>
                </li>
              ),
            )}
          </ul>
          <span className="px-2 text-sm @md:hidden">
            Page <b>{page}</b> of {count}
          </span>
          <button
            type="button"
            aria-label="Next page"
            disabled={page === count}
            onClick={() => setPage(page + 1)}
            className={`${btn} border border-line disabled:opacity-40`}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
        <label className="flex items-center gap-2 text-sm text-muted">
          Per page
          <select
            value={size}
            onChange={(e) => changeSize(Number(e.target.value))}
            className="h-9 rounded-lg border border-line bg-surface px-2 text-fg"
          >
            {[10, 20, 50].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </nav>
    </div>
  );
}
