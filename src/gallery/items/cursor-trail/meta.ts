import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'cursor-trail',
  category: 'effects',
  tags: ['cursor', 'trail', 'mouse follower', 'canvas', 'ribbon', 'interactive'],
  difficulty: 'medium',
  tech: ['Canvas 2D', 'Spring physics'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Cursor Ribbon Trail',
      summary: 'A glowing ribbon that smoothly follows the cursor or finger, fading out behind it.',
      description:
        'A cursor trail draws a flowing line that follows the pointer, adding a playful, premium feel to hero sections and portfolios. Here a chain of points chases the pointer with spring-like easing, and a tapering, glowing ribbon is drawn through them, fading toward the tail.\n\nThe points are updated every animation frame (each follows the previous one with a fraction of the distance), and the ribbon is stroked on a canvas with additive "lighter" blending for the glow. When the pointer stops, the trail catches up and gracefully shrinks to a point.',
      prompt:
        'Create a glowing ribbon cursor trail on a dark canvas.\n- Keep a chain of 40 points; each frame, the first point eases toward the pointer and every other point eases toward the previous one (spring-like follow)\n- Draw a smooth line through the points whose width tapers from 14px at the head to 0 at the tail, with a gradient from cyan to violet and fading opacity\n- Use globalCompositeOperation = "lighter" and a shadowBlur for a neon glow\n- Works with mouse and touch (pointer events); when idle, the trail drifts in a slow figure-eight\n- Scale for devicePixelRatio and handle resize\n- Hide on prefers-reduced-motion\nUse a <canvas> and vanilla JavaScript.',
      tips: [
        'Spawn sparkles that fall from the trail.',
        'Change the color based on the pointer speed.',
        'Render it with WebGL for thousands of particles.',
      ],
    },
    ja: {
      name: 'カーソルを追うリボン',
      summary: 'カーソルや指をなめらかに追いかけ、後ろに向かって消えていく光るリボン。',
      description:
        'カーソルトレイルは、ポインターを追いかける流れるような線を描く表現で、ヒーローセクションやポートフォリオに遊び心と上質さを加えます。このデモでは、点の列がバネのようなイージングでポインターを追いかけ、その点を通る、先細りで光るリボンを描いています。尾に近いほど薄くなります。\n\n点は毎フレーム更新し(各点が1つ前の点へ距離の一部だけ近づく)、リボンはキャンバスに加算合成("lighter")で描いて光らせます。ポインターが止まると、軌跡が追いついて優雅に1点へ縮んでいきます。',
      prompt:
        '暗いキャンバス上に、カーソルを追う光るリボンを作ってください。\n- 40個の点の列を持ち、毎フレーム、先頭の点はポインターへ、他の点は1つ前の点へイージングで近づく(バネのような追従)\n- 点を通るなめらかな線を描き、太さは先頭14pxから尾の0pxへ先細りにし、シアンから紫へのグラデーションで、不透明度もフェードさせる\n- globalCompositeOperation = "lighter" と shadowBlur でネオンのような光にする\n- マウスとタッチに対応(ポインターイベント)。操作がないときは、軌跡がゆっくり8の字を描いて漂う\n- devicePixelRatio に合わせて拡大し、リサイズにも対応\n- prefers-reduced-motion では非表示\n<canvas> と素のJavaScriptで実装してください。',
      tips: [
        '軌跡からキラキラが落ちるようにして',
        'ポインターの速さに応じて色を変えて',
        'WebGLで描いて数千個のパーティクルにして',
      ],
    },
  },
};

export default meta;
