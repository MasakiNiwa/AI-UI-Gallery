import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'memory-match-game',
  category: 'games',
  tags: ['memory game', 'concentration', 'card flip', 'mini game', 'timer', 'best score'],
  difficulty: 'medium',
  tech: ['CSS 3D transform', 'localStorage', 'State machine'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Memory Match Game',
      summary:
        'Flip cards two at a time to find matching pairs, with a move counter, timer and best score.',
      description:
        'Memory match (or "Concentration") is a classic mini game and a great showcase of state, animation and feedback working together. Cards flip in 3D, matched pairs stay open with a small celebration, and mismatches flip back after a short delay. A move counter, timer and best score add motivation.\n\nThe game is a small state machine: idle, one card open, two cards open (input locked while checking), and won. The deck is shuffled with the Fisher–Yates algorithm, the best result is saved in localStorage, and cards are real buttons so the game is playable with the keyboard.',
      prompt:
        'Create a memory match card game.\n- A 4×4 grid of face-down cards (8 emoji pairs), shuffled with the Fisher–Yates algorithm\n- Clicking a card flips it in 3D (rotateY with backface-visibility); after two cards are open, keep them if they match (with a small bounce) or flip them back after 800ms; ignore clicks while checking\n- Show moves, an elapsed-time timer that starts on the first flip, and pairs found\n- When all pairs are found, show a "You won!" panel with the result and the best score (fewest moves) saved in localStorage\n- "New game" button reshuffles\n- Cards are buttons with labels ("Card 5, hidden" / "Card 5, 🐱") so the game works with the keyboard\nUse React and Tailwind CSS.',
      tips: [
        'Add difficulty levels with 4×3, 4×4 and 6×6 grids.',
        'Add a two-player mode that alternates turns.',
        'Use images from an API instead of emoji.',
      ],
    },
    ja: {
      name: '神経衰弱ゲーム',
      summary: 'カードを2枚ずつめくって同じ絵のペアを探す。手数・タイマー・ベストスコア付き。',
      description:
        '神経衰弱は定番のミニゲームで、状態・アニメーション・フィードバックが連携するよい見本になります。カードは3Dでめくれ、そろったペアは小さく弾んで開いたままになり、外れたペアは少し間を置いて裏返ります。手数・タイマー・ベストスコアがやる気を引き出します。\n\nゲームは小さな状態遷移でできています。待機、1枚めくった状態、2枚めくった状態(判定中は入力を止める)、クリアです。山札はフィッシャー–イェーツ法でシャッフルし、最高記録はlocalStorageに保存します。カードは本物のボタンなので、キーボードでも遊べます。',
      prompt:
        '神経衰弱のカードゲームを作ってください。\n- 裏向きのカードを4×4に並べる(絵文字8ペア)。フィッシャー–イェーツ法でシャッフル\n- カードをクリックすると3Dでめくれる(rotateY と backface-visibility)。2枚開いたら、一致すればそのまま(小さく弾ませる)、違えば800ms後に裏返す。判定中のクリックは無視\n- 手数、最初にめくった時点から始まる経過時間、見つけたペア数を表示\n- すべてそろったら結果とベストスコア(最少手数、localStorageに保存)を出す「クリア!」パネル\n- 「新しいゲーム」ボタンでシャッフルし直す\n- カードは「カード5、裏」/「カード5、🐱」のようなラベル付きのボタンにして、キーボードでも遊べるようにする\nReactとTailwind CSSで実装してください。',
      tips: [
        '4×3、4×4、6×6の難易度を追加して',
        '交代で遊ぶ2人対戦モードを追加して',
        '絵文字の代わりにAPIから取得した画像を使って',
      ],
    },
  },
};

export default meta;
