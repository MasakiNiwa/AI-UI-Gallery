import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'before-after-slider',
  category: 'effects',
  tags: ['before after', 'image comparison', 'slider', 'clip-path', 'reveal'],
  difficulty: 'easy',
  tech: ['clip-path', 'Range input'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Before / After Comparison',
      summary:
        'Drag a divider across two stacked images to compare a "before" and "after" version.',
      description:
        'A before/after slider stacks two images and lets users drag a vertical divider to reveal more of one or the other. It is perfect for photo edits, renovations, redesigns or light/dark theme comparisons.\n\nThe top image is clipped with clip-path: inset(0 X% 0 0), where X follows the divider position. Using a visually hidden native range input on top handles mouse, touch and keyboard input accessibly; the visible handle is just decoration that follows its value.',
      prompt:
        'Create a before/after image comparison slider.\n- Two images of the same size stacked; the "after" image on top is clipped with clip-path: inset(0 calc(100% - var(--pos)) 0 0)\n- A vertical divider line with a round handle (left/right arrows icon) at the clip position\n- Use a transparent <input type="range"> covering the image for dragging, so mouse, touch and keyboard (arrow keys) all work; aria-label "Comparison position"\n- "Before" and "After" labels in the corners that fade when the divider gets close\n- Clicking anywhere jumps the divider there with a short transition\n- Responsive and keeps the aspect ratio\nUse HTML, CSS and a little JavaScript.',
      tips: [
        'Make it a vertical (top/bottom) comparison.',
        'Animate the divider back and forth once on load as a hint.',
        'Compare a light and dark version of a UI screenshot.',
      ],
    },
    ja: {
      name: 'ビフォー/アフター比較',
      summary: '重ねた2枚の画像の上で仕切りをドラッグして、「前」と「後」を見比べるスライダー。',
      description:
        'ビフォー/アフタースライダーは2枚の画像を重ね、縦の仕切りをドラッグしてどちらかを多く見せるUIです。写真の加工、リフォーム、リデザイン、ライト/ダークテーマの比較などにぴったりです。\n\n上の画像を clip-path: inset(0 X% 0 0) で切り抜き、Xを仕切りの位置に合わせます。見えないネイティブのrange入力を上に重ねると、マウス・タッチ・キーボードの入力をアクセシブルに扱え、見えているハンドルはその値に追従する飾りになります。',
      prompt:
        'ビフォー/アフターの画像比較スライダーを作ってください。\n- 同じサイズの2枚の画像を重ね、上の「後」の画像を clip-path: inset(0 calc(100% - var(--pos)) 0 0) で切り抜く\n- 切り抜き位置に、丸いハンドル(左右の矢印アイコン)付きの縦の仕切り線\n- 画像全体を覆う透明な <input type="range"> でドラッグを扱い、マウス・タッチ・キーボード(矢印キー)のすべてで操作できるようにする。aria-label は「比較位置」\n- 隅に「Before」「After」のラベルを置き、仕切りが近づくとフェードする\n- どこかをクリックすると、短いトランジションで仕切りがそこへ移動\n- レスポンシブで、縦横比を保つ\nHTML・CSSと少しのJavaScriptで実装してください。',
      tips: [
        '上下で比較する縦向きにして',
        'ヒントとして、読み込み時に仕切りを一度だけ左右に動かして',
        'UIのスクリーンショットのライト版とダーク版を比べて',
      ],
    },
  },
};

export default meta;
