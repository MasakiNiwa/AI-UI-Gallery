import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'particle-text',
  category: 'effects',
  tags: ['particles', 'interactive text', 'repel', 'canvas', 'hero effect', 'physics'],
  difficulty: 'hard',
  tech: ['Canvas 2D', 'Typed arrays', 'requestAnimationFrame'],
  addedAt: '2026-10-22',
  text: {
    en: {
      name: 'Interactive Particle Text',
      summary:
        'Text made of thousands of particles that scatter away from the pointer and spring back into place.',
      description:
        'A striking hero effect: a word is drawn once to a hidden canvas, its pixels are sampled on a grid, and each sample becomes a particle that remembers its home position. Every frame, particles near the pointer are pushed away, then pulled back by a spring with damping, so the text bends and reforms like a fluid.\n\nPositions and velocities live in Float32Arrays, which keeps several thousand particles smooth at 60 fps without allocating objects. Typing a new word re-samples the text, and particles fly from where they are to their new homes. Colors follow a gradient across the word.',
      prompt:
        'Create an interactive particle text effect on a canvas.\n- Draw a word (editable via an input, default "HELLO") in a bold font on an offscreen canvas, sample its pixels every ~4px, and create one particle per filled sample with a home position\n- Each frame: particles within ~80px of the pointer are pushed away (force falls off with distance); a spring pulls them home with damping (e.g. v = (v + (home - p) * 0.06) * 0.85)\n- Store positions/velocities in Float32Arrays for performance; draw small squares with a horizontal color gradient\n- Changing the word re-samples and particles fly from their current positions to the new layout\n- Fit the text to the canvas width, handle resize and devicePixelRatio, and support touch\n- With prefers-reduced-motion, draw the text statically\nUse TypeScript and the Canvas 2D API.',
      tips: [
        'Make particles explode outward on click.',
        'Move the simulation to a Web Worker with OffscreenCanvas.',
        'Use an image or logo instead of text.',
      ],
    },
    ja: {
      name: 'インタラクティブなパーティクル文字',
      summary:
        '何千もの粒子でできた文字が、ポインターから逃げるように散り、ばねのように元の形に戻る。',
      description:
        '目を引くヒーロー向けのエフェクトです。単語を一度だけ見えないキャンバスに描き、そのピクセルを格子状にサンプリングして、各サンプルを「帰る位置」を覚えた粒子にします。毎フレーム、ポインターの近くの粒子は押しのけられ、減衰付きのばねで元の位置へ引き戻されるので、文字が流体のように曲がっては元に戻ります。\n\n位置と速度は Float32Array に保持し、オブジェクトを生成せずに数千個の粒子を60fpsでなめらかに動かします。新しい単語を入力すると文字を再サンプリングし、粒子は今いる場所から新しい位置へ飛んでいきます。色は単語全体にかかるグラデーションです。',
      prompt:
        'キャンバスでインタラクティブなパーティクル文字のエフェクトを作ってください。\n- 単語(入力欄で変更可能、初期値は "HELLO")を太字でオフスクリーンキャンバスに描き、約4pxごとにピクセルをサンプリングして、塗られた点ごとに「帰る位置」を持つ粒子を作る\n- 毎フレーム:ポインターから約80px以内の粒子を押しのけ(距離に応じて力は弱まる)、ばねで帰る位置へ引き戻して減衰させる(例:v = (v + (home - p) * 0.06) * 0.85)\n- 性能のため位置と速度は Float32Array に保持し、横方向のカラーグラデーションで小さな四角を描画\n- 単語を変えると再サンプリングし、粒子は現在位置から新しい配置へ飛んでいく\n- 文字をキャンバスの幅に合わせ、リサイズと devicePixelRatio に対応し、タッチにも対応\n- prefers-reduced-motion の場合は静止した文字を描画\nTypeScriptとCanvas 2D APIで実装してください。',
      tips: [
        'クリックで粒子が外へ弾け飛ぶようにして',
        'OffscreenCanvasを使ってシミュレーションをWeb Workerに移して',
        '文字の代わりに画像やロゴを使って',
      ],
    },
  },
};

export default meta;
