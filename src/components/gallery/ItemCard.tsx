import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { currentLanguage } from '@/i18n';
import { itemText } from '@/gallery/registry';
import type { GalleryItem } from '@/gallery/types';
import { useSettings } from '@/stores/settings';
import { Chip } from '../ui/Chip';
import { CategoryIcon } from './CategoryIcon';
import { DemoRenderer } from './DemoRenderer';
import { FavoriteButton } from './FavoriteButton';

/** Mounts children only while the element is on (or near) the screen, saving CPU/GPU for long lists. */
function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: '200px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

function StaticThumb({ item }: { item: GalleryItem }) {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent-soft to-surface-2">
      <CategoryIcon id={item.category} className="size-10 text-accent opacity-70" aria-hidden />
    </div>
  );
}

export function ItemCard({ item }: { item: GalleryItem }) {
  const { t } = useTranslation();
  const livePreviews = useSettings((s) => s.livePreviews);
  const [ref, inView] = useInView<HTMLDivElement>();
  const text = itemText(item, currentLanguage());

  // The whole card is clickable through a "stretched" link on the title; the favorite button sits above it.
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent hover:-translate-y-0.5 hover:border-accent/40">
      <div
        ref={ref}
        className="relative aspect-[4/3] overflow-hidden border-b border-line bg-surface-2"
      >
        {livePreviews ? (
          inView ? (
            // Demo is rendered at 2x size and scaled down to 50%, and is made non-interactive.
            <div
              inert
              aria-hidden
              className="@container pointer-events-none absolute top-0 left-0 h-[200%] w-[200%] origin-top-left scale-50"
            >
              <DemoRenderer item={item} mode="preview" />
            </div>
          ) : null
        ) : (
          <StaticThumb item={item} />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="pr-8 font-semibold group-hover:text-accent">
          <Link
            to={`/item/${item.id}`}
            aria-label={t('item.open', { name: text.name })}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {text.name}
          </Link>
        </h3>
        <p className="line-clamp-2 flex-1 text-sm text-muted">{text.summary}</p>
        <div className="flex flex-wrap gap-1.5">
          <Chip>{t(`categories.${item.category}`)}</Chip>
          <Chip>{t(`difficulty.${item.difficulty}`)}</Chip>
        </div>
      </div>
      <FavoriteButton
        id={item.id}
        name={text.name}
        className="absolute top-2 right-2 z-10 size-9 bg-surface/85 backdrop-blur"
      />
    </article>
  );
}

export function ItemGrid({ items }: { items: GalleryItem[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <li key={item.id} className="flex">
          <div className="flex w-full [&>article]:w-full">
            <ItemCard item={item} />
          </div>
        </li>
      ))}
    </ul>
  );
}
