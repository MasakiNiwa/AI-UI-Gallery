import { describe, expect, it } from 'vitest';
import { GRID, newGame, step, turn, type State } from './logic';

const base = (): State => ({
  snake: [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
  ],
  dir: 'right',
  queue: [],
  food: { x: 0, y: 0 },
  score: 0,
  over: false,
});

describe('snake logic', () => {
  it('starts with food off the snake', () => {
    const s = newGame();
    expect(s.snake.some((p) => p.x === s.food.x && p.y === s.food.y)).toBe(false);
  });

  it('moves forward without growing', () => {
    const s = step(base());
    expect(s.snake).toEqual([
      { x: 6, y: 5 },
      { x: 5, y: 5 },
      { x: 4, y: 5 },
    ]);
  });

  it('grows and scores when eating', () => {
    const s = step({ ...base(), food: { x: 6, y: 5 } }, () => 0);
    expect(s.snake).toHaveLength(4);
    expect(s.score).toBe(1);
    expect(s.snake.some((p) => p.x === s.food.x && p.y === s.food.y)).toBe(false);
  });

  it('ignores reversing and applies queued turns one per tick', () => {
    let s = turn(base(), 'left');
    expect(s.queue).toEqual([]);
    s = turn(turn(s, 'up'), 'left');
    expect(s.queue).toEqual(['up', 'left']);
    s = step(s);
    expect(s.snake[0]).toEqual({ x: 5, y: 4 });
    s = step(s);
    expect(s.snake[0]).toEqual({ x: 4, y: 4 });
  });

  it('dies on walls and on itself', () => {
    const wall = step({ ...base(), snake: [{ x: GRID - 1, y: 0 }] });
    expect(wall.over).toBe(true);
    const self = step({
      ...base(),
      dir: 'down',
      snake: [
        { x: 5, y: 5 },
        { x: 6, y: 5 },
        { x: 6, y: 6 },
        { x: 5, y: 6 },
        { x: 4, y: 6 },
      ],
    });
    expect(self.over).toBe(true);
  });

  it('can move into the cell the tail is leaving', () => {
    const s = step({
      ...base(),
      dir: 'down',
      snake: [
        { x: 5, y: 5 },
        { x: 6, y: 5 },
        { x: 6, y: 6 },
        { x: 5, y: 6 },
      ],
    });
    expect(s.over).toBe(false);
  });
});
