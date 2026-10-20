import { House, LayoutGrid, Settings, type LucideIcon } from 'lucide-react';

/** Primary destinations shown in the bottom bar (mobile) and the sidebar (desktop). Help lives in the header. */
export const NAV_ITEMS: { to: string; labelKey: string; icon: LucideIcon; end?: boolean }[] = [
  { to: '/', labelKey: 'nav.home', icon: House, end: true },
  { to: '/gallery', labelKey: 'nav.gallery', icon: LayoutGrid },
  { to: '/settings', labelKey: 'nav.settings', icon: Settings },
];
