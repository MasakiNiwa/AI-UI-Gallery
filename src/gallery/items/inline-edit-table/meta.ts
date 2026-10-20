import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'inline-edit-table',
  category: 'data',
  tags: ['inline editing', 'editable table', 'spreadsheet', 'click to edit', 'optimistic update'],
  difficulty: 'medium',
  tech: ['Focus management', 'Optimistic UI'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Inline Editable Table',
      summary:
        'Click a cell to edit it in place; Enter saves, Escape cancels, with validation and a saving indicator.',
      description:
        'Inline editing lets users change values right where they read them, without opening a separate form. Clicking (or pressing Enter on) a cell turns it into an input of the right type, such as a text field, number or select; Enter or leaving the cell saves, and Escape cancels.\n\nSaving is optimistic: the new value appears immediately while a small spinner shows the request in flight, and if the (simulated) server rejects it, the old value is restored with an error message. Invalid input is caught before saving, and the edited cell keeps keyboard focus so users can move on quickly.',
      prompt:
        'Create an inline-editable table of products.\n- Columns: name (text), price (number), stock (number), status (select: Active/Draft/Archived)\n- Click a cell, or focus it and press Enter, to edit in place with the matching input type; Enter or blur saves, Escape cancels; Tab moves to the next editable cell\n- Validate: name required, price ≥ 0, stock integer; show an inline error and keep the editor open\n- Optimistic save: show the new value immediately with a small spinner; simulate a request that fails 20% of the time and roll back with a toast on failure\n- A subtle pencil icon appears on hover to show the cell is editable\nUse React and Tailwind CSS.',
      tips: [
        'Add multi-row selection and bulk editing.',
        'Use TanStack Table with editable cell components.',
        'Add undo for the last edit.',
      ],
    },
    ja: {
      name: 'その場で編集できる表',
      summary:
        'セルをクリックするとその場で編集。Enterで保存、Escで取り消し。入力チェックと保存中表示付き。',
      description:
        'インライン編集は、別のフォームを開かずに、値を見ているその場で変更できるUIです。セルをクリック(またはEnter)すると、テキスト・数値・選択肢など値に合った入力欄に変わり、Enterか他の場所へ移ると保存、Escで取り消します。\n\n保存は楽観的更新で、新しい値をすぐに表示しつつ小さなスピナーで通信中であることを示します。(模擬の)サーバーが拒否した場合は元の値に戻し、エラーを表示します。不正な入力は保存前に検出し、編集したセルにキーボードフォーカスを残すので、すばやく次の作業に移れます。',
      prompt:
        '商品の一覧を、その場で編集できる表として作ってください。\n- 列:名前(テキスト)、価格(数値)、在庫(数値)、状態(選択:公開・下書き・アーカイブ)\n- セルをクリック、またはフォーカスしてEnterで、値に合った入力欄でその場編集。Enterかフォーカスが外れたら保存、Escで取り消し、Tabで次の編集可能なセルへ\n- 入力チェック:名前は必須、価格は0以上、在庫は整数。エラーはその場に表示し、編集欄は開いたまま\n- 楽観的な保存:新しい値をすぐに表示して小さなスピナーを出す。20%の確率で失敗する通信を模擬し、失敗したらトーストを出して元に戻す\n- ホバー時に控えめな鉛筆アイコンを出して編集できることを示す\nReactとTailwind CSSで実装してください。',
      tips: [
        '複数行を選んで一括編集できるようにして',
        'TanStack Tableと編集用のセルコンポーネントを使って',
        '直前の編集を元に戻せるようにして',
      ],
    },
  },
};

export default meta;
