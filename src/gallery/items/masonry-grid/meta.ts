import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'masonry-grid',
  category: 'layout',
  tags: ['masonry', 'pinterest', 'image grid', 'columns', 'gallery'],
  difficulty: 'easy',
  tech: ['CSS multi-column', 'Container queries'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Masonry Grid',
      summary:
        'A Pinterest-style layout where items of different heights stack tightly in columns.',
      description:
        'A masonry layout places items of varying heights in columns without leaving gaps, like bricks in a wall. It is ideal for image galleries, mood boards and card feeds where content length differs.\n\nThe simplest technique is CSS multi-column layout (column-count / columns) with break-inside: avoid on each item, which needs no JavaScript. The number of columns adapts to the available width. Note that items flow top-to-bottom per column; for left-to-right order, a JavaScript layout or the upcoming CSS masonry feature is needed.',
      prompt:
        'Create a Pinterest-style masonry gallery.\n- Use CSS columns (column-width or column-count) with break-inside: avoid; no JavaScript layout\n- 1 column on small screens, up to 4 on wide screens, with consistent 12px gaps\n- Each item is a card with a placeholder image of varying aspect ratio (gradient), a title and a small author row\n- Hover: lift the card, show an overlay with a "Save" button\n- Filter chips above the grid (All, Interiors, Nature, Architecture) that animate the change\n- Lazy-load images with loading="lazy"\nUse HTML and Tailwind CSS.',
      tips: [
        'Keep left-to-right order with a JavaScript masonry library.',
        'Add infinite scrolling that loads more items.',
        'Open items in a lightbox on click.',
      ],
    },
    ja: {
      name: 'マソンリーグリッド',
      summary: '高さの違う項目が、列ごとに隙間なく積み上がるPinterest風のレイアウト。',
      description:
        'マソンリーレイアウトは、高さの違う項目を、壁のレンガのように隙間なく列に並べるレイアウトです。内容の長さがばらばらな、画像ギャラリー・ムードボード・カードのフィードに最適です。\n\n最も簡単なのはCSSの段組み(column-count / columns)を使い、各項目に break-inside: avoid を指定する方法で、JavaScriptは不要です。列の数は利用できる幅に合わせて変わります。ただし項目は列ごとに上から下へ流れるので、左から右の順に並べたい場合は、JavaScriptでの配置か、今後登場するCSSのマソンリー機能が必要です。',
      prompt:
        'Pinterest風のマソンリーギャラリーを作ってください。\n- CSSの段組み(column-width か column-count)と break-inside: avoid を使い、JavaScriptでの配置はしない\n- 狭い画面では1列、広い画面では最大4列。間隔は一定の12px\n- 各項目は、縦横比がばらばらの仮画像(グラデーション)、タイトル、小さな作者情報の行を持つカード\n- ホバー時:カードを浮かせ、「保存」ボタン付きのオーバーレイを表示\n- グリッドの上に絞り込みチップ(すべて、インテリア、自然、建築)を置き、切り替えをアニメーションさせる\n- 画像は loading="lazy" で遅延読み込み\nHTMLとTailwind CSSで実装してください。',
      tips: [
        'JavaScriptのマソンリーライブラリで左から右の順序を保って',
        'スクロールすると続きを読み込む無限スクロールを追加して',
        'クリックでライトボックス表示にして',
      ],
    },
  },
};

export default meta;
