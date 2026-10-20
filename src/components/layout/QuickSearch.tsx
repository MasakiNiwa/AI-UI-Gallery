import * as Dialog from '@radix-ui/react-dialog';
import { CornerDownLeft, Search } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { CategoryIcon } from '@/components/gallery/CategoryIcon';
import { ITEMS, getItem, itemText } from '@/gallery/registry';
import { searchItems } from '@/gallery/search/searchClient';
import type { GalleryItem } from '@/gallery/types';
import { currentLanguage } from '@/i18n';
import { cn } from '@/lib/cn';
import { useLibrary } from '@/stores/library';

const MAX_RESULTS = 8;

/** App-wide quick search, opened with ⌘K / Ctrl+K, "/" or the header search button. */
export function QuickSearch({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const recent = useLibrary((s) => s.recent);
  const [query, setQuery] = useState('');
  const [matched, setMatched] = useState<string[] | null>(null);
  /** The query that `matched` belongs to, so Enter can tell whether results are still pending. */
  const [searched, setSearched] = useState('');
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();

  useEffect(() => {
    const q = query.trim();
    let cancelled = false;
    const timer = setTimeout(() => {
      if (!q) {
        setMatched(null);
        setSearched('');
      } else
        void searchItems(q).then((ids) => {
          if (cancelled) return;
          setMatched(ids);
          setSearched(q);
        });
      setActive(0);
    }, 80);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  const results: GalleryItem[] = useMemo(() => {
    if (matched)
      return matched
        .map((m) => getItem(m)!)
        .filter(Boolean)
        .slice(0, MAX_RESULTS);
    const recentItems = recent.map((r) => getItem(r)).filter((i): i is GalleryItem => Boolean(i));
    return (recentItems.length ? recentItems : ITEMS).slice(0, MAX_RESULTS);
  }, [matched, recent]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const go = (item: GalleryItem) => {
    onOpenChange(false);
    setQuery('');
    navigate(`/item/${item.id}`);
  };

  const openGallery = (q: string) => {
    onOpenChange(false);
    setQuery('');
    navigate(`/gallery?q=${encodeURIComponent(q)}`);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const q = query.trim();
      if (q && q !== searched) {
        // Typed faster than the debounce: search now instead of opening a stale suggestion.
        void searchItems(q).then((ids) => {
          const first = ids.length ? getItem(ids[0]) : undefined;
          if (first) go(first);
          else openGallery(q);
        });
      } else if (results[active]) go(results[active]);
      else if (q) openGallery(q);
    }
  };

  const lang = currentLanguage();
  const heading = matched
    ? t('quickSearch.results')
    : recent.length
      ? t('quickSearch.recent')
      : t('quickSearch.suggestions');

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-[10vh] left-1/2 z-50 w-[min(94vw,36rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
        >
          <Dialog.Title className="sr-only">{t('quickSearch.title')}</Dialog.Title>
          <div className="flex items-center gap-3 border-b border-line px-4">
            <Search className="size-5 shrink-0 text-muted" aria-hidden />
            <input
              autoFocus
              role="combobox"
              aria-expanded
              aria-controls={`${id}-list`}
              aria-activedescendant={results[active] ? `${id}-${active}` : undefined}
              aria-label={t('quickSearch.title')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t('gallery.searchPlaceholder')}
              className="h-14 flex-1 bg-transparent outline-none placeholder:text-muted focus-visible:outline-none"
            />
            <kbd className="hidden rounded border border-line px-1.5 text-xs text-muted sm:block">
              Esc
            </kbd>
          </div>
          <p className="px-4 pt-3 pb-1 text-xs font-medium text-muted">{heading}</p>
          <ul
            ref={listRef}
            id={`${id}-list`}
            role="listbox"
            className="max-h-[50vh] overflow-y-auto px-2 pb-2"
          >
            {results.length === 0 && (
              <li className="px-3 py-8 text-center text-sm text-muted">{t('gallery.noResults')}</li>
            )}
            {results.map((item, i) => {
              const text = itemText(item, lang);
              return (
                <li
                  key={item.id}
                  id={`${id}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setActive(i)}
                  onClick={() => go(item)}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5',
                    i === active && 'bg-accent-soft',
                  )}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-accent">
                    <CategoryIcon id={item.category} className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{text.name}</span>
                    <span className="block truncate text-xs text-muted">{text.summary}</span>
                  </span>
                  {i === active && <CornerDownLeft className="size-4 text-muted" aria-hidden />}
                </li>
              );
            })}
          </ul>
          <p className="hidden gap-4 border-t border-line px-4 py-2 text-xs text-muted sm:flex">
            <span>↑↓ {t('quickSearch.navigate')}</span>
            <span>↵ {t('quickSearch.open')}</span>
            <span>Esc {t('common.close')}</span>
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
