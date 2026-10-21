import { describe, expect, it } from 'vitest';
import { SUPPORTED_LANGUAGES } from '@/i18n/languages';
import { CATEGORIES } from './categories';
import { ITEM_FOLDERS, ITEMS } from './registry';
import { CATEGORY_IDS } from './types';

describe('gallery registry', () => {
  it('discovers items', () => {
    expect(ITEMS.length).toBeGreaterThan(0);
  });

  it('uses the folder name as a unique id', () => {
    expect(ITEMS.map((i) => i.id).sort()).toEqual([...ITEM_FOLDERS].sort());
    expect(new Set(ITEMS.map((i) => i.id)).size).toBe(ITEMS.length);
  });

  it.each(ITEMS.map((i) => [i.id, i] as const))('%s has complete metadata', (_, item) => {
    expect(CATEGORY_IDS).toContain(item.category);
    expect(item.addedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(item.tags.length).toBeGreaterThan(0);
    expect(item.tech.length).toBeGreaterThan(0);
    for (const lang of SUPPORTED_LANGUAGES) {
      const text = item.text[lang];
      expect(text, `${item.id} is missing "${lang}" text`).toBeDefined();
      for (const key of ['name', 'summary', 'description', 'prompt'] as const) {
        expect(text![key].trim(), `${item.id}.${lang}.${key}`).not.toBe('');
      }
      // The prompt builder swaps the last line, so it must be the stack line.
      const lastLine = text!.prompt.split('\n').at(-1)!;
      if (lang === 'en') expect(lastLine, `${item.id} en stack line`).toMatch(/^Use /);
      if (lang === 'ja') expect(lastLine, `${item.id} ja stack line`).toMatch(/てください。$/);
    }
  });

  it('has light and dark gallery thumbnails for every item (run `npm run previews -- <id>`)', () => {
    const files = new Set(
      Object.keys(import.meta.glob('/public/previews/*/*.jpg')).map((p) =>
        p.replace('/public/previews/', ''),
      ),
    );
    const missing = ITEMS.flatMap((i) =>
      ['light', 'dark'].map((t) => `${t}/${i.id}.jpg`).filter((f) => !files.has(f)),
    );
    expect(missing).toEqual([]);
  });

  it('defines an icon for every category', () => {
    expect(CATEGORIES.map((c) => c.id).sort()).toEqual([...CATEGORY_IDS].sort());
  });
});
