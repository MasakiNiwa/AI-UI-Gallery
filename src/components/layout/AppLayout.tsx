import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { useApplySettings } from '@/stores/useApplySettings';
import { BottomNav } from './BottomNav';
import { Header } from './Header';
import { QuickSearch } from './QuickSearch';
import { useQuickSearchShortcut } from './useQuickSearchShortcut';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  useApplySettings();
  const { pathname } = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  useQuickSearchShortcut(openSearch);

  // Start each page at the top (query-string changes such as filtering keep the scroll position).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-dvh">
      <Header onSearch={openSearch} />
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1 px-4 pt-5 pb-28 md:px-8 md:pt-8 md:pb-12">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
      <BottomNav />
      <QuickSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
