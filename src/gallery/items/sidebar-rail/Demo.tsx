import {
  BarChart3,
  ChevronDown,
  FolderKanban,
  Home,
  Inbox,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  children?: string[];
}

const NAV: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'inbox', label: 'Inbox', icon: Inbox, badge: 4 },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderKanban,
    children: ['Website', 'Mobile app', 'Brand'],
  },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Demo() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState('inbox');
  const [projectsOpen, setProjectsOpen] = useState(true);
  const fade = `whitespace-nowrap transition-opacity duration-200 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`;

  return (
    <div className="flex h-full overflow-hidden bg-bg text-fg">
      <nav
        aria-label="Main"
        className={`flex shrink-0 flex-col border-r border-line bg-surface transition-[width] duration-300 ease-out ${open ? 'w-56' : 'w-16'}`}
      >
        <div className="flex h-14 items-center gap-2 px-4">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-accent-contrast">
            <Sparkles className="size-4" aria-hidden />
          </span>
          <span className={`font-semibold ${fade}`}>Acme</span>
        </div>
        <ul className="flex flex-1 flex-col gap-0.5 px-2">
          {NAV.map((item) => {
            const isActive = active === item.id || (item.children?.includes(active) ?? false);
            const Icon = item.icon;
            return (
              <li key={item.id} className="group relative">
                <button
                  type="button"
                  aria-current={active === item.id ? 'page' : undefined}
                  aria-expanded={item.children && open ? projectsOpen : undefined}
                  onClick={() => (item.children ? setProjectsOpen((o) => !o) : setActive(item.id))}
                  className={`relative flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors ${isActive ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-surface-2 hover:text-fg'}`}
                >
                  <span
                    className={`absolute top-2 bottom-2 -left-2 w-1 rounded-r bg-accent transition-transform duration-300 ${isActive ? 'scale-y-100' : 'scale-y-0'}`}
                  />
                  <span className="relative shrink-0">
                    <Icon className="size-[18px]" aria-hidden />
                    {item.badge && !open && (
                      <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-rose-500 ring-2 ring-surface" />
                    )}
                  </span>
                  <span className={`flex-1 text-left ${fade}`}>{item.label}</span>
                  {item.badge && open && (
                    <span className="rounded-full bg-rose-500 px-1.5 text-[11px] font-semibold text-white">
                      {item.badge}
                    </span>
                  )}
                  {item.children && open && (
                    <ChevronDown
                      className={`size-4 transition-transform ${projectsOpen ? '' : '-rotate-90'}`}
                      aria-hidden
                    />
                  )}
                </button>
                {!open && (
                  <div className="pointer-events-none absolute top-0 left-full z-20 ml-2 hidden rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs whitespace-nowrap shadow-lg group-focus-within:block group-hover:pointer-events-auto group-hover:block">
                    <p className="font-medium">{item.label}</p>
                    {item.children?.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setActive(c)}
                        className="block w-full py-0.5 text-left text-muted hover:text-fg"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
                {item.children && open && projectsOpen && (
                  <ul className="mt-0.5 ml-6 border-l border-line pl-2">
                    {item.children.map((c) => (
                      <li key={c}>
                        <button
                          type="button"
                          aria-current={active === c ? 'page' : undefined}
                          onClick={() => setActive(c)}
                          className={`h-8 w-full rounded-md px-2 text-left text-sm whitespace-nowrap ${active === c ? 'font-medium text-fg' : 'text-muted hover:text-fg'}`}
                        >
                          {c}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-3 border-t border-line p-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-rose-500 text-xs font-bold text-white">
            MN
          </span>
          <span className={`text-sm ${fade}`}>
            <span className="block font-medium">Mika N.</span>
            <span className="block text-xs text-muted">Pro plan</span>
          </span>
        </div>
      </nav>
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center gap-2 border-b border-line px-3">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
            className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg"
          >
            {open ? (
              <PanelLeftClose className="size-[18px]" />
            ) : (
              <PanelLeftOpen className="size-[18px]" />
            )}
          </button>
          <h2 className="truncate font-semibold">
            {NAV.find((n) => n.id === active)?.label ?? active}
          </h2>
        </header>
        <div className="grid flex-1 grid-cols-2 content-start gap-3 overflow-auto p-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-20 rounded-xl border border-line bg-surface" />
          ))}
        </div>
      </main>
    </div>
  );
}
