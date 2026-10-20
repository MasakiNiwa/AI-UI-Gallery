import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'tag-input',
  category: 'inputs',
  tags: ['tags', 'chips', 'multi-select', 'autocomplete', 'combobox'],
  difficulty: 'medium',
  tech: ['ARIA combobox', 'Keyboard handling'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Tag Input with Suggestions',
      summary: 'Type to add tags as removable chips, with an autocomplete list of suggestions.',
      description:
        'A tag input (or chip input) collects multiple short values in one field. Each entry becomes a removable "chip"; Enter or a comma adds the current text, and Backspace on an empty field removes the last chip. A suggestion dropdown speeds up entry and keeps tags consistent.\n\nThe suggestion list follows the ARIA combobox pattern: arrow keys move the highlighted option, Enter picks it, and Escape closes the list.',
      prompt:
        'Create a tag input with autocomplete suggestions for selecting technologies.\n- Selected tags appear as chips inside the field, each with an × button\n- Typing filters a suggestion dropdown (React, Vue, Svelte, TypeScript, Tailwind CSS, …); matching text is highlighted\n- Enter or comma adds the highlighted suggestion or the typed text; duplicates are ignored\n- Backspace on an empty input removes the last chip\n- Arrow Up/Down move through suggestions, Escape closes the list\n- Follow the ARIA combobox pattern (role="combobox", aria-expanded, aria-activedescendant, role="listbox")\n- Limit to 8 tags and show a counter\nUse React and Tailwind CSS.',
      tips: [
        'Give each tag a color based on its category.',
        'Allow reordering chips by drag and drop.',
        "Use Headless UI's Combobox component.",
      ],
    },
    ja: {
      name: '候補付きタグ入力',
      summary: '入力するとタグが削除可能なチップとして追加され、候補リストから選ぶこともできる。',
      description:
        'タグ入力(チップ入力)は、1つの欄で複数の短い値を集めるUIです。入力した値はそれぞれ削除できる「チップ」になります。Enterやカンマで今の文字列を追加し、空欄でBackspaceを押すと最後のチップが消えます。候補のドロップダウンがあると入力が速くなり、タグの表記ゆれも防げます。\n\n候補リストはARIAのコンボボックスのパターンに従い、矢印キーで選択中の候補を動かし、Enterで決定、Escで閉じます。',
      prompt:
        '使用技術を選ぶための、候補付きタグ入力を作ってください。\n- 選んだタグは欄の中にチップとして表示し、それぞれに×ボタン\n- 入力すると候補のドロップダウン(React、Vue、Svelte、TypeScript、Tailwind CSSなど)が絞り込まれ、一致部分を強調表示\n- Enterかカンマで、選択中の候補か入力した文字列を追加。重複は無視\n- 空欄でBackspaceを押すと最後のチップを削除\n- 上下の矢印キーで候補を移動し、Escでリストを閉じる\n- ARIAのコンボボックスのパターンに従う(role="combobox"、aria-expanded、aria-activedescendant、role="listbox")\n- タグは最大8個までとし、カウンターを表示\nReactとTailwind CSSで実装してください。',
      tips: [
        'カテゴリに応じてタグに色を付けて',
        'ドラッグ&ドロップでチップを並べ替えられるようにして',
        'Headless UIのComboboxコンポーネントを使って',
      ],
    },
  },
};

export default meta;
