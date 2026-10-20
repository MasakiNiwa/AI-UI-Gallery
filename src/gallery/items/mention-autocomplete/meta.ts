import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'mention-autocomplete',
  category: 'inputs',
  tags: ['mention', '@mention', 'autocomplete', 'comment box', 'textarea', 'chat'],
  difficulty: 'hard',
  tech: ['Caret position', 'ARIA combobox'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: '@Mention Autocomplete',
      summary:
        'Type "@" in a comment box to get a filtered list of people, then insert a highlighted mention.',
      description:
        '@mentions let users notify a teammate directly from a comment. Typing "@" opens a small suggestion list right under the caret, which filters as you keep typing; choosing a person inserts their name as a mention, and the posted comment shows it highlighted.\n\nThe tricky part is reading the text just before the caret to find an active "@query", positioning the popup near the caret, and replacing exactly that range when a person is picked. The list follows the combobox pattern with arrow keys, Enter/Tab to choose and Escape to dismiss.',
      prompt:
        'Create a comment box with @mention autocomplete.\n- A textarea; when the text before the caret matches /@(\\w*)$/, show a suggestion popup of team members (avatar, name, role) filtered by the query\n- Position the popup under the "@" (use a mirror div to measure the caret position, or place it below the textarea)\n- Arrow Up/Down to move, Enter or Tab to insert, Escape to close; clicking also inserts\n- Inserting replaces "@query" with "@Name " and puts the caret after it\n- "Post" adds the comment to a list below, rendering mentions as highlighted chips\n- Follow the combobox pattern (aria-expanded, aria-activedescendant, role="listbox")\nUse React and Tailwind CSS.',
      tips: [
        'Add #channel and :emoji: triggers.',
        'Fetch people from an API with debouncing.',
        'Use a rich text editor such as Tiptap with its mention extension.',
      ],
    },
    ja: {
      name: '@メンションの入力補完',
      summary:
        'コメント欄で「@」を入力すると人の候補が絞り込み表示され、強調表示のメンションを挿入できる。',
      description:
        '@メンションは、コメントからチームメンバーに直接知らせられる機能です。「@」を入力するとカーソルのすぐ下に小さな候補リストが開き、続けて入力すると絞り込まれます。人を選ぶとその名前がメンションとして挿入され、投稿したコメントでは強調表示されます。\n\n難しいのは、カーソル直前の文字から入力中の「@検索語」を見つけること、ポップアップをカーソルの近くに出すこと、人を選んだらちょうどその範囲を置き換えることです。リストはコンボボックスのパターンに従い、矢印キーで移動、Enter/Tabで決定、Escで閉じます。',
      prompt:
        '@メンションの入力補完付きのコメント欄を作ってください。\n- テキストエリアで、カーソル直前の文字が /@(\\w*)$/ に一致したら、チームメンバー(アバター、名前、役割)の候補ポップアップを検索語で絞り込んで表示\n- ポップアップは「@」の下に表示(ミラー要素でカーソル位置を測るか、テキストエリアの下に配置)\n- 上下の矢印キーで移動、EnterかTabで挿入、Escで閉じる。クリックでも挿入\n- 挿入すると「@検索語」を「@名前 」に置き換え、カーソルをその後ろへ移動\n- 「投稿」でコメントを下の一覧に追加し、メンションは強調表示のチップとして描画\n- コンボボックスのパターンに従う(aria-expanded、aria-activedescendant、role="listbox")\nReactとTailwind CSSで実装してください。',
      tips: [
        '#チャンネルや:絵文字:のトリガーを追加して',
        'デバウンスしてAPIから人を取得して',
        'Tiptapのようなリッチテキストエディターとmention拡張を使って',
      ],
    },
  },
};

export default meta;
