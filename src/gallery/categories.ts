import {
  Activity,
  BarChart3,
  Bell,
  Compass,
  LayoutDashboard,
  MousePointerClick,
  Sparkles,
  SquareStack,
  TextCursorInput,
  type LucideIcon,
} from 'lucide-react';
import type { CategoryId } from './types';

/** Category display order and icons. Names live in the locale files under `categories.<id>`. */
export const CATEGORIES: { id: CategoryId; icon: LucideIcon }[] = [
  { id: 'buttons', icon: MousePointerClick },
  { id: 'inputs', icon: TextCursorInput },
  { id: 'cards', icon: SquareStack },
  { id: 'navigation', icon: Compass },
  { id: 'feedback', icon: Bell },
  { id: 'data', icon: BarChart3 },
  { id: 'animation', icon: Activity },
  { id: 'effects', icon: Sparkles },
  { id: 'layout', icon: LayoutDashboard },
];

export const categoryIcon = (id: CategoryId) => CATEGORIES.find((c) => c.id === id)!.icon;
