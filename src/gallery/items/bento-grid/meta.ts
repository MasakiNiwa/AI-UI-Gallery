import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'bento-grid',
  category: 'layout',
  tags: ['bento', 'grid', 'feature section', 'landing page', 'css grid'],
  difficulty: 'easy',
  tech: ['CSS Grid'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Bento Grid',
      summary: 'A feature section made of tiles of different sizes, like a Japanese bento box.',
      description:
        'A bento grid arranges content in rounded tiles of varying sizes, like the compartments of a bento box. Large tiles highlight key features while small ones add detail, creating a lively but tidy composition. It is common on product landing pages.\n\nCSS Grid makes it easy: define a column grid and let tiles span several columns or rows with col-span / row-span. On small screens, the tiles collapse into a single column.',
      prompt:
        'Design a "bento grid" feature section for a product landing page.\n- CSS Grid with 4 columns on desktop, 2 on tablet, 1 on mobile\n- 6 tiles of different sizes: one large 2x2 tile, one wide 2x1 tile, and smaller 1x1 tiles\n- Each tile: rounded corners, subtle border, an icon or small illustration, title and one-line description\n- The large tile contains a mini chart or mockup\n- Subtle hover effect: lift and border highlight\n- Calm color palette that works in light and dark mode\nUse HTML and Tailwind CSS.',
      tips: [
        'Animate tiles in with a stagger when they scroll into view.',
        'Add a spotlight effect that follows the cursor across tiles.',
        'Make one tile a looping video.',
      ],
    },
    ja: {
      name: 'ベントーグリッド',
      summary: 'お弁当箱のように、大きさの違うタイルを組み合わせた機能紹介セクション。',
      description:
        'ベントーグリッドは、角丸のタイルを大きさを変えて敷き詰めるレイアウトで、お弁当箱の仕切りに見立てた名前です。大きなタイルで主な機能を目立たせ、小さなタイルで補足することで、にぎやかでも整った印象になります。製品のランディングページでよく使われます。\n\nCSS Gridを使えば簡単です。列のグリッドを定義し、タイルに col-span / row-span で複数の列や行をまたがせます。狭い画面では1列に並べ替えます。',
      prompt:
        '製品のランディングページ用に「ベントーグリッド」の機能紹介セクションをデザインしてください。\n- CSS Gridで、PCは4列、タブレットは2列、スマホは1列\n- 大きさの違う6つのタイル:2×2の大きなタイル1つ、2×1の横長タイル1つ、残りは1×1\n- 各タイル:角丸、控えめな枠線、アイコンか小さなイラスト、タイトル、1行の説明\n- 大きなタイルには小さなグラフかモックアップを入れる\n- ホバー時に少し浮き上がり、枠線が強調される控えめな効果\n- ライト/ダークモードの両方で映える落ち着いた配色\nHTMLとTailwind CSSで実装してください。',
      tips: [
        'スクロールで表示されたときにタイルを順番にアニメーションさせて',
        'カーソルに合わせてタイル上をスポットライトが動く効果を追加して',
        '1つのタイルをループ動画にして',
      ],
    },
  },
};

export default meta;
