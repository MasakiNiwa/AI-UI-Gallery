import type { Language } from '@/i18n/languages';
import type { DemoComponent, GalleryItem, ItemMeta, ItemText } from './types';

/*
 * Items are discovered automatically: each folder in ./items with a meta.ts and a Demo.tsx becomes a gallery
 * item. Metadata is bundled eagerly (it is small); demo code is split into its own chunk and loaded on demand.
 */
const metaModules = import.meta.glob<{ default: ItemMeta }>('./items/*/meta.ts', { eager: true });
const demoModules = import.meta.glob<{ default: DemoComponent }>('./items/*/Demo.tsx');

const folderOf = (path: string) => path.split('/').at(-2)!;

export const ITEMS: GalleryItem[] = Object.entries(metaModules)
  .map(([path, mod]) => {
    const folder = folderOf(path);
    const loadDemo = demoModules[`./items/${folder}/Demo.tsx`];
    if (!loadDemo) throw new Error(`Gallery item "${folder}" is missing Demo.tsx`);
    return { ...mod.default, loadDemo };
  })
  .sort((a, b) => b.addedAt.localeCompare(a.addedAt) || a.id.localeCompare(b.id));

const byId = new Map(ITEMS.map((item) => [item.id, item]));

export const getItem = (id: string) => byId.get(id);

export const itemText = (item: ItemMeta, lang: Language): ItemText =>
  item.text[lang] ?? item.text.en;

/** Folder names, exposed for consistency tests. */
export const ITEM_FOLDERS = Object.keys(metaModules).map(folderOf);
