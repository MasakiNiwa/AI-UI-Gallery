import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'infinite-scroll-feed',
  category: 'layout',
  tags: ['infinite scroll', 'feed', 'load more', 'pagination', 'intersection observer', 'skeleton'],
  difficulty: 'medium',
  tech: ['IntersectionObserver', 'aria-busy'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Infinite Scroll Feed',
      summary:
        'A feed that loads more posts as you near the bottom, with skeletons, an end state and error retry.',
      description:
        'Infinite scrolling keeps loading content as the user scrolls, which suits browsing feeds where people do not look for a specific item. An invisible "sentinel" element near the end of the list is watched with an IntersectionObserver; when it comes into view, the next page is requested and skeleton cards hold the space until it arrives.\n\nA good implementation avoids duplicate requests, shows an end-of-list message, recovers from errors with a Retry button, and offers a "Load more" button as an accessible fallback. A "Back to top" button helps after scrolling far.',
      prompt:
        'Build an infinite scrolling feed of posts.\n- Load 8 posts per page from a mock API with a random 600–1200ms delay\n- Put a sentinel element at the end of the list and watch it with IntersectionObserver (rootMargin 200px) to load the next page; never fire two requests at once\n- Show 2 skeleton cards while loading and set aria-busy on the feed\n- Simulate occasional errors and show "Couldn\'t load more posts" with a Retry button\n- Stop after 5 pages with a "You\'re all caught up" message\n- Also render a "Load more" button for keyboard and screen reader users\n- A floating "Back to top" button appears after scrolling down\nUse React and Tailwind CSS.',
      tips: [
        'Virtualize the list with TanStack Virtual for thousands of items.',
        'Use TanStack Query useInfiniteQuery for fetching and caching.',
        'Restore the scroll position when navigating back.',
      ],
    },
    ja: {
      name: '無限スクロールのフィード',
      summary:
        '下に近づくと投稿を追加で読み込むフィード。スケルトン、終了表示、エラー時の再試行付き。',
      description:
        '無限スクロールは、スクロールに合わせてコンテンツを読み込み続ける仕組みで、特定の項目を探すのではなく眺めて楽しむフィードに向いています。一覧の終わり近くに置いた見えない「番兵」要素をIntersectionObserverで監視し、画面に入ったら次のページを要求し、届くまではスケルトンのカードで場所を確保します。\n\n良い実装では、重複したリクエストを防ぎ、一覧の終わりを知らせ、エラー時は再試行ボタンで回復でき、アクセシブルな代替手段として「もっと見る」ボタンも用意します。遠くまでスクロールしたあとは「トップへ戻る」ボタンが役立ちます。',
      prompt:
        '無限スクロールで投稿を読み込むフィードを作ってください。\n- 600〜1200msのランダムな遅延がある仮のAPIから、1ページ8件ずつ読み込む\n- 一覧の最後に番兵要素を置き、IntersectionObserver(rootMargin 200px)で監視して次のページを読み込む。同時に2つのリクエストは出さない\n- 読み込み中は2枚のスケルトンカードを表示し、フィードに aria-busy を設定\n- ときどきエラーを模擬し、「投稿を読み込めませんでした」と再試行ボタンを表示\n- 5ページで終了し、「すべて見終わりました」と表示\n- キーボードやスクリーンリーダーの利用者向けに「もっと見る」ボタンも表示\n- 下へスクロールすると「トップへ戻る」ボタンが浮かび上がる\nReactとTailwind CSSで実装してください。',
      tips: [
        '数千件でも軽いようにTanStack Virtualで仮想化して',
        '取得とキャッシュにTanStack QueryのuseInfiniteQueryを使って',
        '戻るで帰ってきたときにスクロール位置を復元して',
      ],
    },
  },
};

export default meta;
