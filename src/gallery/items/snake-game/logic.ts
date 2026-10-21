export const GRID = 17;

export type Dir = 'up' | 'down' | 'left' | 'right';
export interface Point {
  x: number;
  y: number;
}
export interface State {
  snake: Point[];
  dir: Dir;
  /** Turns queued by fast key presses, applied one per tick. */
  queue: Dir[];
  food: Point;
  score: number;
  over: boolean;
}

const DELTA: Record<Dir, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
const OPPOSITE: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };

export function placeFood(snake: Point[], rand = Math.random): Point {
  const free: Point[] = [];
  for (let y = 0; y < GRID; y++)
    for (let x = 0; x < GRID; x++)
      if (!snake.some((s) => s.x === x && s.y === y)) free.push({ x, y });
  return free[Math.floor(rand() * free.length)] ?? { x: -1, y: -1 };
}

export function newGame(rand = Math.random): State {
  const mid = Math.floor(GRID / 2);
  const snake = [
    { x: mid - 2, y: mid },
    { x: mid - 3, y: mid },
    { x: mid - 4, y: mid },
  ];
  return { snake, dir: 'right', queue: [], food: placeFood(snake, rand), score: 0, over: false };
}

/** Queue a turn, ignoring reversals and repeats relative to the last queued direction. */
export function turn(state: State, dir: Dir): State {
  const last = state.queue.at(-1) ?? state.dir;
  if (dir === last || dir === OPPOSITE[last] || state.queue.length >= 3) return state;
  return { ...state, queue: [...state.queue, dir] };
}

/** Advance one tick: move, eat, grow, or die on walls and self. */
export function step(state: State, rand = Math.random): State {
  if (state.over) return state;
  const [next, ...queue] = state.queue;
  const dir = next ?? state.dir;
  const head = state.snake[0];
  const nh = { x: head.x + DELTA[dir].x, y: head.y + DELTA[dir].y };
  const eats = nh.x === state.food.x && nh.y === state.food.y;
  const body = eats ? state.snake : state.snake.slice(0, -1);
  const hit =
    nh.x < 0 ||
    nh.y < 0 ||
    nh.x >= GRID ||
    nh.y >= GRID ||
    body.some((s) => s.x === nh.x && s.y === nh.y);
  if (hit) return { ...state, dir, queue, over: true };
  const snake = [nh, ...body];
  return {
    snake,
    dir,
    queue,
    food: eats ? placeFood(snake, rand) : state.food,
    score: state.score + (eats ? 1 : 0),
    over: false,
  };
}

/** A simple autopilot for the gallery preview: head toward the food, avoiding immediate death. */
export function autopilot(state: State): Dir {
  const head = state.snake[0];
  const options = (['up', 'down', 'left', 'right'] as Dir[]).filter(
    (d) => d !== OPPOSITE[state.dir],
  );
  const safe = options.filter((d) => !step({ ...state, dir: d, queue: [] }, () => 0).over);
  const pool = safe.length ? safe : options;
  const dist = (d: Dir) =>
    Math.abs(head.x + DELTA[d].x - state.food.x) + Math.abs(head.y + DELTA[d].y - state.food.y);
  return pool.reduce((a, b) => (dist(b) < dist(a) ? b : a));
}
