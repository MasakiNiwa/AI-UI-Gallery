import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'shrinking-header',
  category: 'navigation',
  tags: ['sticky header', 'shrink on scroll', 'hide on scroll', 'navbar', 'scroll direction'],
  difficulty: 'medium',
  tech: ['Scroll events', 'CSS transitions'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Shrinking Sticky Header',
      summary:
        'A tall header that shrinks into a compact bar on scroll, hides when scrolling down and returns when scrolling up.',
      description:
        'A shrinking sticky header starts large (logo, title and navigation with plenty of space) and condenses into a compact, slightly translucent bar once the page is scrolled. To give content more room on small screens, it can also slide away while scrolling down and come back as soon as the user scrolls up, a pattern common in mobile browsers and news apps.\n\nThe header reacts to the scroll position and direction; changes use transform and opacity transitions so they are cheap to animate, and a small threshold avoids flicker from tiny scroll movements. A thin progress line shows how far the page has been read.',
      prompt:
        "Create a sticky header that shrinks and hides on scroll.\n- Initially 96px tall with a large logo and title; after scrolling 40px it animates to a 56px compact bar with a smaller logo, a blurred translucent background and a bottom shadow\n- While scrolling down past 200px, slide the header up out of view; reveal it immediately when scrolling up (ignore movements under 8px)\n- A thin reading-progress bar along the header's bottom edge\n- Navigation links stay accessible; the header never hides while a link inside it has keyboard focus\n- Use requestAnimationFrame to throttle scroll handling and transform/opacity for animation\nUse React and Tailwind CSS.",
      tips: [
        'Collapse the navigation into a hamburger menu in compact mode.',
        'Use CSS scroll-driven animations instead of JavaScript.',
        'Add a search field that expands from an icon in the compact bar.',
      ],
    },
    ja: {
      name: '縮むスティッキーヘッダー',
      summary:
        'スクロールすると背の高いヘッダーが細いバーに縮み、下スクロールで隠れ、上スクロールで戻る。',
      description:
        '縮むスティッキーヘッダーは、最初は大きく(ロゴ・タイトル・ナビゲーションをゆったり配置)、ページをスクロールすると少し半透明のコンパクトなバーに縮むUIです。小さな画面でコンテンツの場所を広げるため、下にスクロールしている間は隠れ、上にスクロールした瞬間に戻ってくる動きも加えられます。スマホのブラウザやニュースアプリでよく見るパターンです。\n\nヘッダーはスクロール位置と方向に反応し、変化は transform と opacity のトランジションで行うので軽く動きます。小さなスクロールでちらつかないよう、少しのしきい値を設けます。細い進捗線で、どこまで読んだかも示します。',
      prompt:
        'スクロールで縮み、隠れるスティッキーヘッダーを作ってください。\n- 最初は高さ96pxで、大きなロゴとタイトル。40pxスクロールしたら、小さなロゴ、ぼかした半透明の背景、下の影を持つ高さ56pxのコンパクトなバーにアニメーションで変わる\n- 200pxを越えて下にスクロールしている間はヘッダーを上にスライドして隠し、上にスクロールしたらすぐに表示(8px未満の動きは無視)\n- ヘッダーの下端に細い読み進み具合のバー\n- ナビゲーションのリンクは常に操作でき、内部のリンクにキーボードフォーカスがある間は隠さない\n- スクロール処理は requestAnimationFrame で間引き、アニメーションには transform/opacity を使う\nReactとTailwind CSSで実装してください。',
      tips: [
        'コンパクトなときはナビゲーションをハンバーガーメニューにまとめて',
        'JavaScriptの代わりにCSSのスクロール駆動アニメーションを使って',
        'コンパクトなバーにアイコンから広がる検索欄を追加して',
      ],
    },
  },
};

export default meta;
