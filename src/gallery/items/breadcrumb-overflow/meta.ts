import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'breadcrumb-overflow',
  category: 'navigation',
  tags: ['breadcrumb', 'navigation path', 'overflow menu', 'ellipsis', 'hierarchy'],
  difficulty: 'easy',
  tech: ['aria-current', 'Container queries'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Breadcrumbs with Overflow',
      summary:
        'A breadcrumb trail that collapses middle levels into a "…" menu when space is tight.',
      description:
        'Breadcrumbs show where the current page sits in the hierarchy (Home › Products › Laptops › …) and let users jump back up. In deep structures the trail can get too long, so the middle levels collapse into a "…" button that opens a menu listing them, while the first and the last two levels stay visible.\n\nThe trail is a <nav aria-label="Breadcrumb"> containing an ordered list; separators are decorative (aria-hidden) and the last item is the current page with aria-current="page". Long names are truncated with an ellipsis and shown in full on hover.',
      prompt:
        'Create a breadcrumb component with overflow handling.\n- Path: Home › Workspace › Projects › 2026 › Website › Pages › Pricing\n- Use <nav aria-label="Breadcrumb"> with an <ol>; separators are chevron icons with aria-hidden; the last item is plain text with aria-current="page"\n- When the container is narrow, collapse the middle items into a "…" button that opens a dropdown menu listing them (keyboard accessible, closes on Escape / outside click)\n- Always show the first item and the last two\n- Truncate long labels with an ellipsis and a title tooltip\n- Optional home icon for the first item\nUse React and Tailwind CSS.',
      tips: [
        'Add a dropdown on each level to jump to sibling pages.',
        'Generate the breadcrumbs from the router automatically.',
        'Add BreadcrumbList structured data for SEO.',
      ],
    },
    ja: {
      name: '省略表示できるパンくずリスト',
      summary: '幅が足りないときは、途中の階層を「…」メニューにまとめるパンくずリスト。',
      description:
        'パンくずリストは、現在のページが階層のどこにあるか(ホーム › 製品 › ノートPC › …)を示し、上の階層へ戻れるようにするUIです。階層が深いと長くなりすぎるので、途中の階層を「…」ボタンにまとめ、押すとそれらを一覧するメニューを開きます。最初の階層と最後の2つは常に表示します。\n\n全体は順序付きリストを含む <nav aria-label="Breadcrumb"> で、区切り記号は装飾として aria-hidden にし、最後の項目は aria-current="page" を付けた現在のページにします。長い名前は省略記号で切り詰め、ホバーで全文を表示します。',
      prompt:
        '省略表示に対応したパンくずリストのコンポーネントを作ってください。\n- パス:ホーム › ワークスペース › プロジェクト › 2026 › Webサイト › ページ › 料金\n- <ol> を含む <nav aria-label="Breadcrumb"> を使い、区切りはシェブロンのアイコンで aria-hidden。最後の項目は aria-current="page" のテキスト\n- コンテナが狭いときは、途中の項目を「…」ボタンにまとめ、押すとそれらを一覧するドロップダウンメニューを開く(キーボード操作可、Escや外側のクリックで閉じる)\n- 最初の項目と最後の2つは常に表示\n- 長いラベルは省略記号で切り詰め、titleでツールチップ表示\n- 最初の項目は任意でホームのアイコンにする\nReactとTailwind CSSで実装してください。',
      tips: [
        '各階層にドロップダウンを付けて同じ階層のページへ移動できるようにして',
        'ルーターからパンくずを自動生成して',
        'SEO用にBreadcrumbListの構造化データを追加して',
      ],
    },
  },
};

export default meta;
