import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'loading-spinners',
  category: 'animation',
  tags: ['loader', 'spinner', 'loading indicator', 'progress', 'css only'],
  difficulty: 'easy',
  tech: ['CSS animation', 'role="status"'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Loading Indicator Collection',
      summary:
        'Eight CSS-only loaders: spinner ring, dots, bars, pulse, orbit, progress bar and more.',
      description:
        'Loading indicators tell users that something is happening. Spinners and dots suit unknown durations, while progress bars should be used when the progress is known. Keep them small, calm and on-brand.\n\nAll of these are pure CSS keyframe animations on a few elements, so they cost almost nothing and work everywhere. Each one is wrapped in role="status" with a visually hidden "Loading…" label for screen readers, and slows down or stops when reduced motion is requested.',
      prompt:
        'Create a showcase grid of 8 CSS-only loading indicators.\n- Spinner ring (border with one colored side), three bouncing dots, equalizer bars, pulsing circle, orbiting dots, a rotating square that morphs into a circle, an indeterminate progress bar, and a typing "…" text\n- Each loader uses only CSS keyframes and the accent color through a CSS variable\n- Each sits in a card with its name; clicking a card copies its CSS\n- Each loader has role="status" and a visually hidden "Loading…" label\n- Respect prefers-reduced-motion (slow down or show a static state)\nUse HTML and CSS.',
      tips: [
        'Add size variants (small, medium, large).',
        'Show a loader only after 300 ms to avoid flicker.',
        'Make a branded loader from the logo shape.',
      ],
    },
    ja: {
      name: 'ローディング表示のコレクション',
      summary:
        'CSSだけで作った8種類のローディング表示:リング、ドット、バー、パルス、軌道、プログレスバーなど。',
      description:
        'ローディング表示は、処理が進んでいることを利用者に伝えるUIです。所要時間がわからないときはスピナーやドット、進み具合がわかるときはプログレスバーを使います。小さく落ち着いた、ブランドに合ったものにしましょう。\n\nここにあるものはすべて、少数の要素にCSSのキーフレームアニメーションを付けただけなので、負荷はほぼゼロでどこでも動きます。それぞれ role="status" で囲み、スクリーンリーダー向けに見えない「読み込み中…」のラベルを付け、動きを減らす設定では遅くするか止めます。',
      prompt:
        'CSSだけで作るローディング表示を8種類並べたショーケースを作ってください。\n- スピナーのリング(一辺だけ色の付いた枠線)、跳ねる3つの点、イコライザーのバー、脈打つ円、軌道を回る点、回転しながら円に変形する四角、終わりのないプログレスバー、「…」が増えていくテキスト\n- 各ローディング表示はCSSのキーフレームだけを使い、アクセントカラーはCSS変数で指定\n- それぞれ名前付きのカードに入れ、カードをクリックするとそのCSSをコピー\n- 各表示に role="status" と、見えない「読み込み中…」のラベル\n- prefers-reduced-motion に配慮する(遅くするか静止状態にする)\nHTMLとCSSで実装してください。',
      tips: [
        'サイズ違い(小・中・大)を追加して',
        'ちらつきを防ぐため、300ms経ってからローディング表示を出して',
        'ロゴの形を使ったブランド独自のローディング表示を作って',
      ],
    },
  },
};

export default meta;
