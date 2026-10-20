import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'infinite-marquee',
  category: 'animation',
  tags: ['marquee', 'logo carousel', 'infinite scroll', 'ticker', 'testimonials'],
  difficulty: 'easy',
  tech: ['CSS animation', 'mask-image'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Infinite Logo Marquee',
      summary:
        'Rows of logos and testimonials that scroll endlessly, pausing on hover, with faded edges.',
      description:
        'An infinite marquee continuously scrolls a row of items, such as customer logos or testimonials, giving a sense of scale without taking much space. Rows can move in opposite directions at different speeds.\n\nThe trick is to render the list twice in a row and translate the track by -50% with a linear, infinite CSS animation; when the first copy has scrolled out, the second is exactly in its place, so the loop is seamless. A gradient mask-image fades the edges, hovering pauses the animation, and the duplicate copy is hidden from screen readers.',
      prompt:
        'Create an infinite scrolling marquee section with two rows.\n- Row 1: company logos (use simple text/icon placeholders) moving left; Row 2: short testimonial cards moving right, slightly slower\n- Seamless loop: duplicate the items and animate translateX from 0 to -50% with a linear infinite keyframe animation\n- Fade the left and right edges with mask-image: linear-gradient(...)\n- Pause on hover (animation-play-state: paused)\n- Mark the duplicated items aria-hidden="true"\n- Respect prefers-reduced-motion by showing a static, wrapped list instead\nUse HTML and CSS only.',
      tips: [
        'Make the speed adjustable with a CSS variable.',
        'Make logos grayscale and colorize them on hover.',
        'Add drag-to-scroll with momentum.',
      ],
    },
    ja: {
      name: '無限ループのロゴマーキー',
      summary: 'ロゴや推薦文の列が途切れなく流れ続け、ホバーで止まり、両端がフェードする。',
      description:
        '無限マーキーは、取引先のロゴや利用者の声などの列を絶えずスクロールさせ続けるUIです。場所を取らずに「たくさんの実績」を感じさせられます。列ごとに逆方向・違う速さで流すこともできます。\n\nコツは、リストを2回続けて並べ、トラック全体を線形・無限のCSSアニメーションで -50% まで動かすことです。1つ目が流れ切ったときに2つ目がちょうど同じ位置に来るので、継ぎ目なくループします。両端はグラデーションの mask-image でフェードさせ、ホバー中はアニメーションを止め、複製した側はスクリーンリーダーから隠します。',
      prompt:
        '2列の無限スクロールのマーキーセクションを作ってください。\n- 1列目:企業ロゴ(簡単な文字やアイコンの仮置き)が左へ流れる。2列目:短い推薦文カードが右へ、少しゆっくり流れる\n- 継ぎ目なくループ:項目を複製し、translateX を0から-50%まで、線形の無限キーフレームアニメーションで動かす\n- mask-image: linear-gradient(...) で左右の端をフェード\n- ホバー中は一時停止(animation-play-state: paused)\n- 複製した項目には aria-hidden="true"\n- prefers-reduced-motion では、折り返した静的なリストを表示する\nHTMLとCSSだけで実装してください。',
      tips: [
        '速さをCSS変数で調整できるようにして',
        'ロゴをグレースケールにし、ホバーで色付きにして',
        '慣性付きのドラッグスクロールを追加して',
      ],
    },
  },
};

export default meta;
