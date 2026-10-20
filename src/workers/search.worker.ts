/// <reference lib="webworker" />
import * as Comlink from 'comlink';
import Fuse, { type FuseOptionKey } from 'fuse.js';

export interface SearchDoc {
  id: string;
  name: string;
  summary: string;
  description: string;
  tags: string[];
  tech: string[];
  category: string;
}

const keys: FuseOptionKey<SearchDoc>[] = [
  { name: 'name', weight: 4 },
  { name: 'tags', weight: 2 },
  { name: 'category', weight: 2 },
  { name: 'tech', weight: 1.5 },
  { name: 'summary', weight: 1.5 },
  { name: 'description', weight: 1 },
];

let fuse: Fuse<SearchDoc> | null = null;

/**
 * Fuzzy search runs off the main thread so typing stays smooth as the gallery grows.
 * Documents contain the text of every language, so a query in any language matches.
 */
const api = {
  index(docs: SearchDoc[]) {
    fuse = new Fuse(docs, { keys, threshold: 0.2, ignoreLocation: true, minMatchCharLength: 1 });
  },
  search(query: string): string[] {
    if (!fuse) return [];
    const ids = fuse.search(query.trim()).map((r) => r.item.id);
    return [...new Set(ids)];
  },
};

export type SearchApi = typeof api;

Comlink.expose(api);
