import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'spotlight-card',
  category: 'cards',
  tags: ['spotlight', 'glow', 'hover', 'border', 'cursor', 'radial gradient'],
  difficulty: 'medium',
  tech: ['CSS custom properties', 'radial-gradient', 'Pointer events'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Spotlight Hover Cards',
      summary: 'A grid of dark cards where a soft glow and glowing borders follow the cursor.',
      description:
        'Spotlight cards light up around the cursor: a soft radial glow follows the pointer across the card, and the border near the pointer glows too, even on neighboring cards. The effect, popular on developer-tool landing pages, makes a static grid feel alive without distracting animations.\n\nThe pointer position is written to CSS custom properties (--x, --y) on each card, and a radial-gradient background uses them. A second gradient layer, masked to the border area, creates the glowing edge.',
      prompt:
        'Create a feature grid with "spotlight" hover cards on a dark background.\n- 6 cards in a responsive grid, each with an icon, title and description\n- On pointer move over the grid, set CSS variables --x and --y on every card relative to that card\n- Card background: a subtle radial-gradient(400px circle at var(--x) var(--y), rgba(255,255,255,.08), transparent)\n- Border glow: a second radial gradient visible only in the 1px border area (use a padding + background-clip or mask trick), so nearby cards\' borders also light up\n- Fade the glow out when the pointer leaves the grid\n- No effect on touch devices\nUse HTML, CSS and vanilla JavaScript.',
      tips: [
        'Tint the glow with the brand color.',
        'Add a slight 3D tilt to the hovered card.',
        'Make it a React component that takes the cards as props.',
      ],
    },
    ja: {
      name: 'スポットライトホバーカード',
      summary: 'カーソルに合わせて柔らかな光と縁の輝きが動く、ダークなカードのグリッド。',
      description:
        'スポットライトカードは、カーソルの周りが照らされるカードです。ポインターに合わせて柔らかい円形の光がカード上を動き、ポインターに近い枠線も光ります(隣のカードの枠も光ります)。開発者向けツールのランディングページで人気の表現で、派手なアニメーションなしで静的なグリッドに生命感を与えます。\n\nポインターの位置を各カードのCSSカスタムプロパティ(--x、--y)に書き込み、背景の radial-gradient でそれを使います。枠線部分だけを見せるようにマスクした2つめのグラデーションの層で、光る縁を作ります。',
      prompt:
        '暗い背景の上に「スポットライト」ホバーカードを並べた機能紹介グリッドを作ってください。\n- レスポンシブなグリッドに6枚のカード。各カードにアイコン、タイトル、説明\n- グリッド上でポインターが動いたら、すべてのカードに、そのカード基準の位置をCSS変数 --x と --y で設定\n- カードの背景:控えめな radial-gradient(400px circle at var(--x) var(--y), rgba(255,255,255,.08), transparent)\n- 枠の光:1pxの枠線部分だけに見える2つめの放射状グラデーション(padding + background-clip か mask の技法)で、近くのカードの枠も光るようにする\n- ポインターがグリッドから出たら光をフェードアウト\n- タッチ端末では効果なし\nHTML・CSS・素のJavaScriptで実装してください。',
      tips: [
        '光をブランドカラーで色付けして',
        'ホバー中のカードを少しだけ3Dに傾けて',
        'カードをpropsで受け取るReactコンポーネントにして',
      ],
    },
  },
};

export default meta;
