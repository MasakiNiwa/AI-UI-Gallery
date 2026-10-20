import { Eraser, Search, SearchX, X } from 'lucide-react';
import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';
import { ItemGrid } from '@/components/gallery/ItemCard';
import { Button } from '@/components/ui/Button';
import { CATEGORIES } from '@/gallery/categories';
import { ITEMS, itemText } from '@/gallery/registry';
import { searchItems } from '@/gallery/search/searchClient';
import type { CategoryId, Difficulty } from '@/gallery/types';
import { currentLanguage } from '@/i18n';
import { cn } from '@/lib/cn';

type Sort = 'newest' | 'name' | 'difficulty';
const DIFFICULTY_ORDER: Record<Difficulty, number> = { easy: 0, medium: 1, hard: 2 };

export function GalleryPage() {
  const { t, i18n } = useTranslation();
  const [params, setParams] = useSearchParams();
  const category = params.get('category') as CategoryId | null;
  const sort = (params.get('sort') as Sort | null) ?? 'newest';
  const [query, setQuery] = useState(params.get('q') ?? '');
  const deferredQuery = useDeferredValue(query.trim());
  const [matchedIds, setMatchedIds] = useState<string[] | null>(null);

  const update = (patch: Record<string, string | null>) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        for (const [k, v] of Object.entries(patch)) {
          if (v) next.set(k, v);
          else next.delete(k);
        }
        return next;
      },
      { replace: true },
    );

  // Follow external URL changes (e.g. sidebar links or back/forward) that drop or change ?q.
  const urlQuery = params.get('q') ?? '';
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery);
    if (urlQuery !== query.trim()) setQuery(urlQuery);
  }

  // Run the search in the worker and mirror the query into the URL so results can be shared.
  useEffect(() => {
    let cancelled = false;
    const id = setTimeout(() => {
      update({ q: deferredQuery || null });
      if (!deferredQuery) {
        setMatchedIds(null);
        return;
      }
      void searchItems(deferredQuery).then((ids) => {
        if (!cancelled) setMatchedIds(ids);
      });
    }, 120);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredQuery]);

  const results = useMemo(() => {
    const lang = currentLanguage();
    let list = matchedIds
      ? matchedIds.map((id) => ITEMS.find((i) => i.id === id)!).filter(Boolean)
      : [...ITEMS];
    if (category) list = list.filter((i) => i.category === category);
    // Search results keep relevance order unless the user picks an explicit sort.
    if (matchedIds && !params.get('sort')) return list;
    if (sort === 'name')
      list.sort((a, b) => itemText(a, lang).name.localeCompare(itemText(b, lang).name, lang));
    else if (sort === 'difficulty')
      list.sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]);
    else list.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    return list;
    // i18n.language: re-sort by name when the language changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedIds, category, sort, params, i18n.language]);

  const hasFilters = Boolean(query || category || params.get('sort'));
  const clearAll = () => {
    setQuery('');
    setMatchedIds(null);
    setParams({}, { replace: true });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between gap-3">
        <h1 className="text-2xl font-bold">{t('gallery.title')}</h1>
        <p className="text-sm text-muted" aria-live="polite">
          {t('gallery.results', { count: results.length })}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('gallery.searchPlaceholder')}
            aria-label={t('gallery.searchLabel')}
            className="h-11 w-full rounded-xl border border-line bg-surface pr-10 pl-10 text-sm outline-none placeholder:text-muted focus:border-accent [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={t('gallery.clearSearch')}
              className="absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <label className="sr-only" htmlFor="gallery-sort">
            {t('gallery.sort')}
          </label>
          <select
            id="gallery-sort"
            value={sort}
            onChange={(e) => update({ sort: e.target.value === 'newest' ? null : e.target.value })}
            className="h-11 flex-1 rounded-xl border border-line bg-surface px-3 text-sm sm:flex-none"
          >
            <option value="newest">{t('gallery.sortNewest')}</option>
            <option value="name">{t('gallery.sortName')}</option>
            <option value="difficulty">{t('gallery.sortDifficulty')}</option>
          </select>
          <Button
            onClick={clearAll}
            disabled={!hasFilters}
            className="h-11"
            title={t('gallery.clearAll')}
          >
            <Eraser className="size-4" aria-hidden />
            {t('gallery.clear')}
          </Button>
        </div>
      </div>

      <div
        role="group"
        aria-label={t('gallery.filterByCategory')}
        className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0"
      >
        {[{ id: null, icon: null }, ...CATEGORIES].map(({ id, icon: Icon }) => {
          const active = category === id;
          return (
            <button
              key={id ?? 'all'}
              type="button"
              aria-pressed={active}
              onClick={() => update({ category: id })}
              className={cn(
                'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm transition-colors',
                active
                  ? 'border-accent bg-accent text-accent-contrast'
                  : 'border-line bg-surface text-muted hover:text-fg',
              )}
            >
              {Icon && <Icon className="size-4" aria-hidden />}
              {id ? t(`categories.${id}`) : t('gallery.all')}
            </button>
          );
        })}
      </div>

      {results.length > 0 ? (
        <ItemGrid items={results} />
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line px-6 py-16 text-center">
          <SearchX className="size-8 text-muted" aria-hidden />
          <p className="font-medium">{t('gallery.noResults')}</p>
          <p className="text-sm text-muted">{t('gallery.noResultsHint')}</p>
          <Button onClick={clearAll}>
            <Eraser className="size-4" aria-hidden />
            {t('gallery.clearAll')}
          </Button>
        </div>
      )}
    </div>
  );
}
