import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'like-button',
  category: 'buttons',
  tags: ['like', 'heart', 'favorite', 'burst', 'toggle button', 'micro-interaction'],
  difficulty: 'medium',
  tech: ['CSS animation', 'aria-pressed'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Animated Like Button',
      summary: 'A heart that pops and bursts into small particles when you like something.',
      description:
        'A like button is a toggle: pressing it marks an item as liked and updates a counter. A short, satisfying animation (the heart scales up with a bounce while small dots burst outward) rewards the action and makes the state change obvious, as popularized by social networks.\n\nThe button should expose its state with aria-pressed, and the counter should update optimistically, immediately on click, before any server response.',
      prompt:
        'Create an animated "like" toggle button with a heart icon and a counter.\n- Clicking toggles liked / not liked; use aria-pressed\n- When liked: the heart fills with red, scales up with a bouncy keyframe animation, and 8 small colored dots burst outward in a circle and fade\n- A ring expands behind the heart\n- The counter increments/decrements with a small vertical slide animation\n- Unliking has a simple shrink animation without the burst\n- Respect prefers-reduced-motion\nUse React and CSS keyframes.',
      tips: [
        'Add a double-tap-to-like gesture on an image.',
        'Make the particles random colors and distances.',
        'Show a tooltip with the names of people who liked it.',
      ],
    },
    ja: {
      name: 'アニメーションするいいねボタン',
      summary: '押すとハートが弾み、小さな粒が飛び散る「いいね」ボタン。',
      description:
        'いいねボタンはトグル(切り替え)ボタンで、押すとその項目に「いいね」が付き、カウンターが増えます。ハートが弾むように大きくなり、小さな点が周囲に飛び散る短く気持ちのいいアニメーションは、操作へのご褒美になり、状態が変わったこともはっきり伝えます。SNSで広く知られるようになった表現です。\n\nボタンの状態は aria-pressed で示し、カウンターはサーバーの応答を待たずにクリックした瞬間に更新(楽観的更新)します。',
      prompt:
        'ハートのアイコンとカウンターを持つ、アニメーション付きの「いいね」トグルボタンを作ってください。\n- クリックでいいね/解除を切り替え、aria-pressed を使う\n- いいねしたとき:ハートが赤く塗られ、弾むキーフレームアニメーションで拡大し、色付きの小さな点8個が円状に飛び散ってフェードする\n- ハートの背後でリングが広がる\n- カウンターは縦方向に少しスライドするアニメーションで増減する\n- 解除時は飛び散りなしで、少し縮むだけのアニメーション\n- prefers-reduced-motion に配慮する\nReactとCSSキーフレームで実装してください。',
      tips: [
        '画像をダブルタップしていいねできるようにして',
        '粒の色と飛ぶ距離をランダムにして',
        'いいねした人の名前をツールチップで表示して',
      ],
    },
  },
};

export default meta;
