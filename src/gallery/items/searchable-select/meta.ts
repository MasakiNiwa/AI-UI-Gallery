import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'searchable-select',
  category: 'inputs',
  tags: ['select', 'dropdown', 'combobox', 'searchable', 'listbox', 'country picker'],
  difficulty: 'medium',
  tech: ['ARIA combobox', 'Keyboard navigation'],
  addedAt: '2026-10-22',
  text: {
    en: {
      name: 'Searchable Select',
      summary:
        'A custom dropdown with a search box, grouped options with flags, keyboard navigation and a check on the selection.',
      description:
        'When a select has many options, such as countries or time zones, scrolling a native dropdown gets tedious. A searchable select opens a panel with a filter box at the top, groups options under headers, and highlights the current selection with a check mark.\n\nIt follows the ARIA combobox pattern: the trigger shows the chosen value, typing filters the list, Up/Down move the active option (scrolled into view), Enter selects and Escape closes, returning focus to the trigger. Clicking outside also closes it, and an empty state explains when nothing matches.',
      prompt:
        'Build a searchable select (combobox) for choosing a country.\n- A trigger button shows the selected country (flag emoji + name) and a chevron\n- Opening shows a panel with a search input at the top (autofocused) and options grouped by region with sticky group headers\n- Typing filters by name or country code; matching text is highlighted; "No countries found" when empty\n- Up/Down move the active option and scroll it into view, Enter selects, Escape closes and returns focus to the trigger, Home/End jump\n- The selected option shows a check mark; clicking outside closes the panel\n- ARIA: role="combobox", aria-expanded, aria-controls, aria-activedescendant, role="listbox"/"option" with aria-selected\nUse React and Tailwind CSS (or Headless UI Combobox).',
      tips: [
        'Allow multiple selections shown as chips.',
        'Load options from an API as the user types.',
        'Add recently used options at the top.',
      ],
    },
    ja: {
      name: '検索できるセレクト',
      summary:
        '検索欄、国旗付きのグループ分けされた選択肢、キーボード操作、選択中のチェックを備えた独自のドロップダウン。',
      description:
        '国やタイムゾーンのように選択肢が多いと、ネイティブのドロップダウンをスクロールして探すのは面倒です。検索できるセレクトは、上部に絞り込み欄があるパネルを開き、選択肢を見出しでグループ分けし、現在の選択をチェックマークで示します。\n\nARIAのコンボボックスのパターンに従い、ボタンには選んだ値を表示し、入力で一覧を絞り込み、上下キーで選択中の候補を移動(見える位置までスクロール)、Enterで決定、Escで閉じてボタンにフォーカスを戻します。外側のクリックでも閉じ、該当がないときはその旨を表示します。',
      prompt:
        '国を選ぶための、検索できるセレクト(コンボボックス)を作ってください。\n- ボタンには選んだ国(国旗の絵文字+名前)とシェブロンを表示\n- 開くと上部に検索欄(自動フォーカス)があるパネルを表示し、選択肢は地域ごとにグループ分けして見出しを固定表示\n- 入力すると名前か国コードで絞り込み、一致部分を強調。該当なしなら「国が見つかりません」\n- 上下キーで選択中の候補を移動して見える位置までスクロール、Enterで決定、Escで閉じてボタンにフォーカスを戻す、Home/Endで端へ\n- 選択中の候補にはチェックマーク。外側をクリックするとパネルを閉じる\n- ARIA:role="combobox"、aria-expanded、aria-controls、aria-activedescendant、aria-selected 付きの role="listbox"/"option"\nReactとTailwind CSS(またはHeadless UIのCombobox)で実装してください。',
      tips: [
        '複数選択してチップで表示できるようにして',
        '入力に合わせてAPIから選択肢を読み込んで',
        '最近使った選択肢を一番上に表示して',
      ],
    },
  },
};

export default meta;
