import { describe, expect, it } from 'vitest';
import en from './locales/en.json';
import ja from './locales/ja.json';
import { CATEGORY_IDS } from '@/gallery/types';

/** Flattens nested keys ("a.b.c"), treating arrays as leaves. */
function keys(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v) ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
}

describe('locales', () => {
  it('ja has exactly the same keys as en', () => {
    expect(keys(ja).sort()).toEqual(keys(en).sort());
  });

  it('names every category', () => {
    for (const id of CATEGORY_IDS) {
      expect(en.categories).toHaveProperty(id);
      expect(ja.categories).toHaveProperty(id);
    }
  });
});
