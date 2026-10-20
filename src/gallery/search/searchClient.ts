import * as Comlink from 'comlink';
import i18n from '@/i18n';
import type { SearchApi, SearchDoc } from '@/workers/search.worker';
import { ITEMS } from '../registry';

let remote: Promise<Comlink.Remote<SearchApi>> | null = null;

function buildDocs(): SearchDoc[] {
  // One document per item per language; results are de-duplicated by id in the worker.
  return ITEMS.flatMap((item) =>
    Object.entries(item.text).map(([lang, text]) => ({
      id: item.id,
      name: text!.name,
      summary: text!.summary,
      description: text!.description,
      tags: item.tags,
      tech: item.tech,
      category: i18n.t(`categories.${item.category}`, { lng: lang }),
    })),
  );
}

/** Lazily starts the search worker and indexes all items once. */
function getRemote() {
  remote ??= (async () => {
    const worker = new Worker(new URL('../../workers/search.worker.ts', import.meta.url), {
      type: 'module',
      name: 'search',
    });
    const api = Comlink.wrap<SearchApi>(worker);
    await api.index(buildDocs());
    return api;
  })();
  return remote;
}

/** Returns matching item ids, best match first. */
export async function searchItems(query: string): Promise<string[]> {
  const api = await getRemote();
  return api.search(query);
}
