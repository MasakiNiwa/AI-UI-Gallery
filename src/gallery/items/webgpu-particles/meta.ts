import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'webgpu-particles',
  category: 'effects',
  tags: ['webgpu', 'compute shader', 'particles', 'gpu', 'wgsl', 'simulation'],
  difficulty: 'hard',
  tech: ['WebGPU', 'WGSL compute shader', 'GPU'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'WebGPU Particle Swarm',
      summary:
        '100,000 particles swirling around the pointer, simulated by a WebGPU compute shader.',
      description:
        'WebGPU is the modern successor to WebGL. Besides drawing, it can run general-purpose compute shaders on the GPU, which makes it possible to simulate huge numbers of objects in real time inside a browser.\n\nHere a compute shader updates the position and velocity of 100,000 particles every frame, attracting them toward the pointer with a swirl. The render pass then reads the same buffer directly to draw each particle as a soft additive dot, so the data never leaves the GPU. In browsers without WebGPU, the demo explains what is missing instead of failing.',
      prompt:
        'Create a WebGPU particle simulation with a compute shader (no libraries).\n- Check navigator.gpu; if unavailable, show a friendly fallback message\n- A storage buffer holds 100,000 particles (position and velocity as vec2f)\n- Compute shader (WGSL, workgroup size 64): each frame, attract particles toward the pointer with an added swirl (perpendicular force), apply damping, and wrap them at the screen edges\n- Render pipeline: draw each particle as an instanced quad that reads the same storage buffer in the vertex shader; color by speed from indigo to teal; soft round falloff in the fragment shader; additive blending\n- Uniform buffer with time, aspect ratio and pointer position; when idle, the attractor orbits the center\n- Handle resize and devicePixelRatio, show an FPS counter, and clean up on unmount\nUse TypeScript.',
      tips: [
        'Add a slider to change the particle count up to 1 million.',
        'Use a curl-noise flow field instead of a single attractor.',
        'Port it to three.js WebGPURenderer with TSL.',
      ],
    },
    ja: {
      name: 'WebGPUのパーティクルの群れ',
      summary:
        'ポインターのまわりで渦を巻く10万個のパーティクル。WebGPUのコンピュートシェーダーでシミュレーション。',
      description:
        'WebGPUはWebGLの後継となる新しいAPIです。描画だけでなく、汎用のコンピュートシェーダーをGPUで実行できるので、膨大な数の物体をブラウザ内でリアルタイムにシミュレーションできます。\n\nこのデモでは、コンピュートシェーダーが毎フレーム10万個のパーティクルの位置と速度を更新し、渦を巻きながらポインターへ引き寄せます。描画パスは同じバッファを直接読んで各パーティクルを柔らかな加算合成の点として描くため、データがGPUの外に出ることはありません。WebGPU非対応のブラウザでは、エラーにせず不足しているものを説明します。',
      prompt:
        'コンピュートシェーダーを使ったWebGPUのパーティクルシミュレーションを作ってください(ライブラリなし)。\n- navigator.gpu を確認し、使えない場合はわかりやすい代替メッセージを表示\n- ストレージバッファに10万個のパーティクル(位置と速度をvec2fで)を保持\n- コンピュートシェーダー(WGSL、ワークグループサイズ64):毎フレーム、渦(垂直方向の力)を加えながらパーティクルをポインターへ引き寄せ、減衰をかけ、画面端でループさせる\n- 描画パイプライン:頂点シェーダーで同じストレージバッファを読み、各パーティクルをインスタンス化した四角形で描く。速さに応じて藍色からティールに色付けし、フラグメントシェーダーで丸く柔らかく減衰させ、加算合成する\n- 時間・アスペクト比・ポインター位置を渡すユニフォームバッファ。操作がないときは引き寄せる点が中心のまわりを回る\n- リサイズと devicePixelRatio に対応し、FPSを表示し、アンマウント時に後片付けする\nTypeScriptで実装してください。',
      tips: [
        'スライダーでパーティクル数を100万個まで変えられるようにして',
        '1点への引力の代わりにカールノイズの流れ場にして',
        'three.jsのWebGPURendererとTSLに移植して',
      ],
    },
  },
};

export default meta;
