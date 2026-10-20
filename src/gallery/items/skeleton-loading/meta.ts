import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'skeleton-loading',
  category: 'animation',
  tags: ['skeleton', 'loading', 'shimmer', 'placeholder'],
  difficulty: 'easy',
  tech: ['CSS animation'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Skeleton Loading',
      summary: 'Gray placeholder shapes with a shimmer that stand in for content while it loads.',
      description:
        'A skeleton screen shows the rough layout of the content (gray boxes where the avatar, title and text will be) while data is loading. Compared with a spinner, it makes waiting feel shorter and avoids layout jumps when the real content arrives.\n\nThe shimmer is a moving linear gradient, animated with background-position. Mark the region with aria-busy="true" so assistive technology knows content is loading.',
      prompt:
        'Create a skeleton loading state for a list of social media posts.\n- While loading, show 3 skeleton cards: circle avatar, two text lines of different widths, and an image block\n- Add a shimmer effect: a light gradient sweeping left to right, using a CSS animation on background-position\n- After 2 seconds, fade in the real content with exactly the same layout (no layout shift)\n- A "Reload" button to show the loading state again\n- Set aria-busy on the list while loading\n- Looks good in light and dark mode; disable shimmer for prefers-reduced-motion\nUse HTML, CSS and JavaScript.',
      tips: [
        'Make a reusable <Skeleton> component with width/height props.',
        'Use a pulse animation instead of a shimmer.',
        'Show skeletons only if loading takes longer than 300 ms.',
      ],
    },
    ja: {
      name: 'スケルトンローディング',
      summary: '読み込み中、コンテンツの代わりに光が流れるグレーの仮の形を表示する。',
      description:
        'スケルトンスクリーンは、データの読み込み中に、コンテンツのおおまかなレイアウト(アバター・タイトル・本文の位置にグレーの箱)を先に表示するUIです。スピナーよりも待ち時間が短く感じられ、本物のコンテンツが届いたときにレイアウトがずれることもありません。\n\n光が流れる「シマー」は、動く線形グラデーションを background-position のアニメーションで動かして作ります。読み込み中の領域には aria-busy="true" を付けて、支援技術に読み込み中であることを伝えます。',
      prompt:
        'SNS投稿の一覧に、スケルトンローディングの状態を作ってください。\n- 読み込み中は3枚のスケルトンカード:丸いアバター、幅の違う2行のテキスト、画像の枠\n- シマー効果:明るいグラデーションが左から右へ流れる(background-positionをCSSアニメーションで動かす)\n- 2秒後、まったく同じレイアウトで本物のコンテンツをフェードイン(レイアウトのずれなし)\n- もう一度読み込み状態を見られる「再読み込み」ボタン\n- 読み込み中は一覧に aria-busy を設定\n- ライト/ダークモードの両方できれいに見え、prefers-reduced-motion ではシマーを止める\nHTML・CSS・JavaScriptで実装してください。',
      tips: [
        '幅と高さを指定できる再利用可能な<Skeleton>コンポーネントにして',
        'シマーの代わりにパルス(点滅)アニメーションにして',
        '読み込みが300ms以上かかる場合だけスケルトンを表示して',
      ],
    },
  },
};

export default meta;
