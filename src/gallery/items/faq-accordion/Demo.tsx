import { Plus, Search } from 'lucide-react';
import { useId, useState } from 'react';

const FAQ = [
  {
    q: 'Is there a free plan?',
    a: 'Yes. The free plan includes 3 projects and community support, forever.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'You can cancel from the billing page at any time; you keep access until the end of the period.',
  },
  {
    q: 'Do you offer student discounts?',
    a: 'Students and teachers get 50% off Pro with a valid school email address.',
  },
  {
    q: 'Where is my data stored?',
    a: 'Data is stored in the EU and Japan regions and encrypted at rest and in transit.',
  },
  {
    q: 'Can I invite my team?',
    a: 'Team plans support unlimited members with roles for viewers, editors and admins.',
  },
  {
    q: 'Do you have an API?',
    a: 'A REST and GraphQL API is available on all paid plans, with SDKs for TypeScript and Python.',
  },
];

function Mark({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig'));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === q.toLowerCase() ? (
          <mark key={i} className="rounded bg-amber-300/50 text-inherit">
            {p}
          </mark>
        ) : (
          p
        ),
      )}
    </>
  );
}

export default function Demo() {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const [q, setQ] = useState('');
  const id = useId();
  const items = FAQ.map((f, i) => ({ ...f, i })).filter(
    (f) => !q || `${f.q} ${f.a}`.toLowerCase().includes(q.toLowerCase()),
  );
  const allOpen = items.length > 0 && items.every((f) => open.has(f.i));

  const toggle = (i: number) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });

  return (
    <div className="flex h-full justify-center overflow-auto p-4 @sm:p-6">
      <div className="w-full max-w-xl">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="flex-1 text-lg font-semibold">Frequently asked questions</h2>
          <button
            type="button"
            onClick={() => setOpen(allOpen ? new Set() : new Set(items.map((f) => f.i)))}
            className="text-sm text-accent"
          >
            {allOpen ? 'Collapse all' : 'Expand all'}
          </button>
        </div>
        <label className="relative mb-3 block">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search questions…"
            aria-label="Search questions"
            className="h-10 w-full rounded-xl border border-line bg-surface pl-9 text-sm outline-none focus:border-accent"
          />
        </label>
        <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {items.length === 0 && (
            <p className="p-6 text-center text-sm text-muted">No matching questions.</p>
          )}
          {items.map(({ q: question, a, i }) => {
            const isOpen = open.has(i) || (!!q && open.size === 0);
            return (
              <div key={i}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-${i}`}
                    onClick={() => toggle(i)}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left font-medium hover:bg-surface-2"
                  >
                    <span className="flex-1">
                      <Mark text={question} q={q} />
                    </span>
                    <Plus
                      className={`size-4 shrink-0 text-muted transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      aria-hidden
                    />
                  </button>
                </h3>
                <div
                  id={`${id}-${i}`}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-sm text-muted">
                      <Mark text={a} q={q} />
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
