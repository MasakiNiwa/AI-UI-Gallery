import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'game-2048',
  category: 'games',
  tags: ['2048', 'puzzle', 'swipe', 'keyboard', 'grid', 'tile animation'],
  difficulty: 'hard',
  tech: ['Pure functions', 'Pointer/swipe gestures', 'CSS transitions'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: '2048 Puzzle',
      summary:
        'Slide numbered tiles with arrow keys or swipes; equal tiles merge until you reach 2048.',
      description:
        '2048 is a sliding puzzle on a 4×4 grid: every move slides all tiles in one direction, equal neighbors merge into their sum, and a new tile appears. It is a compact exercise in game logic, smooth tile animation and input handling for both keyboards and touch screens.\n\nThe core is a pure function that takes the board and a direction and returns the new board, the points scored and whether anything moved, which makes it easy to test. Tiles are absolutely positioned so CSS transitions animate their movement, merged tiles "pop", and swipes are detected from pointer movement. Score and best score sit above the board.',
      prompt:
        'Build a 2048 puzzle game.\n- 4×4 board; start with two tiles (2 or 4)\n- Arrow keys / WASD and swipe gestures (pointer events, 30px threshold) move tiles; equal tiles merge once per move; spawn a new tile after every valid move\n- Implement the move logic as a pure function move(board, direction) → { board, score, moved } with unit tests\n- Absolutely positioned tiles with CSS transitions for sliding; a "pop" animation for new and merged tiles\n- Tile colors get warmer as values grow; font size shrinks for 4-digit numbers\n- Score with a "+N" float animation, best score in localStorage, "New game" and an Undo button (one step)\n- Detect win (2048) and game over (no moves left) with an overlay\nUse React and TypeScript.',
      tips: [
        'Add a 5×5 or 6×6 board option.',
        'Add an AI hint button that suggests the best move.',
        'Save the game in progress to localStorage.',
      ],
    },
    ja: {
      name: '2048パズル',
      summary: '矢印キーやスワイプで数字のタイルを動かし、同じ数字を合体させて2048を目指す。',
      description:
        '2048は4×4の盤面で遊ぶスライドパズルです。1回の操作で全タイルが同じ方向に滑り、隣り合う同じ数字は合計に合体し、新しいタイルが現れます。ゲームロジック、なめらかなタイルのアニメーション、キーボードとタッチ両方の入力処理をコンパクトに学べる題材です。\n\n中心となるのは、盤面と方向を受け取って新しい盤面・獲得点・動いたかどうかを返す純粋関数で、テストもしやすくなります。タイルは絶対配置にしてCSSトランジションで移動をアニメーションさせ、合体したタイルは「ポン」と弾ませ、スワイプはポインターの移動量から判定します。盤面の上にスコアとベストスコアを表示します。',
      prompt:
        '2048パズルゲームを作ってください。\n- 4×4の盤面。最初は2つのタイル(2か4)\n- 矢印キー/WASDとスワイプ(ポインターイベント、30pxのしきい値)でタイルを動かす。同じ数字は1回の操作で1度だけ合体し、有効な操作のたびに新しいタイルを出す\n- 移動のロジックは純粋関数 move(board, direction) → { board, score, moved } として実装し、ユニットテストを書く\n- タイルは絶対配置にしてCSSトランジションでスライド。新しいタイルと合体したタイルは「ポン」と弾むアニメーション\n- 数字が大きいほど暖色に。4桁の数字はフォントを小さく\n- 「+N」が浮かぶスコア表示、localStorageに保存するベストスコア、「新しいゲーム」と1手戻すボタン\n- 2048到達(クリア)と、動かせなくなったとき(ゲームオーバー)をオーバーレイで表示\nReactとTypeScriptで実装してください。',
      tips: [
        '5×5や6×6の盤面を選べるようにして',
        '最善手を教えてくれるAIヒントボタンを追加して',
        '途中のゲームをlocalStorageに保存して',
      ],
    },
  },
};

export default meta;
