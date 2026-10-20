import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'swipe-cards',
  category: 'cards',
  tags: ['swipe', 'tinder', 'card stack', 'gesture', 'like dislike', 'drag'],
  difficulty: 'hard',
  tech: ['Pointer events', 'CSS transform'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Swipeable Card Stack',
      summary:
        'A stack of cards you fling left or right to pass or like, with rotation and stamps while dragging.',
      description:
        'The swipe card stack, made famous by dating apps, is a fun way to make quick yes/no decisions on one item at a time: recipes, products, flashcards or candidates. Dragging the top card tilts it, and a "LIKE" or "NOPE" stamp fades in depending on the direction. Releasing past a threshold (or with a fast flick) throws the card off screen; otherwise it springs back.\n\nThe card follows the pointer with translate and a rotation proportional to the horizontal offset. The cards underneath are slightly scaled down and move up as the top card leaves. Buttons provide an accessible alternative to the gesture, and Undo brings back the last card.',
      prompt:
        'Create a swipeable card stack for a recipe app.\n- Show 3 stacked cards (the ones below slightly smaller and offset)\n- Drag the top card with pointer events: it follows the pointer, rotates proportionally to the horizontal offset (max 15°), and a green "LIKE" or red "NOPE" stamp fades in\n- Release beyond 30% of the width (or with a fast flick) to throw the card off screen in that direction; otherwise spring back\n- Like / Nope / Undo buttons below as an accessible alternative, plus Left/Right arrow keys\n- When a card leaves, the next cards animate up into place\n- Show an empty state with a "Start over" button when all cards are gone\nUse React and Tailwind CSS.',
      tips: [
        'Add swipe up for "Super like".',
        'Show a summary of liked items at the end.',
        'Use Framer Motion for the drag physics.',
      ],
    },
    ja: {
      name: 'スワイプできるカードの山',
      summary:
        '左右にはじいて「パス」か「いいね」を選ぶカードの山。ドラッグ中は傾き、スタンプが表示される。',
      description:
        'スワイプカードは、マッチングアプリで有名になった、1件ずつ「はい/いいえ」をすばやく決めていく楽しいUIです。レシピ・商品・単語カード・候補者選びなどに使えます。一番上のカードをドラッグすると傾き、方向に応じて「LIKE」か「NOPE」のスタンプが浮かび上がります。しきい値を越えて離す(またはすばやくはじく)とカードは画面外へ飛んでいき、そうでなければ元に戻ります。\n\nカードは translate でポインターに追従し、横方向のずれに比例して回転します。下のカードは少し小さく表示し、上のカードがなくなると繰り上がります。ジェスチャーの代わりに使えるボタンを用意し、「元に戻す」で直前のカードを戻せるようにします。',
      prompt:
        'レシピアプリ用の、スワイプできるカードの山を作ってください。\n- 3枚のカードを重ねて表示(下のカードは少し小さくずらす)\n- 一番上のカードをポインターイベントでドラッグ:ポインターに追従し、横方向のずれに比例して回転(最大15°)し、緑の「LIKE」か赤の「NOPE」のスタンプがフェードインする\n- 幅の30%を越えて離す(またはすばやくはじく)と、その方向へカードを画面外に飛ばす。そうでなければバネのように戻す\n- アクセシブルな代替手段として、下に「いいね」「パス」「元に戻す」ボタン。左右の矢印キーにも対応\n- カードがなくなると、次のカードがアニメーションで繰り上がる\n- すべてのカードがなくなったら「最初から」ボタン付きの空状態を表示\nReactとTailwind CSSで実装してください。',
      tips: [
        '上にスワイプで「スーパーいいね」を追加して',
        '最後にいいねした項目のまとめを表示して',
        'ドラッグの物理挙動にFramer Motionを使って',
      ],
    },
  },
};

export default meta;
