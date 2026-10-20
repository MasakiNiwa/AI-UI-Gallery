import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useSearchParams } from 'react-router';
import { CATEGORIES } from '@/gallery/categories';
import { ITEMS } from '@/gallery/registry';
import { cn } from '@/lib/cn';
import { NAV_ITEMS } from './navItems';

const linkClass = (active: boolean) =>
  cn(
    'flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors',
    active ? 'bg-accent-soft text-fg font-medium' : 'text-muted hover:bg-surface-2 hover:text-fg',
  );

export function Sidebar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const activeCategory = pathname === '/gallery' ? params.get('category') : null;

  return (
    <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-line px-3 py-4 md:block">
      <nav aria-label={t('nav.main')} className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, labelKey, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              linkClass(isActive && !(to === '/gallery' && activeCategory))
            }
          >
            <Icon className="size-5" aria-hidden />
            {t(labelKey)}
          </NavLink>
        ))}
      </nav>
      <p className="mt-6 mb-2 px-3 text-xs font-semibold tracking-wide text-muted uppercase">
        {t('home.categories')}
      </p>
      <ul className="flex flex-col gap-0.5">
        {CATEGORIES.map(({ id, icon: Icon }) => {
          const count = ITEMS.filter((i) => i.category === id).length;
          return (
            <li key={id}>
              <NavLink to={`/gallery?category=${id}`} className={linkClass(activeCategory === id)}>
                <Icon className="size-4" aria-hidden />
                <span className="flex-1 truncate">{t(`categories.${id}`)}</span>
                <span className="text-xs tabular-nums opacity-70">{count}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
