import type { LucideProps } from 'lucide-react';
import { createElement } from 'react';
import { categoryIcon } from '@/gallery/categories';
import type { CategoryId } from '@/gallery/types';

export function CategoryIcon({ id, ...props }: { id: CategoryId } & LucideProps) {
  return createElement(categoryIcon(id), props);
}
