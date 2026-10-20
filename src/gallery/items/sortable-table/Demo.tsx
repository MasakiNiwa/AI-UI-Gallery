import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useMemo, useState } from 'react';

type Status = 'Active' | 'Away' | 'Offline';
interface Row {
  name: string;
  role: string;
  status: Status;
  tasks: number;
  joined: string;
}

const ROWS: Row[] = [
  { name: 'Mina Sato', role: 'Designer', status: 'Active', tasks: 42, joined: '2024-04-01' },
  { name: 'Leo Martin', role: 'Engineer', status: 'Away', tasks: 87, joined: '2023-01-15' },
  { name: 'Hana Ito', role: 'Engineer', status: 'Active', tasks: 65, joined: '2025-02-10' },
  { name: 'Sam Lee', role: 'PM', status: 'Offline', tasks: 23, joined: '2022-09-30' },
  { name: 'Yuki Mori', role: 'QA', status: 'Active', tasks: 51, joined: '2024-11-05' },
  { name: 'Ava Brown', role: 'Designer', status: 'Away', tasks: 38, joined: '2025-06-20' },
];

const BADGE: Record<Status, string> = {
  Active: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  Away: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  Offline: 'bg-surface-3 text-muted',
};

const COLUMNS: { key: keyof Row; label: string; numeric?: boolean }[] = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'tasks', label: 'Tasks', numeric: true },
  { key: 'joined', label: 'Joined' },
];

export default function Demo() {
  const [sort, setSort] = useState<{ key: keyof Row; dir: 1 | -1 }>({ key: 'name', dir: 1 });
  const [q, setQ] = useState('');

  const rows = useMemo(() => {
    const f = q.toLowerCase();
    return ROWS.filter((r) => `${r.name} ${r.role}`.toLowerCase().includes(f)).sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      return (
        (typeof av === 'number' ? av - (bv as number) : String(av).localeCompare(String(bv))) *
        sort.dir
      );
    });
  }, [q, sort]);

  const toggle = (key: keyof Row) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: 1 }));

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden p-4 @sm:p-6">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter by name or role…"
        aria-label="Filter"
        className="h-10 w-full max-w-xs rounded-xl border border-line bg-surface px-3 text-sm outline-none focus:border-accent"
      />
      <div className="min-h-0 flex-1 overflow-auto rounded-xl border border-line">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="sticky top-0 bg-surface-2 text-left text-xs text-muted uppercase">
            <tr>
              {COLUMNS.map((c) => {
                const active = sort.key === c.key;
                const Icon = !active ? ArrowUpDown : sort.dir === 1 ? ArrowUp : ArrowDown;
                return (
                  <th
                    key={c.key}
                    aria-sort={active ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}
                    className={`px-3 py-2 font-medium ${c.numeric ? 'text-right' : ''}`}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(c.key)}
                      className={`inline-flex items-center gap-1 uppercase hover:text-fg ${active ? 'text-fg' : ''}`}
                    >
                      {c.label}
                      <Icon className={`size-3.5 ${active ? '' : 'opacity-40'}`} aria-hidden />
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.name}
                className="border-t border-line odd:bg-surface even:bg-surface-2/40 hover:bg-accent-soft"
              >
                <td className="px-3 py-2.5">
                  <span className="flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                      {r.name
                        .split(' ')
                        .map((p) => p[0])
                        .join('')}
                    </span>
                    {r.name}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-muted">{r.role}</td>
                <td className="px-3 py-2.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${BADGE[r.status]}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums">{r.tasks}</td>
                <td className="px-3 py-2.5 text-muted tabular-nums">{r.joined}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-muted">
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
