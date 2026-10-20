import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'bottom-sheet',
  category: 'feedback',
  tags: ['bottom sheet', 'drawer', 'mobile', 'snap points', 'drag', 'maps'],
  difficulty: 'hard',
  tech: ['Pointer events', 'Velocity-based snapping'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Draggable Bottom Sheet',
      summary:
        'A mobile-style sheet that you drag up and down between snap points, like in map apps.',
      description:
        'A bottom sheet slides up from the bottom edge to show extra content while keeping the main screen partly visible, as in map and ride-hailing apps. Users drag its handle to choose a height; on release it snaps to the nearest snap point (peek, half, full), and a fast flick jumps in the flick direction.\n\nDragging follows the finger 1:1 using pointer events with pointer capture; on release, the release velocity and position pick the target snap point, and a CSS transition animates the rest. The backdrop dims as the sheet rises, and the handle is a button with keyboard support for accessibility.',
      prompt:
        'Create a draggable bottom sheet for a map-style app.\n- A full-screen background (map placeholder) and a sheet with a grab handle, title and a scrollable list of places\n- Three snap points: peek (15%), half (50%) and full (90% of the container height)\n- Drag the handle or header with pointer events (setPointerCapture); the sheet follows the finger 1:1 with no transition while dragging\n- On release, snap to the nearest point; if the release velocity is high, snap in the flick direction; animate with a spring-like cubic-bezier\n- Dim the background proportionally to the height; tapping the backdrop returns to peek\n- The list scrolls only when the sheet is at full height\n- The handle is a button: Enter cycles snap points, arrow keys move between them\nUse React and Tailwind CSS (or the Vaul library).',
      tips: [
        'Add rubber-band resistance past the top and bottom.',
        'Close the sheet completely when flicked down from peek.',
        'Use it as a mobile replacement for dialogs on narrow screens.',
      ],
    },
    ja: {
      name: 'ドラッグできるボトムシート',
      summary: '地図アプリのように、上下にドラッグしてスナップ位置の間を動かせるスマホ風のシート。',
      description:
        'ボトムシートは、画面の下端からせり上がって追加の内容を表示しつつ、メイン画面も一部見えたままにするUIで、地図アプリや配車アプリでおなじみです。ハンドルをドラッグして高さを選ぶと、離したときに最も近いスナップ位置(のぞき見・半分・全画面)に吸い付き、すばやくはじくとその方向へ移動します。\n\nドラッグ中はポインターキャプチャ付きのポインターイベントで指に1:1で追従させ、離した瞬間の速さと位置から目標のスナップ位置を決め、残りの動きはCSSトランジションで付けます。シートが上がるほど背景を暗くし、アクセシビリティのためハンドルはキーボードでも操作できるボタンにします。',
      prompt:
        '地図アプリ風の、ドラッグできるボトムシートを作ってください。\n- 全画面の背景(地図の仮置き)と、つまみ・タイトル・スクロールできる場所の一覧を持つシート\n- 3つのスナップ位置:のぞき見(15%)、半分(50%)、全画面(コンテナの高さの90%)\n- つまみかヘッダーをポインターイベント(setPointerCapture)でドラッグ。ドラッグ中はトランジションなしで指に1:1で追従\n- 離したら最も近い位置にスナップ。離した瞬間の速さが大きい場合は、はじいた方向の位置にスナップ。バネのような cubic-bezier でアニメーション\n- 高さに応じて背景を暗くし、背景をタップするとのぞき見の位置に戻る\n- 一覧は全画面の高さのときだけスクロールできる\n- つまみはボタンにし、Enterでスナップ位置を順に切り替え、矢印キーで位置を移動\nReactとTailwind CSS(またはVaulライブラリ)で実装してください。',
      tips: [
        '上下の端を越えたときにゴムのような抵抗を付けて',
        'のぞき見の位置から下にはじいたら完全に閉じるようにして',
        '狭い画面ではダイアログの代わりに使えるようにして',
      ],
    },
  },
};

export default meta;
