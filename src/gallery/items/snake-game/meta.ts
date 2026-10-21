import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'snake-game',
  category: 'games',
  tags: ['snake', 'retro game', 'canvas', 'keyboard', 'swipe', 'game loop'],
  difficulty: 'medium',
  tech: ['Canvas 2D', 'Pure game logic', 'Pointer events'],
  addedAt: '2026-10-22',
  text: {
    en: {
      name: 'Snake Game',
      summary:
        'The classic snake on a canvas: arrow keys, WASD, swipes or a D-pad, rising speed, pause and a best score.',
      description:
        'Snake is a great example of separating game logic from rendering. All the rules (moving, turning, eating, growing and colliding) are pure functions on a plain state object, which makes them easy to unit-test. The component only runs the timer, draws the state on a canvas and turns input into turns.\n\nTurns pressed quickly in a row are queued and applied one per tick, so fast players never reverse into themselves. The snake speeds up as it grows. On phones you can swipe on the board or use the on-screen D-pad; Space pauses. The gallery preview plays itself with a tiny autopilot.',
      prompt:
        'Build a classic Snake game.\n- 17×17 grid drawn on a canvas (checkerboard background, glowing food, snake with a rounded head and eyes, body fading toward the tail)\n- Keep the game logic pure and unit-testable: state = { snake, dir, queue, food, score, over }; step() moves, eats, grows and detects wall/self collisions; turn() queues up to 3 turns and ignores reversals\n- Controls: arrow keys / WASD, swipe on the board, and an on-screen D-pad on small screens; Space pauses/resumes\n- Speed increases with the score; show score and best score (localStorage)\n- Overlays for start, pause and game over with a "Play again" button\n- Handle devicePixelRatio and resizing\nUse React and TypeScript.',
      tips: [
        'Let the snake wrap around the edges as an option.',
        'Add obstacles that appear as the level rises.',
        'Play a short sound when eating.',
      ],
    },
    ja: {
      name: 'スネークゲーム',
      summary:
        'キャンバスで遊ぶ定番のスネーク。矢印キー、WASD、スワイプ、十字キーで操作し、スピードアップ、一時停止、ベストスコア付き。',
      description:
        'スネークは、ゲームのロジックと描画を分ける良い例です。移動、方向転換、食べる、伸びる、ぶつかるといったルールはすべて、シンプルな状態オブジェクトを扱う純粋な関数なので、単体テストが簡単です。コンポーネントはタイマーを動かし、状態をキャンバスに描き、入力を方向転換に変えるだけです。\n\n素早く続けて押した方向転換はキューに入れて1ティックに1つずつ反映するので、速く操作しても自分に逆走してしまうことがありません。蛇は長くなるほど速くなります。スマホでは盤面をスワイプするか画面上の十字キーで操作でき、スペースキーで一時停止します。ギャラリーのプレビューでは小さな自動操縦が遊んでいます。',
      prompt:
        '定番のスネークゲームを作ってください。\n- 17×17のマスをキャンバスに描画(市松模様の背景、光るエサ、丸い頭と目のある蛇、尾に向かってフェードする胴体)\n- ゲームのロジックは純粋で単体テスト可能に:state = { snake, dir, queue, food, score, over }。step() で移動・食べる・伸びる・壁や自分への衝突を判定し、turn() は最大3つまで方向転換をキューに入れ、逆方向は無視\n- 操作:矢印キー / WASD、盤面のスワイプ、小さい画面では画面上の十字キー。スペースで一時停止/再開\n- スコアに応じてスピードアップし、スコアとベストスコア(localStorage)を表示\n- スタート、一時停止、ゲームオーバーのオーバーレイと「もう一度」ボタン\n- devicePixelRatio とリサイズに対応\nReactとTypeScriptで実装してください。',
      tips: [
        'オプションで端を通り抜けられるようにして',
        'レベルが上がると障害物が出るようにして',
        'エサを食べたときに短い効果音を鳴らして',
      ],
    },
  },
};

export default meta;
