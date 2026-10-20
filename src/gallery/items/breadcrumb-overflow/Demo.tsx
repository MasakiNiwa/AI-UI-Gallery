import { ChevronRight, Ellipsis, House } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const PATH = [
  'Home',
  'Workspace',
  'Projects',
  '2026',
  'Website relaunch',
  'Pages',
  'Pricing and plans',
];

function Crumbs({ collapse }: { collapse: boolean }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLLIElement>(null);
  const hidden = collapse ? PATH.slice(1, -2) : [];
  const visible = collapse ? [PATH[0], '…', ...PATH.slice(-2)] : PATH;

  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    const key = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', down);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('mousedown', down);
      document.removeEventListener('keydown', key);
    };
  }, [open]);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex min-w-0 items-center gap-1 text-sm">
        {visible.map((label, i) => {
          const last = i === visible.length - 1;
          return (
            <li
              key={label + i}
              ref={label === '…' ? box : undefined}
              className="relative flex min-w-0 items-center gap-1"
            >
              {i > 0 && <ChevronRight className="size-3.5 shrink-0 text-muted" aria-hidden />}
              {label === '…' ? (
                <>
                  <button
                    type="button"
                    aria-label={`Show ${hidden.length} more levels`}
                    aria-expanded={open}
                    onClick={() => setOpen((o) => !o)}
                    className="flex size-7 items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-fg"
                  >
                    <Ellipsis className="size-4" />
                  </button>
                  {open && (
                    <ul className="absolute top-full left-0 z-10 mt-1 min-w-40 rounded-xl border border-line bg-surface p-1 shadow-lg">
                      {hidden.map((h) => (
                        <li key={h}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setOpen(false);
                            }}
                            className="block rounded-lg px-3 py-1.5 hover:bg-surface-2"
                          >
                            {h}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : last ? (
                <span aria-current="page" title={label} className="truncate font-medium">
                  {label}
                </span>
              ) : (
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  title={label}
                  className="flex min-w-0 items-center gap-1 truncate rounded-md px-1 text-muted hover:text-fg hover:underline"
                >
                  {i === 0 && <House className="size-4 shrink-0" aria-hidden />}
                  <span className="truncate">{label}</span>
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default function Demo() {
  return (
    <div className="flex h-full flex-col justify-center gap-6 p-6">
      <div className="rounded-2xl border border-line bg-surface p-4">
        <p className="mb-2 text-xs text-muted">Wide container</p>
        <div className="hidden @2xl:block">
          <Crumbs collapse={false} />
        </div>
        <div className="@2xl:hidden">
          <Crumbs collapse />
        </div>
      </div>
      <div className="max-w-sm rounded-2xl border border-line bg-surface p-4">
        <p className="mb-2 text-xs text-muted">Narrow container (collapsed)</p>
        <Crumbs collapse />
      </div>
    </div>
  );
}
