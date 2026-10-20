/** Pure 2048 game logic (no React), so it is easy to test and reuse. */

export type Dir = 'left' | 'right' | 'up' | 'down';

export interface Tile {
  id: number;
  value: number;
  row: number;
  col: number;
  merged?: boolean;
  isNew?: boolean;
}

export const SIZE = 4;
let nextId = 1;

export function spawn(tiles: Tile[], rand = Math.random): Tile[] {
  const taken = new Set(tiles.map((t) => t.row * SIZE + t.col));
  const free = Array.from({ length: SIZE * SIZE }, (_, i) => i).filter((i) => !taken.has(i));
  if (!free.length) return tiles;
  const cell = free[Math.floor(rand() * free.length)];
  return [
    ...tiles,
    {
      id: nextId++,
      value: rand() < 0.9 ? 2 : 4,
      row: Math.floor(cell / SIZE),
      col: cell % SIZE,
      isNew: true,
    },
  ];
}

/** Slides every line toward `dir`, merging equal neighbours once. */
export function move(tiles: Tile[], dir: Dir): { tiles: Tile[]; score: number; moved: boolean } {
  const horizontal = dir === 'left' || dir === 'right';
  const reverse = dir === 'right' || dir === 'down';
  let score = 0;
  let moved = false;
  const out: Tile[] = [];

  for (let line = 0; line < SIZE; line++) {
    const cells = tiles
      .filter((t) => (horizontal ? t.row : t.col) === line)
      .sort((a, b) => (horizontal ? a.col - b.col : a.row - b.row));
    if (reverse) cells.reverse();
    let pos = 0;
    for (let i = 0; i < cells.length; i++) {
      const cur = cells[i];
      const nextTile = cells[i + 1];
      const target = reverse ? SIZE - 1 - pos : pos;
      const place = (t: Tile, value: number, merged: boolean) => {
        const row = horizontal ? line : target;
        const col = horizontal ? target : line;
        if (t.row !== row || t.col !== col || merged) moved = true;
        return { ...t, value, row, col, merged, isNew: false };
      };
      if (nextTile && nextTile.value === cur.value) {
        const value = cur.value * 2;
        score += value;
        out.push(place({ ...cur, id: nextId++ }, value, true));
        i++;
      } else {
        out.push(place(cur, cur.value, false));
      }
      pos++;
    }
  }
  return { tiles: moved ? out : tiles, score, moved };
}

export const canMove = (tiles: Tile[]) =>
  tiles.length < SIZE * SIZE ||
  (['left', 'right', 'up', 'down'] as Dir[]).some((d) => move(tiles, d).moved);

export const newGame = (rand = Math.random) => spawn(spawn([], rand), rand);
