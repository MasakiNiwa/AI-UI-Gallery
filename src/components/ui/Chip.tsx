import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
