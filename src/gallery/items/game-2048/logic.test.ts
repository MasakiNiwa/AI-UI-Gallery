import { describe, expect, it } from 'vitest';
import { canMove, move, type Tile } from './logic';

const t = (value: number, row: number, col: number, id = row * 4 + col + 100): Tile => ({
  id,
  value,
  row,
  col,
});
const values = (tiles: Tile[]) =>
  [...tiles]
    .sort((a, b) => a.row * 4 + a.col - (b.row * 4 + b.col))
    .map((x) => `${x.row}${x.col}:${x.value}`);

describe('2048 move', () => {
  it('slides and merges a row once per pair', () => {
    const { tiles, score, moved } = move([t(2, 0, 0), t(2, 0, 1), t(2, 0, 2), t(2, 0, 3)], 'left');
    expect(moved).toBe(true);
    expect(score).toBe(8);
    expect(values(tiles)).toEqual(['00:4', '01:4']);
  });

  it('does not merge a tile twice in one move', () => {
    const { tiles } = move([t(4, 0, 0), t(2, 0, 1), t(2, 0, 2)], 'left');
    expect(values(tiles)).toEqual(['00:4', '01:4']);
  });

  it('moves toward the right and down', () => {
    expect(values(move([t(2, 1, 0)], 'right').tiles)).toEqual(['13:2']);
    expect(values(move([t(2, 0, 2)], 'down').tiles)).toEqual(['32:2']);
  });

  it('reports no movement when nothing can slide', () => {
    expect(move([t(2, 0, 0), t(4, 0, 1)], 'left').moved).toBe(false);
  });

  it('detects game over on a full board without merges', () => {
    const full = Array.from({ length: 16 }, (_, i) =>
      t(i % 2 === Math.floor(i / 4) % 2 ? 2 : 4, Math.floor(i / 4), i % 4),
    );
    expect(canMove(full)).toBe(false);
  });
});
