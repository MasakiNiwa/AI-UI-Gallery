import type { Language } from '@/i18n/languages';

export interface ChangelogEntry {
  /** Semantic version. The newest entry must match package.json (enforced by a test). */
  version: string;
  /** ISO date of the release. */
  date: string;
  changes: Record<Language, string[]>;
}

/**
 * Release history, newest first. When shipping a user-visible change:
 * bump "version" in package.json and add an entry here (minor for features, patch for fixes).
 */
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '0.12.0',
    date: '2026-10-21',
    changes: {
      en: [
        'Smoother gallery: cards show still thumbnails, and only the card in the middle of the screen plays its live demo once scrolling stops.',
        'Fixed the fullscreen button on demos (it did nothing); it now works on every device, including iPhone.',
      ],
      ja: [
        'ギャラリーを軽量化:カードは静止画で表示し、スクロールが止まったときに画面中央のカードだけがライブデモを再生します。',
        'デモの全画面ボタンが動かない不具合を修正し、iPhoneを含むすべての端末で使えるようにしました。',
      ],
    },
  },
  {
    version: '0.11.0',
    date: '2026-10-21',
    changes: {
      en: [
        'New Games category with Memory Match and 2048.',
        '11 new UIs (77 in total), including @mention autocomplete, an inline-editable table, a donut chart, infinite scroll, an image lightbox and an audio visualizer.',
      ],
      ja: [
        '「ゲーム」カテゴリを追加(神経衰弱、2048)。',
        '11個のUIを追加(合計77個)。@メンション入力補完、その場で編集できる表、ドーナツグラフ、無限スクロール、画像ライトボックス、オーディオビジュアライザーなど。',
      ],
    },
  },
  {
    version: '0.10.0',
    date: '2026-10-21',
    changes: {
      en: [
        'New Code tab on every UI: read the real, syntax-highlighted source of the live demo and copy it.',
      ],
      ja: [
        '各UIに「コード」タブを追加:ライブデモの実際のソースコードをシンタックスハイライト付きで読んでコピーできます。',
      ],
    },
  },
  {
    version: '0.9.0',
    date: '2026-10-20',
    changes: {
      en: [
        'Added this release history to the Help page.',
        'Fixed the version shown on the Help page: it now follows each release.',
      ],
      ja: [
        'ヘルプページにこの更新履歴を追加しました。',
        'ヘルプページのバージョン表示がリリースごとに更新されるよう修正しました。',
      ],
    },
  },
  {
    version: '0.8.0',
    date: '2026-10-20',
    changes: {
      en: ['The app can be installed (PWA) and works offline after the first visit.'],
      ja: ['アプリとしてインストールでき(PWA)、一度開けばオフラインでも使えるようになりました。'],
    },
  },
  {
    version: '0.7.0',
    date: '2026-10-20',
    changes: {
      en: [
        'Prompt builder: tailor prompts to React, Vue, Svelte or plain HTML, and add extra requirements.',
      ],
      ja: [
        'プロンプトの書き換え機能:React・Vue・Svelte・素のHTMLや追加の要望に合わせてプロンプトを調整できます。',
      ],
    },
  },
  {
    version: '0.6.0',
    date: '2026-10-20',
    changes: {
      en: ['Gallery filters by difficulty and technology, and a compact card size.'],
      ja: ['ギャラリーに難易度・使用技術の絞り込みと、小さいカード表示を追加しました。'],
    },
  },
  {
    version: '0.5.0',
    date: '2026-10-20',
    changes: {
      en: [
        '12 new UIs (66 in total), including a color picker, Gantt chart, bottom sheet and swipe cards.',
      ],
      ja: [
        '12個のUIを追加(合計66個)。カラーピッカー、ガントチャート、ボトムシート、スワイプカードなど。',
      ],
    },
  },
  {
    version: '0.4.1',
    date: '2026-10-20',
    changes: {
      en: ['Fixed quick search opening the wrong item when Enter was pressed right after typing.'],
      ja: ['クイック検索で入力直後にEnterを押すと別のUIが開くことがある不具合を修正しました。'],
    },
  },
  {
    version: '0.4.0',
    date: '2026-10-20',
    changes: {
      en: [
        '13 new UIs (54 in total), including a three.js 3D object, WebGPU particles and an AI chat screen.',
      ],
      ja: ['13個のUIを追加(合計54個)。three.jsの3D、WebGPUのパーティクル、AIチャット画面など。'],
    },
  },
  {
    version: '0.3.0',
    date: '2026-10-20',
    changes: {
      en: ['Favorites, viewing history, quick search (⌘K / Ctrl+K), sharing and fullscreen demos.'],
      ja: [
        'お気に入り、閲覧履歴、クイック検索(⌘K / Ctrl+K)、共有、デモの全画面表示を追加しました。',
      ],
    },
  },
  {
    version: '0.2.0',
    date: '2026-10-20',
    changes: {
      en: ['26 new UIs (41 in total) across every category.'],
      ja: ['全カテゴリに26個のUIを追加しました(合計41個)。'],
    },
  },
  {
    version: '0.1.0',
    date: '2026-10-20',
    changes: {
      en: ['First release with 15 live UI demos, search, settings and help.'],
      ja: ['15個のライブデモ、検索、設定、ヘルプを備えた最初のリリース。'],
    },
  },
];
