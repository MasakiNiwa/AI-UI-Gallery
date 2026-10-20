import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'flip-clock-countdown',
  category: 'animation',
  tags: ['countdown', 'flip clock', 'timer', 'launch', 'split flap', '3d flip'],
  difficulty: 'hard',
  tech: ['CSS 3D transform', 'Timers'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Flip Clock Countdown',
      summary:
        'A retro split-flap countdown to a launch date, where each digit flips down in 3D as it changes.',
      description:
        'A flip clock imitates the split-flap displays of old airport boards and alarm clocks: each digit is printed on two halves, and when it changes, the top half flips down to reveal the next number. As a countdown it builds excitement for launches, sales and events.\n\nEach digit card has four layers: static top and bottom halves of the new and old values, plus two animated flaps that rotate around the horizontal middle line with rotateX and backface-visibility. A timer recomputes the remaining days, hours, minutes and seconds every second.',
      prompt:
        'Create a flip-clock style countdown to a launch date.\n- Units: Days, Hours, Minutes, Seconds, each with two digit cards and a label\n- Each digit card is split horizontally; when the digit changes, the top half of the old value flips down (rotateX from 0 to -90deg) and the bottom half of the new value flips into place (90deg to 0), using perspective and backface-visibility: hidden\n- A thin dark line across the middle and subtle shadows for depth\n- Update every second from the remaining time; when it reaches zero show "We are live!"\n- Expose the time to screen readers with an aria-live region updated once per minute (not every second)\n- Respect prefers-reduced-motion (change digits without flipping)\nUse React and CSS.',
      tips: [
        'Add a ticking sound that can be muted.',
        "Show the target date in the visitor's time zone.",
        'Turn it into a real-time clock instead of a countdown.',
      ],
    },
    ja: {
      name: 'フリップ時計のカウントダウン',
      summary: 'リリース日までのレトロなパタパタ式カウントダウン。数字が変わるたびに3Dでめくれる。',
      description:
        'フリップ時計は、昔の空港の発着案内板や目覚まし時計のパタパタ式表示を模したものです。各数字は上下2枚に分かれて印刷されていて、数字が変わると上半分が倒れて次の数字が現れます。カウントダウンにすると、リリース・セール・イベントへの期待感を高められます。\n\n数字カードは4つの層でできています。新旧の値の静止した上半分・下半分と、中央の横線を軸に rotateX と backface-visibility で回転する2枚のめくれ板です。タイマーで毎秒、残りの日・時・分・秒を計算し直します。',
      prompt:
        'リリース日までのフリップ時計風のカウントダウンを作ってください。\n- 単位:日・時・分・秒。それぞれ2枚の数字カードとラベル\n- 各数字カードは上下に分割し、数字が変わると、古い値の上半分が倒れ(rotateX 0から-90deg)、新しい値の下半分が起き上がる(90degから0)。perspective と backface-visibility: hidden を使う\n- 中央に細い暗い線と、奥行きを出す控えめな影\n- 残り時間から毎秒更新し、0になったら「公開しました!」を表示\n- スクリーンリーダーには、毎秒ではなく1分ごとに更新する aria-live 領域で時間を伝える\n- prefers-reduced-motion ではめくらずに数字を切り替える\nReactとCSSで実装してください。',
      tips: [
        'ミュートできるチクタク音を追加して',
        '目標日時を訪問者のタイムゾーンで表示して',
        'カウントダウンではなくリアルタイムの時計にして',
      ],
    },
  },
};

export default meta;
