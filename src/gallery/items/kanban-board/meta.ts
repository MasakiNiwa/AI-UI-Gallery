import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'kanban-board',
  category: 'layout',
  tags: ['kanban', 'drag and drop', 'task board', 'trello', 'columns'],
  difficulty: 'hard',
  tech: ['Pointer events', 'Drag and drop'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Kanban Board',
      summary:
        'Task cards you can drag between columns (To do, In progress, Done), with mouse or touch.',
      description:
        'A kanban board visualizes work as cards moving through columns that represent stages. Dragging a card to another column changes its status; column headers show counts, and a placeholder shows where the card will land.\n\nThis demo implements dragging with pointer events instead of the HTML5 drag-and-drop API, so it also works on touch screens: the card follows the pointer as a floating "ghost", the column under the pointer is detected with elementFromPoint, and the card is inserted on release. Each card also has a menu-free keyboard alternative: focused cards move with arrow keys.',
      prompt:
        'Build a kanban task board with drag and drop.\n- Three columns: To do, In progress, Done, each with a header, a count badge and an "Add card" button\n- Cards show a title, a colored label and an assignee avatar\n- Drag cards within and between columns using pointer events (works with mouse and touch); show a floating ghost card that follows the pointer, a placeholder gap where it will drop, and highlight the target column\n- Keyboard alternative: focus a card and use Left/Right to move it between columns and Up/Down to reorder; announce moves in an aria-live region\n- Persist the board in localStorage\nUse React and Tailwind CSS (or dnd-kit).',
      tips: [
        'Add WIP limits that warn when a column has too many cards.',
        'Allow reordering the columns themselves.',
        'Sync the board in real time between browser tabs.',
      ],
    },
    ja: {
      name: 'カンバンボード',
      summary:
        'タスクのカードを列(未着手・進行中・完了)の間でドラッグできるボード。マウスにもタッチにも対応。',
      description:
        'カンバンボードは、作業をカードとして表し、工程を表す列の間を移動させて見える化するUIです。カードを別の列にドラッグするとその状態が変わり、列の見出しには件数を表示し、置かれる位置をプレースホルダーで示します。\n\nこのデモでは、HTML5のドラッグ&ドロップAPIではなくポインターイベントでドラッグを実装しているため、タッチ画面でも動きます。カードは浮かんだ「ゴースト」としてポインターを追いかけ、ポインターの下の列を elementFromPoint で判定し、離したときにカードを挿入します。キーボードでも、フォーカスしたカードを矢印キーで動かせます。',
      prompt:
        'ドラッグ&ドロップできるカンバン形式のタスクボードを作ってください。\n- 3つの列:未着手、進行中、完了。それぞれに見出し、件数バッジ、「カードを追加」ボタン\n- カードにはタイトル、色付きラベル、担当者のアバター\n- ポインターイベントで、列の中や列の間でカードをドラッグできる(マウスとタッチの両方に対応)。ポインターを追いかけるゴーストカード、置かれる位置の隙間、対象の列の強調を表示\n- キーボードでの代替操作:カードにフォーカスし、左右で列を移動、上下で並べ替え。移動は aria-live 領域で読み上げる\n- ボードの状態をlocalStorageに保存\nReactとTailwind CSS(またはdnd-kit)で実装してください。',
      tips: [
        '列のカードが多すぎると警告するWIP制限を追加して',
        '列そのものも並べ替えられるようにして',
        'ブラウザのタブ間でボードをリアルタイムに同期して',
      ],
    },
  },
};

export default meta;
