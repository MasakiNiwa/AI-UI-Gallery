import { LoaderCircle, Pencil } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

type Field = 'name' | 'price' | 'stock' | 'status';
interface Row {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: string;
}

const STATUSES = ['Active', 'Draft', 'Archived'];
const FIELDS: Field[] = ['name', 'price', 'stock', 'status'];
const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function validate(field: Field, raw: string): string | null {
  if (field === 'name') return raw.trim() ? null : 'Name is required';
  if (field === 'price') return raw !== '' && Number(raw) >= 0 ? null : 'Price must be 0 or more';
  if (field === 'stock') return /^\d+$/.test(raw) ? null : 'Stock must be a whole number';
  return null;
}

export default function Demo() {
  const [rows, setRows] = useState<Row[]>([
    { id: 1, name: 'Desk lamp', price: 39, stock: 12, status: 'Active' },
    { id: 2, name: 'Oak shelf', price: 120, stock: 3, status: 'Draft' },
    { id: 3, name: 'Wool rug', price: 89.5, stock: 0, status: 'Archived' },
  ]);
  const [edit, setEdit] = useState<{
    id: number;
    field: Field;
    value: string;
    error: string | null;
  } | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const inputRef = useRef<HTMLInputElement & HTMLSelectElement>(null);

  useEffect(() => inputRef.current?.focus(), [edit?.id, edit?.field]);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(''), 2500);
    return () => clearTimeout(id);
  }, [toast]);

  const focusCell = (id: number, field: Field) =>
    requestAnimationFrame(() =>
      document.querySelector<HTMLElement>(`[data-cell="${id}-${field}"]`)?.focus(),
    );

  const save = (move?: 'next') => {
    if (!edit) return;
    const error = validate(edit.field, edit.value);
    if (error) return setEdit({ ...edit, error });
    const { id, field, value } = edit;
    const before = rows.find((r) => r.id === id)!;
    const parsed = field === 'price' || field === 'stock' ? Number(value) : value;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [field]: parsed } : r)));
    setEdit(null);
    const key = `${id}-${field}`;
    setSaving(key);
    setTimeout(() => {
      setSaving((s) => (s === key ? null : s));
      if (Math.random() < 0.2) {
        setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [field]: before[field] } : r)));
        setToast(`Couldn't save ${field} of "${before.name}". Changes were reverted.`);
      }
    }, 700);
    const nextField = FIELDS[FIELDS.indexOf(field) + 1];
    if (move === 'next' && nextField) start(id, nextField, { ...before, [field]: parsed } as Row);
    else focusCell(id, field);
  };

  const start = (id: number, field: Field, row = rows.find((r) => r.id === id)!) =>
    setEdit({ id, field, value: String(row[field]), error: null });

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') save();
    else if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      save('next');
    } else if (e.key === 'Escape' && edit) {
      const { id, field } = edit;
      setEdit(null);
      focusCell(id, field);
    }
  };

  const display = (r: Row, f: Field) => (f === 'price' ? usd.format(r.price) : String(r[f]));

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 overflow-auto p-4">
      <div className="w-full max-w-xl overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[460px] text-sm">
          <thead className="bg-surface-2 text-left text-xs text-muted uppercase">
            <tr>
              {FIELDS.map((f) => (
                <th key={f} className="px-3 py-2 font-medium">
                  {f}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-line bg-surface">
                {FIELDS.map((f) => {
                  const editing = edit?.id === r.id && edit.field === f;
                  const key = `${r.id}-${f}`;
                  return (
                    <td
                      key={f}
                      className={`relative px-1 py-1 ${f === 'price' || f === 'stock' ? 'text-right' : ''}`}
                    >
                      {editing ? (
                        <div>
                          {f === 'status' ? (
                            <select
                              ref={inputRef}
                              value={edit.value}
                              onChange={(e) => setEdit({ ...edit, value: e.target.value })}
                              onBlur={() => save()}
                              onKeyDown={onKey}
                              className="h-8 w-full rounded-md border border-accent bg-bg px-1"
                            >
                              {STATUSES.map((s) => (
                                <option key={s}>{s}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              ref={inputRef}
                              value={edit.value}
                              inputMode={f === 'name' ? 'text' : 'decimal'}
                              aria-invalid={!!edit.error}
                              aria-label={`Edit ${f}`}
                              onChange={(e) =>
                                setEdit({ ...edit, value: e.target.value, error: null })
                              }
                              onBlur={() => save()}
                              onKeyDown={onKey}
                              className={`h-8 w-full rounded-md border bg-bg px-2 outline-none ${edit.error ? 'border-rose-500' : 'border-accent'}`}
                            />
                          )}
                          {edit.error && (
                            <p className="absolute z-10 mt-1 rounded bg-rose-600 px-2 py-0.5 text-xs text-white">
                              {edit.error}
                            </p>
                          )}
                        </div>
                      ) : (
                        <button
                          type="button"
                          data-cell={key}
                          onClick={() => start(r.id, f)}
                          aria-label={`${f}: ${display(r, f)}. Press Enter to edit.`}
                          className={`group flex h-8 w-full items-center gap-1.5 rounded-md px-2 hover:bg-surface-2 ${f === 'price' || f === 'stock' ? 'justify-end' : ''}`}
                        >
                          {saving === key && (
                            <LoaderCircle
                              className="size-3.5 animate-spin text-muted"
                              aria-label="Saving"
                            />
                          )}
                          <span
                            className={
                              f === 'status'
                                ? `rounded-full px-2 py-0.5 text-xs ${r.status === 'Active' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-surface-3 text-muted'}`
                                : 'tabular-nums'
                            }
                          >
                            {display(r, f)}
                          </span>
                          <Pencil
                            className="size-3 text-muted opacity-0 group-hover:opacity-100"
                            aria-hidden
                          />
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted">
        Click a cell to edit · Enter saves · Esc cancels · Tab moves on
      </p>
      <p
        role="status"
        className={`rounded-lg bg-fg px-3 py-1.5 text-sm text-bg transition-opacity ${toast ? 'opacity-100' : 'opacity-0'}`}
      >
        {toast || ' '}
      </p>
    </div>
  );
}
