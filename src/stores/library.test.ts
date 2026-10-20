import { beforeEach, describe, expect, it } from 'vitest';
import { useLibrary } from './library';

describe('library store', () => {
  beforeEach(() => useLibrary.getState().reset());

  it('toggles favorites, newest first', () => {
    const { toggleFavorite } = useLibrary.getState();
    toggleFavorite('a');
    toggleFavorite('b');
    expect(useLibrary.getState().favorites).toEqual(['b', 'a']);
    toggleFavorite('a');
    expect(useLibrary.getState().favorites).toEqual(['b']);
  });

  it('keeps recent items unique and capped at 12', () => {
    const { addRecent } = useLibrary.getState();
    for (let i = 0; i < 15; i++) addRecent(`item-${i}`);
    addRecent('item-10');
    const { recent } = useLibrary.getState();
    expect(recent).toHaveLength(12);
    expect(recent[0]).toBe('item-10');
    expect(new Set(recent).size).toBe(recent.length);
  });
});
