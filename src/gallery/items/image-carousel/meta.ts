import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'image-carousel',
  category: 'navigation',
  tags: ['carousel', 'slider', 'scroll snap', 'swipe', 'autoplay', 'gallery'],
  difficulty: 'medium',
  tech: ['CSS scroll-snap', 'IntersectionObserver'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Swipeable Carousel',
      summary:
        'A slide carousel with native swipe, arrows, dot indicators and pause-able autoplay.',
      description:
        'A carousel shows one slide at a time in a horizontal strip, letting users swipe or click through featured content such as promotions or photos. Arrows and dots show where you are and let you jump directly.\n\nBuilding it on native horizontal scrolling with CSS scroll-snap gives smooth touch swiping and momentum for free; an IntersectionObserver tracks which slide is visible to update the dots. Autoplay should pause on hover, focus and when the user interacts, and there must be a visible pause button for accessibility.',
      prompt:
        'Create an accessible image carousel.\n- Slides in a horizontal scroll container with scroll-snap-type: x mandatory and scroll-snap-align: center; hide the scrollbar\n- Previous/Next arrow buttons and clickable dot indicators; the active dot is wider\n- Track the visible slide with IntersectionObserver\n- Autoplay every 4 seconds, with a play/pause button; pause on hover and focus; disabled for prefers-reduced-motion\n- Each slide has a gradient image placeholder, a title and a caption\n- Keyboard: Left/Right arrows when the carousel is focused\n- Use aria-roledescription="carousel" and "slide", and label slides "2 of 5"\nUse React and Tailwind CSS (or Embla Carousel).',
      tips: [
        'Show part of the next slide (peek) on mobile.',
        'Add thumbnail navigation below the slides.',
        'Make it loop infinitely.',
      ],
    },
    ja: {
      name: 'スワイプできるカルーセル',
      summary:
        'ネイティブのスワイプ、矢印、ドットの位置表示、一時停止できる自動再生を備えたカルーセル。',
      description:
        'カルーセルは、横一列に並んだスライドを1枚ずつ表示し、キャンペーンや写真などの注目コンテンツをスワイプやクリックで切り替えられるUIです。矢印とドットで現在地がわかり、目的のスライドへ直接移動できます。\n\nネイティブの横スクロールとCSSのscroll-snapで作ると、なめらかなタッチ操作と慣性スクロールが標準で手に入ります。どのスライドが見えているかはIntersectionObserverで追跡してドットを更新します。自動再生はホバー中・フォーカス中・操作中は止め、アクセシビリティのために目に見える一時停止ボタンを用意する必要があります。',
      prompt:
        'アクセシブルな画像カルーセルを作ってください。\n- scroll-snap-type: x mandatory と scroll-snap-align: center を使った横スクロールのコンテナにスライドを並べ、スクロールバーは隠す\n- 前へ/次への矢印ボタンと、クリックできるドット。選択中のドットは横長にする\n- 表示中のスライドはIntersectionObserverで追跡\n- 4秒ごとの自動再生と、再生/一時停止ボタン。ホバー中とフォーカス中は一時停止し、prefers-reduced-motion では自動再生しない\n- 各スライドにグラデーションの仮画像、タイトル、キャプション\n- キーボード:カルーセルにフォーカスしているとき左右の矢印キーで移動\n- aria-roledescription="carousel" と "slide" を使い、スライドに「2 / 5」のようなラベルを付ける\nReactとTailwind CSS(またはEmbla Carousel)で実装してください。',
      tips: [
        'スマホでは次のスライドが少し見えるようにして',
        'スライドの下にサムネイルのナビゲーションを追加して',
        '無限にループするようにして',
      ],
    },
  },
};

export default meta;
