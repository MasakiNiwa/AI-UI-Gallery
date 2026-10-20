import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { useApplySettings } from '@/stores/useApplySettings';
import { BottomNav } from './BottomNav';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  useApplySettings();
  const { pathname } = useLocation();

  // Start each page at the top (query-string changes such as filtering keep the scroll position).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-dvh">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1 px-4 pt-5 pb-28 md:px-8 md:pt-8 md:pb-12">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
