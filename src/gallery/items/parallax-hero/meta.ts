import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'parallax-hero',
  category: 'effects',
  tags: ['parallax', 'layers', 'hero', 'landscape', 'depth', 'pointer'],
  difficulty: 'medium',
  tech: ['SVG', 'CSS transform', 'Pointer events'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Layered Parallax Landscape',
      summary:
        'A mountain landscape of SVG layers that shift at different speeds with the pointer and scroll.',
      description:
        'Parallax creates depth by moving layers at different speeds: distant mountains barely move while foreground hills move more, just as the view from a train window. In a hero section it turns a flat illustration into a scene.\n\nEach layer is an SVG shape positioned absolutely; the pointer offset (and scroll position) is multiplied by a per-layer depth factor and applied with transform: translate3d(), which is cheap for the GPU to composite. Easing toward the target each frame keeps the motion smooth.',
      prompt:
        'Create a parallax hero with a layered mountain landscape.\n- 5 SVG layers: sky gradient with a sun, far mountains, mid mountains, near hills and foreground trees; colors get darker and more saturated toward the front\n- Moving the pointer shifts each layer by a different amount (depth factor 0.02 to 0.12); also shift layers on scroll inside the container\n- Smoothly ease toward the target offset with requestAnimationFrame; use transform: translate3d for GPU compositing\n- Headline and a button overlaid in the sky area\n- Day/night toggle that changes the palette with a transition\n- Disable motion for prefers-reduced-motion\nUse HTML, CSS (or Tailwind) and vanilla JavaScript.',
      tips: [
        'Use the device orientation (gyroscope) on phones.',
        'Add drifting clouds and twinkling stars at night.',
        'Use CSS scroll-driven animations instead of JavaScript.',
      ],
    },
    ja: {
      name: '重なりのあるパララックス風景',
      summary:
        'SVGの層でできた山の風景が、ポインターやスクロールに合わせてそれぞれ違う速さで動く。',
      description:
        'パララックス(視差)は、層ごとに違う速さで動かして奥行きを生む表現です。電車の窓から見える景色のように、遠くの山はほとんど動かず、手前の丘ほど大きく動きます。ヒーローセクションに使うと、平面のイラストがひとつの情景に変わります。\n\n各層は絶対配置したSVGの図形です。ポインターのずれ(とスクロール位置)に層ごとの奥行き係数を掛け、transform: translate3d() で適用します。これはGPUが合成するだけなので軽い処理です。毎フレーム目標位置へイージングで近づけると、動きがなめらかになります。',
      prompt:
        '山の風景を重ねたパララックスのヒーローを作ってください。\n- 5つのSVGの層:太陽のある空のグラデーション、遠くの山、中ほどの山、近くの丘、手前の木々。手前ほど色が濃く鮮やかになる\n- ポインターを動かすと各層が違う量だけずれる(奥行き係数0.02〜0.12)。コンテナ内のスクロールでも層をずらす\n- requestAnimationFrame で目標のずれへなめらかにイージングし、GPU合成のため transform: translate3d を使う\n- 空の部分に見出しとボタンを重ねる\n- 昼/夜の切り替えで、トランジション付きで配色を変える\n- prefers-reduced-motion では動きを無効化\nHTML、CSS(またはTailwind)、素のJavaScriptで実装してください。',
      tips: [
        'スマホでは端末の傾き(ジャイロセンサー)で動かして',
        '漂う雲と、夜にはまたたく星を追加して',
        'JavaScriptの代わりにCSSのスクロール駆動アニメーションを使って',
      ],
    },
  },
};

export default meta;
