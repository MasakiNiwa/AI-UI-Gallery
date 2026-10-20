import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'pagination',
  category: 'navigation',
  tags: ['pagination', 'pager', 'page numbers', 'ellipsis', 'load more', 'table navigation'],
  difficulty: 'easy',
  tech: ['JavaScript', 'aria-current="page"'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Pagination',
      summary:
        'Page numbers with ellipses, previous/next, a page-size selector and a compact mobile variant.',
      description:
        'Pagination splits a long list into pages and lets users jump between them. With many pages, showing every number does not fit, so a common pattern shows the first and last page, a few pages around the current one, and an ellipsis (…) for the gaps.\n\nThe current page is marked with aria-current="page", and the whole control is a <nav> with a label. On small screens a compact "Page 4 of 20" with arrows works better. A page-size selector and a "Showing 31–40 of 200" summary help users understand where they are.',
      prompt:
        'Create a pagination component for a list of 200 results.\n- Show first and last page, the current page with one neighbor on each side, and "…" for gaps (e.g. 1 … 4 5 6 … 20)\n- Previous / Next buttons, disabled at the ends\n- A page-size selector (10, 20, 50) that keeps the first visible item on screen when changed\n- A summary text: "Showing 31–40 of 200"\n- On narrow containers, switch to a compact "Page 4 of 20" with arrows only\n- Wrap in <nav aria-label="Pagination">, use aria-current="page" on the active page\n- Render the current page of a simple list above the controls\nUse React and Tailwind CSS.',
      tips: [
        'Sync the page number with the URL query string.',
        'Replace it with a "Load more" button or infinite scroll.',
        'Add a "Go to page" input.',
      ],
    },
    ja: {
      name: 'ページネーション',
      summary:
        '省略記号付きのページ番号、前へ/次へ、表示件数の切り替え、スマホ向けのコンパクト表示。',
      description:
        'ページネーションは、長い一覧をページに分け、ページ間を移動できるようにするUIです。ページ数が多いと番号をすべて並べられないため、最初と最後のページ、現在のページの前後数ページ、その間を省略記号(…)で表すのが定番です。\n\n現在のページには aria-current="page" を付け、全体はラベル付きの <nav> にします。狭い画面では「4 / 20 ページ」と矢印だけのコンパクトな表示が向いています。表示件数の切り替えと「200件中31〜40件を表示」のような要約があると、今どこを見ているかがわかりやすくなります。',
      prompt:
        '200件の検索結果用のページネーションを作ってください。\n- 最初と最後のページ、現在のページとその前後1ページを表示し、間は「…」にする(例:1 … 4 5 6 … 20)\n- 前へ/次へボタン。端では無効化\n- 表示件数の切り替え(10、20、50)。切り替えても先頭に見えていた項目が画面に残るようにする\n- 「200件中31〜40件を表示」という要約\n- 幅が狭いときは「4 / 20 ページ」と矢印だけのコンパクト表示に切り替える\n- <nav aria-label="Pagination"> で囲み、現在のページに aria-current="page"\n- コントロールの上に、現在のページの簡単なリストを表示\nReactとTailwind CSSで実装してください。',
      tips: [
        'ページ番号をURLのクエリ文字列と同期させて',
        '「もっと見る」ボタンや無限スクロールに置き換えて',
        '「ページへ移動」の入力欄を追加して',
      ],
    },
  },
};

export default meta;
