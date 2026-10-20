import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'scroll-reveal',
  category: 'animation',
  tags: [
    'scroll animation',
    'reveal on scroll',
    'reading progress',
    'intersection observer',
    'storytelling',
  ],
  difficulty: 'medium',
  tech: ['IntersectionObserver', 'Scroll events'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Scroll Reveal & Progress',
      summary:
        'Sections that fade and slide in as you scroll, with a reading progress bar and a step counter.',
      description:
        'Scroll-triggered animations reveal content as it enters the viewport, which gives long landing pages and stories a sense of rhythm. A thin progress bar at the top shows how far the reader has scrolled.\n\nAn IntersectionObserver adds a "visible" class when each element crosses a threshold; CSS transitions handle the fade and slide, with a small stagger between items. The progress bar reads scrollTop / (scrollHeight − clientHeight). Modern browsers can also do this with CSS scroll-driven animations (animation-timeline: view()).',
      prompt:
        "Create a long-scrolling feature story with scroll-triggered animations.\n- A fixed reading progress bar at the top that fills as the user scrolls\n- 5 sections; each section's heading, text and image card fade in and slide up when 25% visible, using IntersectionObserver and CSS transitions\n- Stagger children by 100ms; alternate image left/right on wide screens\n- A side indicator shows the current section number (1/5) and updates as you scroll\n- Animate only once per element; respect prefers-reduced-motion (show everything immediately)\n- Bonus: provide a pure-CSS version with animation-timeline: view()\nUse HTML, CSS and JavaScript.",
      tips: [
        'Pin a section and animate it while scrolling (scrollytelling).',
        'Use GSAP ScrollTrigger for complex timelines.',
        'Count numbers up when the stats section appears.',
      ],
    },
    ja: {
      name: 'スクロールで現れるコンテンツと進捗',
      summary:
        'スクロールに合わせてセクションがフェードしながら現れる。読み進み具合のバーとステップ表示付き。',
      description:
        'スクロールで発動するアニメーションは、要素が画面に入ったタイミングで内容を見せる表現で、長いランディングページや読み物にリズムを生みます。上部の細い進捗バーは、どこまで読み進めたかを示します。\n\n各要素が一定の割合だけ画面に入ったらIntersectionObserverで「visible」クラスを付け、フェードとスライドはCSSトランジションで行い、項目ごとに少しずつ時間差を付けます。進捗バーは scrollTop / (scrollHeight − clientHeight) で計算します。最近のブラウザでは、CSSのスクロール駆動アニメーション(animation-timeline: view())でも同じことができます。',
      prompt:
        'スクロールで発動するアニメーション付きの、縦に長い紹介ページを作ってください。\n- 上部に固定の進捗バー。スクロールに合わせて満ちていく\n- 5つのセクション。各セクションの見出し・本文・画像カードは、25%見えたらフェードしながら上へスライドして現れる(IntersectionObserverとCSSトランジション)\n- 子要素は100msずつ時間差を付け、広い画面では画像を左右交互に配置\n- 横に現在のセクション番号(1/5)を表示し、スクロールに合わせて更新\n- 各要素のアニメーションは1回だけ。prefers-reduced-motion ではすべてすぐに表示\n- おまけ:animation-timeline: view() を使った純CSS版も用意\nHTML・CSS・JavaScriptで実装してください。',
      tips: [
        'セクションを固定してスクロール中にアニメーションさせて(スクロールテリング)',
        '複雑なタイムラインにはGSAPのScrollTriggerを使って',
        '数字のセクションが現れたらカウントアップさせて',
      ],
    },
  },
};

export default meta;
