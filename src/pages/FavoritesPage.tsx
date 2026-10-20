import { Heart, History } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ItemGrid } from '@/components/gallery/ItemCard';
import { Button } from '@/components/ui/Button';
import { buttonClass } from '@/components/ui/buttonClass';
import { getItem } from '@/gallery/registry';
import type { GalleryItem } from '@/gallery/types';
import { useLibrary } from '@/stores/library';

const resolve = (ids: string[]) => ids.map(getItem).filter((i): i is GalleryItem => Boolean(i));

export function FavoritesPage() {
  const { t } = useTranslation();
  const favorites = resolve(useLibrary((s) => s.favorites));
  const recent = resolve(useLibrary((s) => s.recent));
  const clearRecent = useLibrary((s) => s.clearRecent);

  return (
    <div className="flex flex-col gap-10">
      <section aria-labelledby="fav-title">
        <h1 id="fav-title" className="mb-4 flex items-center gap-2 text-2xl font-bold">
          {t('favorites.title')}
          <span className="text-base font-normal text-muted">{favorites.length || ''}</span>
        </h1>
        {favorites.length ? (
          <ItemGrid items={favorites} />
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line px-6 py-14 text-center">
            <Heart className="size-8 text-muted" aria-hidden />
            <p className="font-medium">{t('favorites.empty')}</p>
            <p className="text-sm text-muted">{t('favorites.emptyHint')}</p>
            <Link to="/gallery" className={buttonClass('primary', 'md', 'mt-2')}>
              {t('home.browseAll')}
            </Link>
          </div>
        )}
      </section>

      <section aria-labelledby="recent-title">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 id="recent-title" className="flex items-center gap-2 text-lg font-semibold">
            <History className="size-5 text-muted" aria-hidden />
            {t('favorites.recent')}
          </h2>
          {recent.length > 0 && (
            <Button size="sm" variant="ghost" onClick={clearRecent}>
              {t('favorites.clearRecent')}
            </Button>
          )}
        </div>
        {recent.length ? (
          <ItemGrid items={recent} />
        ) : (
          <p className="text-sm text-muted">{t('favorites.noRecent')}</p>
        )}
      </section>
    </div>
  );
}
