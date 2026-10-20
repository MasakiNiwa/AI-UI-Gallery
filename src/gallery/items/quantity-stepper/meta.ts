import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'quantity-stepper',
  category: 'inputs',
  tags: ['number input', 'stepper', 'quantity', 'cart', 'spin button', 'press and hold'],
  difficulty: 'easy',
  tech: ['ARIA spinbutton', 'Pointer events'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Quantity Stepper',
      summary:
        'Minus/plus buttons around a number field, with press-and-hold, limits and a live cart total.',
      description:
        'A quantity stepper adjusts a small number, such as items in a cart or guests in a booking, with large tap-friendly − and + buttons. Holding a button repeats the step and speeds up; the buttons disable at the minimum and maximum, and you can still type a number directly.\n\nThe field follows the ARIA spinbutton pattern (Up/Down arrows, Home/End, PageUp/PageDown for bigger steps). Changing the quantity updates the line total and the cart summary right away, with a subtle animation so the change is noticed.',
      prompt:
        'Create a shopping cart with quantity steppers.\n- Each line item: thumbnail, name, unit price, and a stepper with − / number / + buttons\n- The number field is typeable and clamps to 0–20 on blur; the − button removes the item (with confirm) when it would go below 1\n- Press and hold +/− to repeat, accelerating after 500ms\n- Disable buttons at the limits and show a small "Max 20" hint\n- Keyboard: Up/Down, PageUp/PageDown (±5), Home/End on the field (role="spinbutton" with aria-valuenow/min/max)\n- Subtotal, shipping (free over $50) and total update instantly with a short highlight animation\n- Format prices with Intl.NumberFormat\nUse React and Tailwind CSS.',
      tips: [
        'Animate the number change with a vertical slide.',
        'Persist the cart in localStorage.',
        'Show a toast with Undo when an item is removed.',
      ],
    },
    ja: {
      name: '数量ステッパー',
      summary: '数値欄の左右に−/+ボタン。長押し、上限・下限、合計金額のリアルタイム更新付き。',
      description:
        '数量ステッパーは、カートの商品数や予約の人数のような小さな数を、押しやすい大きな−と+のボタンで調整するUIです。ボタンを押し続けると連続で増減し、だんだん速くなります。最小・最大でボタンは無効になり、数値を直接入力することもできます。\n\n数値欄はARIAのspinbuttonのパターンに従います(上下の矢印、Home/End、PageUp/PageDownで大きく増減)。数量を変えると行の小計とカートの合計がすぐに更新され、控えめなアニメーションで変化に気づけるようにします。',
      prompt:
        '数量ステッパー付きのショッピングカートを作ってください。\n- 各商品の行:サムネイル、商品名、単価、− / 数値 / + のステッパー\n- 数値欄は入力でき、フォーカスが外れたら0〜20に収める。1未満になる−操作では(確認のうえ)商品を削除\n- +/−を長押しすると連続で増減し、500ms後から加速\n- 上限・下限ではボタンを無効化し、小さく「最大20」と表示\n- キーボード:上下、PageUp/PageDown(±5)、Home/End(role="spinbutton" と aria-valuenow/min/max)\n- 小計、送料($50以上で無料)、合計を即座に更新し、短い強調アニメーションを付ける\n- 価格は Intl.NumberFormat で整形\nReactとTailwind CSSで実装してください。',
      tips: [
        '数値の変化を縦にスライドするアニメーションにして',
        'カートをlocalStorageに保存して',
        '商品を削除したら「元に戻す」付きのトーストを出して',
      ],
    },
  },
};

export default meta;
