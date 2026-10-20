import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'worker-particles',
  category: 'effects',
  tags: ['particles', 'constellation', 'canvas', 'web worker', 'offscreencanvas', 'background'],
  difficulty: 'hard',
  tech: ['Web Worker', 'OffscreenCanvas', 'Canvas 2D'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Constellation Particles in a Web Worker',
      summary:
        'Drifting particles linked by lines, drawn in a Web Worker so the animation never blocks the page.',
      description:
        'A constellation (or "particle network") background shows dots drifting slowly and connecting with faint lines when they come close. Moving the pointer attracts nearby particles.\n\nHere the drawing does not happen on the main thread at all: the canvas is handed to a Web Worker with transferControlToOffscreen(), and the worker runs the simulation and rendering loop. Press "Block main thread" to freeze the page for 1.5 seconds; the particles keep moving. When OffscreenCanvas is unavailable, the same code runs on the main thread as a fallback.',
      prompt:
        'Create an interactive "constellation" particle background rendered in a Web Worker.\n- About 140 particles drift slowly; draw a line between two particles when they are closer than 110px, with opacity based on distance\n- Particles are gently attracted to the mouse/touch position\n- Transfer the canvas to a Web Worker with canvas.transferControlToOffscreen() and run the requestAnimationFrame loop inside the worker\n- Send resize, pointer and theme (light/dark color) messages from the main thread\n- Show the current FPS reported by the worker\n- Add a button that blocks the main thread for 1.5 s to prove the animation keeps running\n- Fall back to the main thread if OffscreenCanvas is not supported\n- Respect prefers-reduced-motion (render one still frame)\nUse TypeScript and Vite.',
      tips: [
        'Use a spatial grid to support thousands of particles.',
        'Render with WebGL inside the worker for even more particles.',
        'Use Comlink to simplify messaging with the worker.',
      ],
    },
    ja: {
      name: 'Web Workerで描く星座パーティクル',
      summary:
        '漂う点が線でつながるパーティクル。Web Worker内で描画するので、ページの動作を妨げない。',
      description:
        '星座(パーティクルネットワーク)風の背景は、ゆっくり漂う点同士が近づくと淡い線でつながる表現です。ポインターを動かすと、近くの点が引き寄せられます。\n\nこのデモでは、描画をメインスレッドでは一切行っていません。transferControlToOffscreen() でキャンバスをWeb Workerに渡し、シミュレーションと描画のループをWorker内で回しています。「メインスレッドを止める」を押すとページが1.5秒固まりますが、パーティクルは動き続けます。OffscreenCanvasが使えない環境では、同じコードがメインスレッドで動きます。',
      prompt:
        'Web Workerで描画する、インタラクティブな「星座」パーティクル背景を作ってください。\n- 約140個の点がゆっくり漂い、2点の距離が110px未満なら線で結ぶ(距離に応じて透明度を変える)\n- 点はマウス/タッチの位置にゆるやかに引き寄せられる\n- canvas.transferControlToOffscreen() でキャンバスをWeb Workerに渡し、requestAnimationFrame のループをWorker内で実行\n- メインスレッドからは、リサイズ・ポインター・テーマ(ライト/ダークの色)をメッセージで送る\n- Workerから報告される現在のFPSを表示\n- メインスレッドを1.5秒止めるボタンを用意し、アニメーションが止まらないことを確認できるようにする\n- OffscreenCanvas非対応の場合はメインスレッドで代替\n- prefers-reduced-motion では静止した1フレームだけ描く\nTypeScriptとViteで実装してください。',
      tips: [
        '空間グリッドを使って数千個のパーティクルに対応して',
        'Worker内でWebGLを使ってさらに多くのパーティクルを描いて',
        'Comlinkを使ってWorkerとのやりとりを簡単にして',
      ],
    },
  },
};

export default meta;
