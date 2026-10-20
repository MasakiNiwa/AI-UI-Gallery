import { describe, expect, it } from 'vitest';
import pkg from '../../package.json';
import { SUPPORTED_LANGUAGES } from '@/i18n/languages';
import { CHANGELOG } from './changelog';

const parse = (v: string) => v.split('.').map(Number);
const newer = (a: string, b: string) => {
  const [x, y] = [parse(a), parse(b)];
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] > y[i];
  return false;
};

describe('changelog', () => {
  it('the newest entry matches package.json (bump both together)', () => {
    expect(CHANGELOG[0].version).toBe(pkg.version);
  });

  it('is ordered newest first with valid, unique semver versions', () => {
    for (const e of CHANGELOG) expect(e.version).toMatch(/^\d+\.\d+\.\d+$/);
    for (let i = 1; i < CHANGELOG.length; i++)
      expect(newer(CHANGELOG[i - 1].version, CHANGELOG[i].version)).toBe(true);
  });

  it('describes every release in every language', () => {
    for (const e of CHANGELOG) {
      expect(e.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      for (const lang of SUPPORTED_LANGUAGES) expect(e.changes[lang].length).toBeGreaterThan(0);
    }
  });
});
