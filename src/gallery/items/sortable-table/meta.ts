import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'sortable-table',
  category: 'data',
  tags: ['table', 'data grid', 'sort', 'filter', 'status badge'],
  difficulty: 'medium',
  tech: ['JavaScript', 'ARIA sort'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Sortable Data Table',
      summary:
        'A table with clickable column headers for sorting, a quick filter and status badges.',
      description:
        'A data table presents records in rows and columns so they can be compared. Clicking a column header sorts by that column, and clicking again reverses the order; an arrow shows the current sort. A quick filter narrows the rows as you type.\n\nSortable headers should be buttons inside <th> with aria-sort, so keyboard and screen reader users can sort too. On small screens, let the table scroll horizontally instead of squeezing the columns.',
      prompt:
        'Create a sortable, filterable data table of team members.\n- Columns: name (with avatar initials), role, status, tasks completed, joined date\n- Click a column header to sort ascending; click again for descending; show an arrow icon\n- Use buttons inside <th> and set aria-sort on the sorted column\n- A search box filters rows by name or role as you type\n- Status shown as colored badges (Active, Away, Offline)\n- Zebra stripes, hover highlight, and horizontal scroll on small screens\n- "No results" message when nothing matches\nUse React and Tailwind CSS.',
      tips: [
        'Add pagination with 10 rows per page.',
        'Add row selection with checkboxes and a bulk action bar.',
        'Use TanStack Table for sorting and filtering.',
      ],
    },
    ja: {
      name: '並べ替えできるデータテーブル',
      summary: '列見出しをクリックして並べ替え。絞り込み検索とステータスバッジ付きの表。',
      description:
        'データテーブルは、データを行と列で並べて比較しやすくするUIです。列見出しをクリックするとその列で並べ替え、もう一度押すと逆順になり、矢印で現在の並び順を示します。検索欄に入力すると、その場で行が絞り込まれます。\n\n並べ替えできる見出しは<th>の中にボタンを置き、aria-sort を設定すると、キーボードやスクリーンリーダーの利用者も並べ替えられます。狭い画面では列を詰め込まず、表を横スクロールさせましょう。',
      prompt:
        'チームメンバーの一覧を、並べ替えと絞り込みができるデータテーブルで作ってください。\n- 列:名前(イニシャルのアバター付き)、役割、ステータス、完了タスク数、参加日\n- 列見出しをクリックすると昇順、もう一度で降順。矢印アイコンで表示\n- <th>の中にボタンを置き、並べ替え中の列に aria-sort を設定\n- 検索欄に入力すると名前か役割で行を絞り込む\n- ステータスは色付きバッジ(Active・Away・Offline)\n- 縞模様、ホバー時のハイライト、狭い画面では横スクロール\n- 該当がない場合は「結果なし」のメッセージ\nReactとTailwind CSSで実装してください。',
      tips: [
        '1ページ10行のページネーションを追加して',
        'チェックボックスで行を選択し、一括操作バーを出して',
        '並べ替えと絞り込みにTanStack Tableを使って',
      ],
    },
  },
};

export default meta;
