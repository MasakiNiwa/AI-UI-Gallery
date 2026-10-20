import { TriangleAlert } from 'lucide-react';
import { createElement, lazy, Suspense, type LazyExoticComponent } from 'react';
import { useTranslation } from 'react-i18next';
import type { DemoComponent, DemoProps, GalleryItem } from '@/gallery/types';
import { Button } from '../ui/Button';
import { ErrorBoundary } from './ErrorBoundary';

const lazyCache = new Map<string, LazyExoticComponent<DemoComponent>>();

function lazyDemo(item: GalleryItem) {
  let C = lazyCache.get(item.id);
  if (!C) {
    C = lazy(item.loadDemo);
    lazyCache.set(item.id, C);
  }
  return C;
}

export function DemoRenderer({ item, mode }: { item: GalleryItem } & DemoProps) {
  const { t } = useTranslation();
  const compact = mode === 'preview';

  return (
    <ErrorBoundary
      fallback={(reset) => (
        <div className="flex h-full min-h-40 flex-col items-center justify-center gap-3 p-6 text-center text-sm text-muted">
          <TriangleAlert className="size-6 text-danger" aria-hidden />
          {t('item.error')}
          {!compact && (
            <Button size="sm" onClick={reset}>
              {t('item.retry')}
            </Button>
          )}
        </div>
      )}
    >
      <Suspense
        fallback={
          <div className="flex h-full min-h-40 items-center justify-center text-sm text-muted">
            {compact ? null : t('item.loading')}
          </div>
        }
      >
        {createElement(lazyDemo(item), { mode })}
      </Suspense>
    </ErrorBoundary>
  );
}
