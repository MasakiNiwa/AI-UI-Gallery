import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/cn';
import { useLibrary } from '@/stores/library';

export function FavoriteButton({
  id,
  name,
  className,
  withLabel = false,
}: {
  id: string;
  name: string;
  className?: string;
  withLabel?: boolean;
}) {
  const { t } = useTranslation();
  const active = useLibrary((s) => s.favorites.includes(id));
  const toggle = useLibrary((s) => s.toggleFavorite);
  const label = active ? t('favorites.remove', { name }) : t('favorites.add', { name });

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={withLabel ? undefined : label}
      title={label}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-full transition-colors',
        active ? 'text-rose-500' : 'text-muted hover:text-fg',
        className,
      )}
    >
      <Heart
        className={cn('size-5 transition-transform active:scale-90', active && 'fill-current')}
        aria-hidden
      />
      {withLabel && (
        <span className="text-sm">{active ? t('favorites.saved') : t('favorites.save')}</span>
      )}
    </button>
  );
}
