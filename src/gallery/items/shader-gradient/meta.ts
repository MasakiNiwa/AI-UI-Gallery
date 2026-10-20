import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'shader-gradient',
  category: 'effects',
  tags: ['webgl', 'shader', 'gradient', 'mesh gradient', 'hero background', 'gpu'],
  difficulty: 'hard',
  tech: ['WebGL', 'GLSL', 'GPU'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Animated Shader Gradient',
      summary:
        'A flowing, organic gradient background rendered on the GPU with a WebGL fragment shader.',
      description:
        'Animated "mesh" or "aurora" gradients are a popular hero background. Drawing them with a fragment shader means the GPU computes every pixel in parallel, so the animation stays smooth even at full screen while the CPU stays free.\n\nThe shader layers a few sine-based noise functions over the screen coordinates and time, then mixes a small palette of colors. The pointer gently bends the flow. The canvas renders at a reduced resolution and is upscaled, which is invisible for soft gradients but saves a lot of GPU work.',
      prompt:
        'Create a full-screen animated gradient background using a WebGL fragment shader (no libraries).\n- Draw a single full-screen triangle; all work happens in the fragment shader\n- Combine layered sine/noise functions of UV coordinates and time to create slowly flowing, organic color bands\n- Blend 4 calm colors (deep navy, indigo, teal, soft rose) passed in as uniforms\n- The mouse position gently distorts the flow\n- Render at half resolution for performance and resize with a ResizeObserver\n- Pause when the canvas is off-screen or the tab is hidden; respect prefers-reduced-motion with a still frame\n- Fall back to a CSS gradient if WebGL is unavailable\n- Overlay a hero title on top\nUse TypeScript.',
      tips: [
        'Add film grain noise on top for texture.',
        'Port it to Three.js or React Three Fiber.',
        'Let the user pick the palette with color inputs.',
      ],
    },
    ja: {
      name: 'アニメーションするシェーダーグラデーション',
      summary: 'WebGLのフラグメントシェーダーを使い、GPUで描く有機的に流れるグラデーション背景。',
      description:
        '流れるような「メッシュ」「オーロラ」風のグラデーションは、ヒーローセクションの背景として人気があります。フラグメントシェーダーで描くと、全ピクセルをGPUが並列に計算するため、全画面でも滑らかに動き、CPUにも負担をかけません。\n\nシェーダーでは、画面座標と時間を入力にしたサイン波ベースのノイズを何層か重ね、少数の色を混ぜ合わせます。ポインターの位置で流れがゆるやかに曲がります。キャンバスは低めの解像度で描いて拡大表示しており、柔らかいグラデーションなら見た目はほぼ変わらず、GPUの負荷を大きく減らせます。',
      prompt:
        'WebGLのフラグメントシェーダーで、全画面のアニメーションするグラデーション背景を作ってください(ライブラリなし)。\n- 画面全体を覆う三角形を1枚描き、処理はすべてフラグメントシェーダーで行う\n- UV座標と時間を使ったサイン波やノイズを重ね、ゆっくり流れる有機的な色の帯を作る\n- 落ち着いた4色(深い紺、藍、ティール、淡いローズ)をuniformで渡して混ぜる\n- マウスの位置で流れがゆるやかに歪む\n- パフォーマンスのため半分の解像度で描画し、ResizeObserverでリサイズに対応\n- キャンバスが画面外のときやタブが非表示のときは停止。prefers-reduced-motion では静止画にする\n- WebGLが使えない環境ではCSSグラデーションで代替\n- 上にヒーローのタイトルを重ねる\nTypeScriptで実装してください。',
      tips: [
        '質感を出すためにフィルムグレインのノイズを重ねて',
        'Three.jsやReact Three Fiberに移植して',
        'カラーピッカーで配色を選べるようにして',
      ],
    },
  },
};

export default meta;
