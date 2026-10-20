import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'tree-view',
  category: 'data',
  tags: ['tree view', 'file explorer', 'hierarchy', 'nested list', 'checkbox tree', 'aria tree'],
  difficulty: 'hard',
  tech: ['ARIA tree pattern', 'Recursive components'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'File Tree View',
      summary:
        'A collapsible folder tree with file icons, indentation guides, filtering and full keyboard navigation.',
      description:
        'A tree view shows hierarchical data such as folders and files, categories or org charts. Folders expand and collapse with a chevron, indentation guides make the depth readable, and a filter box reveals matching items together with their parent folders.\n\nIt follows the ARIA tree pattern: role="tree" and role="treeitem" with aria-expanded, aria-level and aria-selected. Only one item is focusable at a time (roving tabindex); arrow keys move up and down, Right expands or enters a folder, Left collapses or goes to the parent, and Home/End jump to the ends.',
      prompt:
        'Create a file explorer tree view.\n- Nested data of folders and files; folders show a chevron that rotates when expanded and an open/closed folder icon; files show an icon based on the extension\n- Thin vertical indentation guides for each level\n- Click selects; double-click or Enter toggles folders\n- Follow the ARIA tree pattern: role="tree"/"treeitem", aria-expanded, aria-level, aria-selected, roving tabindex\n- Keyboard: Up/Down move, Right expands or moves to the first child, Left collapses or moves to the parent, Home/End, type-ahead by first letter\n- A filter input shows matching files with their ancestor folders auto-expanded and highlights the match\n- "Expand all" / "Collapse all" buttons\nUse React and Tailwind CSS with a recursive component.',
      tips: [
        'Add drag and drop to move files between folders.',
        'Add checkboxes with indeterminate parent states.',
        'Lazy-load folder children when they are expanded.',
      ],
    },
    ja: {
      name: 'ファイルのツリー表示',
      summary:
        'ファイルアイコン、階層の補助線、絞り込み、キーボード操作に対応した、開閉できるフォルダーのツリー。',
      description:
        'ツリー表示は、フォルダーとファイル、カテゴリ、組織図のような階層構造のデータを見せるUIです。フォルダーはシェブロン(>)で開閉でき、階層ごとの補助線で深さが読み取りやすくなります。絞り込み欄に入力すると、一致した項目が親フォルダーごと表示されます。\n\nARIAのツリーのパターンに従い、aria-expanded・aria-level・aria-selected を持つ role="tree" と role="treeitem" を使います。フォーカスできる項目は常に1つだけ(ロービングタブインデックス)で、上下の矢印キーで移動、右キーで開く/子へ移動、左キーで閉じる/親へ移動、Home/Endで端へ移動します。',
      prompt:
        'ファイルエクスプローラー風のツリー表示を作ってください。\n- フォルダーとファイルの入れ子データ。フォルダーには開くと回転するシェブロンと、開閉で変わるフォルダーアイコン。ファイルには拡張子に応じたアイコン\n- 階層ごとの細い縦の補助線\n- クリックで選択、ダブルクリックかEnterでフォルダーを開閉\n- ARIAのツリーのパターンに従う:role="tree"/"treeitem"、aria-expanded、aria-level、aria-selected、ロービングタブインデックス\n- キーボード:上下で移動、右で開くか最初の子へ、左で閉じるか親へ、Home/End、頭文字での先行入力\n- 絞り込みの入力欄で、一致したファイルを親フォルダーを自動で開いた状態で表示し、一致部分を強調\n- 「すべて開く」「すべて閉じる」ボタン\n再帰コンポーネントを使い、ReactとTailwind CSSで実装してください。',
      tips: [
        'ドラッグ&ドロップでファイルをフォルダー間で移動できるようにして',
        '親が「一部選択」状態になるチェックボックスを追加して',
        'フォルダーを開いたときに子を遅延読み込みして',
      ],
    },
  },
};

export default meta;
