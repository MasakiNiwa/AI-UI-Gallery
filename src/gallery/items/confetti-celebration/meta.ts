import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'confetti-celebration',
  category: 'feedback',
  tags: ['confetti', 'celebration', 'success', 'particles', 'gamification'],
  difficulty: 'medium',
  tech: ['Canvas 2D', 'requestAnimationFrame'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Confetti Celebration',
      summary:
        'A burst of colorful confetti on a canvas to celebrate a completed task or purchase.',
      description:
        'A confetti burst is a moment of delight after an important success: finishing onboarding, completing a purchase or reaching a goal. Used sparingly, it makes the achievement feel rewarding.\n\nEach piece is a small rectangle with its own velocity, rotation and color. Every frame applies gravity and air drag, rotates it and draws it on a canvas; pieces are removed once they leave the screen, and the loop stops when none are left, so it costs nothing when idle.',
      prompt:
        'Create a "Complete purchase" success screen with a confetti celebration.\n- Clicking the button shows a success card and fires confetti from the button position\n- Draw confetti on a full-size <canvas> overlay (pointer-events: none) with devicePixelRatio scaling\n- 150 pieces: random colors from a palette, rectangles and circles, random initial velocity in an upward cone\n- Each frame: apply gravity and air drag, wobble rotation, fade out near the end\n- Stop the animation loop when all pieces are gone\n- Skip the confetti entirely for prefers-reduced-motion\nUse vanilla JavaScript with requestAnimationFrame (no libraries).',
      tips: [
        'Fire confetti from both bottom corners like cannons.',
        'Use emoji instead of rectangles.',
        'Use the canvas-confetti library.',
      ],
    },
    ja: {
      name: '紙吹雪のお祝い',
      summary: 'タスクの完了や購入をお祝いして、キャンバスにカラフルな紙吹雪を舞わせる。',
      description:
        '紙吹雪は、初期設定の完了・購入・目標の達成といった大事な成功のあとに楽しさを添える演出です。ここぞという場面に絞って使うと、達成感がぐっと高まります。\n\n紙吹雪の1枚1枚は、それぞれ速度・回転・色を持つ小さな長方形です。毎フレーム、重力と空気抵抗を加えて回転させ、キャンバスに描きます。画面の外に出た紙は取り除き、すべてなくなったらループを止めるので、何もしていないときの負荷はゼロです。',
      prompt:
        '紙吹雪でお祝いする「購入完了」の画面を作ってください。\n- ボタンをクリックすると完了カードを表示し、ボタンの位置から紙吹雪を発射\n- 紙吹雪は、画面全体を覆う <canvas>(pointer-events: none)に devicePixelRatio を考慮して描く\n- 150枚:パレットからランダムな色、長方形と円、上向きの円錐の範囲でランダムな初速\n- 毎フレーム:重力と空気抵抗をかけ、回転を揺らし、終わり際にフェードアウト\n- すべての紙がなくなったらアニメーションのループを止める\n- prefers-reduced-motion の場合は紙吹雪を出さない\nライブラリを使わず、素のJavaScriptと requestAnimationFrame で実装してください。',
      tips: [
        '下の両隅から大砲のように紙吹雪を発射して',
        '長方形の代わりに絵文字を使って',
        'canvas-confettiライブラリを使って',
      ],
    },
  },
};

export default meta;
