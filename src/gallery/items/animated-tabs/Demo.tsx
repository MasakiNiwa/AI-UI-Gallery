import { useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';

const TABS = [
  {
    id: 'overview',
    label: 'Overview',
    body: 'A quick summary of your project and recent activity.',
  },
  { id: 'activity', label: 'Activity', body: '12 new commits and 3 pull requests this week.' },
  { id: 'members', label: 'Members', body: '5 members · 2 pending invitations.' },
  {
    id: 'settings',
    label: 'Settings',
    body: 'Rename the project, manage access and integrations.',
  },
];

function TabBar({ variant }: { variant: 'underline' | 'pill' }) {
  const [active, setActive] = useState(0);
  const [box, setBox] = useState({ left: 0, width: 0 });
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = `demo-tabs-${variant}`;

  useLayoutEffect(() => {
    const measure = () => {
      const el = refs.current[active];
      if (el) setBox({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  const onKeyDown = (e: KeyboardEvent) => {
    const last = TABS.length - 1;
    const next =
      e.key === 'ArrowRight'
        ? active === last
          ? 0
          : active + 1
        : e.key === 'ArrowLeft'
          ? active === 0
            ? last
            : active - 1
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  const pill = variant === 'pill';

  return (
    <div className="w-full max-w-md">
      <div
        role="tablist"
        aria-label={`${variant} tabs`}
        onKeyDown={onKeyDown}
        className={`relative flex ${pill ? 'rounded-xl bg-surface-2 p-1' : 'border-b border-line'}`}
      >
        <span
          aria-hidden
          className={`absolute transition-all duration-300 ease-out ${pill ? 'top-1 bottom-1 rounded-lg bg-surface shadow' : '-bottom-px h-0.5 rounded-full bg-accent'}`}
          style={{ left: box.left, width: box.width }}
        />
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${baseId}-${tab.id}`}
            aria-selected={active === i}
            aria-controls={`${baseId}-panel`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={`relative flex-1 px-3 py-2 text-sm font-medium transition-colors ${active === i ? 'text-fg' : 'text-muted hover:text-fg'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        key={active}
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-${TABS[active].id}`}
        className="px-1 py-4 text-sm text-muted"
        style={{ animation: 'demo-fade 250ms ease-out' }}
      >
        {TABS[active].body}
      </div>
    </div>
  );
}

export default function Demo() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-6">
      <style>{`@keyframes demo-fade{from{opacity:0;transform:translateY(4px)}}`}</style>
      <TabBar variant="underline" />
      <TabBar variant="pill" />
    </div>
  );
}
