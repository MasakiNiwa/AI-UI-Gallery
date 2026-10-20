import { CircleHelp, Moon, Search, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router';
import { cn } from '@/lib/cn';
import { useSettings } from '@/stores/settings';
import { useIsDark } from '@/stores/useApplySettings';
import { buttonClass } from '../ui/buttonClass';
import { Logo } from './Logo';

const IS_MAC = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent);

export function Header({ onSearch }: { onSearch: () => void }) {
  const { t } = useTranslation();
  const isDark = useIsDark();
  const setSetting = useSettings((s) => s.set);
  const themeLabel = isDark ? t('header.toLight') : t('header.toDark');

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="flex h-14 items-center gap-3 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2.5 rounded-lg font-semibold">
          <Logo className="size-8" />
          <span className="truncate">{t('app.name')}</span>
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={onSearch}
            className="mr-1 hidden h-9 w-56 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-sm text-muted transition-colors hover:text-fg sm:flex"
          >
            <Search className="size-4" aria-hidden />
            {t('header.search')}…
            <kbd className="ml-auto rounded border border-line px-1.5 font-sans text-xs">
              {IS_MAC ? '⌘K' : 'Ctrl K'}
            </kbd>
          </button>
          <button
            type="button"
            onClick={onSearch}
            className={cn(buttonClass('ghost', 'icon'), 'sm:hidden')}
            aria-label={t('header.search')}
            title={t('header.search')}
          >
            <Search className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => setSetting('theme', isDark ? 'light' : 'dark')}
            className={buttonClass('ghost', 'icon')}
            aria-label={themeLabel}
            title={themeLabel}
          >
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <NavLink
            to="/help"
            className={({ isActive }) =>
              cn(buttonClass('ghost', 'icon'), isActive && 'bg-surface-2 text-fg')
            }
            aria-label={t('header.help')}
            title={t('header.help')}
          >
            <CircleHelp className="size-5" />
          </NavLink>
        </div>
      </div>
    </header>
  );
}
