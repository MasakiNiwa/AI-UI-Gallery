import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'tilt-card',
  category: 'cards',
  tags: ['3d', 'tilt', 'parallax', 'hover', 'glare'],
  difficulty: 'medium',
  tech: ['CSS 3D transform', 'Pointer events'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: '3D Tilt Card',
      summary: 'A card that tilts toward the pointer in 3D, with a moving light glare.',
      description:
        'A tilt card rotates slightly around the X and Y axes depending on where the pointer is, as if you were holding a physical card. A radial gradient "glare" follows the pointer to sell the illusion of light reflecting off the surface.\n\nIt uses CSS perspective and rotateX/rotateY transforms, updated from pointer events. Inner layers can use translateZ for a parallax depth effect. The card eases back to flat when the pointer leaves.',
      prompt:
        'Create a 3D tilt card effect like a holographic trading card.\n- The card rotates up to 15 degrees toward the pointer using perspective and rotateX/rotateY\n- A radial gradient glare follows the pointer position\n- Inner content (title, image) uses translateZ for parallax depth\n- Smoothly returns to flat when the pointer leaves\n- Works with touch (drag on the card)\n- Disable the effect when prefers-reduced-motion is set\n- Use requestAnimationFrame for updates\nUse HTML, CSS and vanilla JavaScript.',
      tips: [
        'Add a rainbow holographic foil effect.',
        'Use the device gyroscope on phones.',
        'Make a grid of tilt cards for a portfolio.',
      ],
    },
    ja: {
      name: '3Dチルトカード',
      summary: 'ポインターの方向に立体的に傾き、光の反射が動くカード。',
      description:
        'チルトカードは、ポインターの位置に応じてX軸・Y軸まわりに少し回転し、まるで手に持ったカードを傾けているように見せるUIです。ポインターを追いかける放射状グラデーションの「グレア(反射光)」を重ねることで、表面に光が反射しているような錯覚を強めます。\n\nCSSの perspective と rotateX/rotateY をポインターイベントから更新して実現します。内側の要素に translateZ を使うと、視差による奥行きも表現できます。ポインターが離れると、なめらかに平らな状態へ戻ります。',
      prompt:
        'ホログラムのトレーディングカードのような3Dチルトカードを作ってください。\n- perspective と rotateX/rotateY を使い、ポインターの方向へ最大15度傾く\n- ポインターの位置に放射状グラデーションのグレアが追従する\n- 内側の要素(タイトル・画像)は translateZ で視差の奥行きを出す\n- ポインターが離れたらなめらかに平らに戻る\n- タッチ操作(カード上でドラッグ)にも対応\n- prefers-reduced-motion が設定されている場合は効果を無効化\n- 更新には requestAnimationFrame を使う\nHTML・CSS・素のJavaScriptで実装してください。',
      tips: [
        '虹色のホログラム箔のエフェクトを追加して',
        'スマホではジャイロセンサーで傾くようにして',
        'ポートフォリオ用にチルトカードをグリッドで並べて',
      ],
    },
  },
};

export default meta;
