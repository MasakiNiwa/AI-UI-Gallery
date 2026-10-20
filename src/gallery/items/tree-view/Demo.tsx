import {
  ChevronRight,
  File,
  FileCode,
  FileImage,
  FileText,
  Folder,
  FolderOpen,
  type LucideIcon,
} from 'lucide-react';
import { useMemo, useRef, useState, type KeyboardEvent } from 'react';

interface Node {
  name: string;
  children?: Node[];
}

const TREE: Node[] = [
  {
    name: 'src',
    children: [
      {
        name: 'components',
        children: [{ name: 'Button.tsx' }, { name: 'Card.tsx' }, { name: 'Modal.tsx' }],
      },
      { name: 'pages', children: [{ name: 'Home.tsx' }, { name: 'Settings.tsx' }] },
      { name: 'App.tsx' },
      { name: 'main.tsx' },
    ],
  },
  { name: 'public', children: [{ name: 'logo.svg' }, { name: 'hero.png' }] },
  { name: 'README.md' },
  { name: 'package.json' },
];

const ICONS: Record<string, LucideIcon> = {
  tsx: FileCode,
  json: FileCode,
  md: FileText,
  png: FileImage,
  svg: FileImage,
};
const fileIcon = (name: string) => ICONS[name.split('.').pop() ?? ''] ?? File;

interface Row {
  path: string;
  node: Node;
  level: number;
  parent: string | null;
}

/** Flattens the visible part of the tree into rows (for keyboard navigation). */
function flatten(
  nodes: Node[],
  open: Set<string>,
  filter: string,
  level = 1,
  parent: string | null = null,
): Row[] {
  const rows: Row[] = [];
  for (const node of nodes) {
    const path = parent ? `${parent}/${node.name}` : node.name;
    const childRows = node.children ? flatten(node.children, open, filter, level + 1, path) : [];
    const matches = !filter || node.name.toLowerCase().includes(filter);
    if (!matches && childRows.length === 0) continue;
    rows.push({ path, node, level, parent });
    if (node.children && (open.has(path) || filter)) rows.push(...childRows);
  }
  return rows;
}

const allFolders = (nodes: Node[], parent = ''): string[] =>
  nodes.flatMap((n) =>
    n.children ? [parent + n.name, ...allFolders(n.children, `${parent}${n.name}/`)] : [],
  );

export default function Demo() {
  const [open, setOpen] = useState(new Set(['src', 'src/components']));
  const [selected, setSelected] = useState('src/components/Button.tsx');
  const [focus, setFocus] = useState('src/components/Button.tsx');
  const [filter, setFilter] = useState('');
  const treeRef = useRef<HTMLUListElement>(null);
  const q = filter.trim().toLowerCase();
  const rows = useMemo(() => flatten(TREE, open, q), [open, q]);

  const toggle = (path: string) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(path)) n.delete(path);
      else n.add(path);
      return n;
    });

  const moveFocus = (path: string) => {
    setFocus(path);
    requestAnimationFrame(() =>
      treeRef.current?.querySelector<HTMLElement>(`[data-path="${CSS.escape(path)}"]`)?.focus(),
    );
  };

  const onKey = (e: KeyboardEvent, row: Row, i: number) => {
    const isFolder = !!row.node.children;
    const expanded = isFolder && (open.has(row.path) || !!q);
    const keys: Record<string, () => void> = {
      ArrowDown: () => rows[i + 1] && moveFocus(rows[i + 1].path),
      ArrowUp: () => rows[i - 1] && moveFocus(rows[i - 1].path),
      Home: () => moveFocus(rows[0].path),
      End: () => moveFocus(rows[rows.length - 1].path),
      ArrowRight: () =>
        isFolder && !expanded
          ? toggle(row.path)
          : isFolder && rows[i + 1] && moveFocus(rows[i + 1].path),
      ArrowLeft: () => (expanded ? toggle(row.path) : row.parent && moveFocus(row.parent)),
      Enter: () => (isFolder ? toggle(row.path) : setSelected(row.path)),
      ' ': () => setSelected(row.path),
    };
    if (keys[e.key]) {
      e.preventDefault();
      keys[e.key]();
    } else if (e.key.length === 1) {
      // Type-ahead: jump to the next item starting with the typed letter.
      const next = [...rows.slice(i + 1), ...rows.slice(0, i)].find((r) =>
        r.node.name.toLowerCase().startsWith(e.key.toLowerCase()),
      );
      if (next) moveFocus(next.path);
    }
  };

  return (
    <div className="flex h-full justify-center overflow-auto p-4">
      <div className="w-full max-w-xs rounded-2xl border border-line bg-surface p-2">
        <div className="flex gap-1 p-1">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter files…"
            aria-label="Filter files"
            className="h-8 min-w-0 flex-1 rounded-lg border border-line bg-bg px-2 text-sm outline-none focus:border-accent"
          />
          <button
            type="button"
            onClick={() => setOpen(new Set(allFolders(TREE)))}
            className="rounded-lg px-2 text-xs text-muted hover:bg-surface-2"
          >
            Expand
          </button>
          <button
            type="button"
            onClick={() => setOpen(new Set())}
            className="rounded-lg px-2 text-xs text-muted hover:bg-surface-2"
          >
            Collapse
          </button>
        </div>
        <ul ref={treeRef} role="tree" aria-label="Project files" className="mt-1 text-sm">
          {rows.length === 0 && <li className="p-4 text-center text-muted">No files match.</li>}
          {rows.map((row, i) => {
            const isFolder = !!row.node.children;
            const expanded = isFolder && (open.has(row.path) || !!q);
            const Icon = isFolder ? (expanded ? FolderOpen : Folder) : fileIcon(row.node.name);
            const idx = q ? row.node.name.toLowerCase().indexOf(q) : -1;
            return (
              <li
                key={row.path}
                role="treeitem"
                data-path={row.path}
                aria-level={row.level}
                aria-expanded={isFolder ? expanded : undefined}
                aria-selected={selected === row.path}
                tabIndex={focus === row.path ? 0 : -1}
                onClick={() => {
                  setSelected(row.path);
                  setFocus(row.path);
                  if (isFolder) toggle(row.path);
                }}
                onKeyDown={(e) => onKey(e, row, i)}
                className={`relative flex cursor-pointer items-center gap-1.5 rounded-lg py-1 pr-2 outline-none select-none focus-visible:ring-2 focus-visible:ring-accent ${selected === row.path ? 'bg-accent-soft' : 'hover:bg-surface-2'}`}
                style={{ paddingLeft: `${(row.level - 1) * 16 + 6}px` }}
              >
                {Array.from({ length: row.level - 1 }, (_, l) => (
                  <span
                    key={l}
                    aria-hidden
                    className="absolute inset-y-0 w-px bg-line"
                    style={{ left: `${l * 16 + 13}px` }}
                  />
                ))}
                <ChevronRight
                  className={`size-3.5 shrink-0 text-muted transition-transform ${isFolder ? '' : 'invisible'} ${expanded ? 'rotate-90' : ''}`}
                  aria-hidden
                />
                <Icon
                  className={`size-4 shrink-0 ${isFolder ? 'text-amber-500' : 'text-muted'}`}
                  aria-hidden
                />
                <span className="truncate">
                  {idx >= 0 ? (
                    <>
                      {row.node.name.slice(0, idx)}
                      <mark className="rounded bg-amber-300/50 text-inherit">
                        {row.node.name.slice(idx, idx + q.length)}
                      </mark>
                      {row.node.name.slice(idx + q.length)}
                    </>
                  ) : (
                    row.node.name
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
