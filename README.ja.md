# AI UIギャラリー

[English](README.md) | **日本語**

AIに依頼して作れるWEBアプリUIの展示場です。展示しているUIはすべて**実際に動くデモ**で、一般的な**名前**・**解説**・
AIアシスタントにそのまま貼り付けられる**プロンプト例**を添えています。

🔗 **https://masakiniwa.github.io/AI-UI-Gallery/**

## 主な機能

- カテゴリ別に並んだ、さまざまなUIのライブデモと、あいまい検索(Web Workerで実行)
- ワンクリックでコピーできるプロンプト例と、追加依頼のアイデア
- デモを全幅/スマホ幅で切り替えてプレビュー
- レスポンシブ対応:スマホでは下部ナビゲーションバー、PCではサイドバー
- お気に入り、閲覧履歴、アプリ全体のクイック検索(⌘K / Ctrl+K)
- アプリとしてインストール可能(PWA)、一度開けばオフラインでも利用可能
- ライト/ダークテーマ(落ち着いた低コントラストのダーク配色)
- ブラウザの言語に合わせて自動で言語を切り替え(英語・日本語)
- GPUや並列処理のデモ:WebGLシェーダー、three.jsの3D、WebGPUのコンピュートシェーダー、Web Worker内でのOffscreenCanvas描画

## 開発

Node.js 22以上が必要です。

```bash
npm install
npm run dev        # 開発サーバーを起動
npm run lint       # ESLint
npm test           # ユニットテスト(Vitest)
npm run test:e2e   # E2Eテスト(Playwright。先に `npm run build` を実行)
npm run build      # 型チェックと dist/ へのビルド(THIRD_PARTY_NOTICES.md も再生成)
npm run preview    # 本番ビルドを確認
```

## ギャラリーにUIを追加する

1. `src/gallery/items/<id>/` フォルダを作ります(フォルダ名がURLに使われるIDになります)。
2. `meta.ts` で `ItemMeta` をエクスポートします(カテゴリ、タグ、難易度、使用技術、`text.en` / `text.ja` に
   名前・概要・解説・プロンプト・任意のヒント)。
3. `Demo.tsx` でコンポーネントをdefault exportします。`mode: 'preview' | 'full'` を受け取ります。コンテナいっぱいに
   表示し(`h-full`)、ビューポートのブレークポイントではなくコンテナクエリ(`@md:`、`@lg:` など)を使うと、
   プレビュー幅に応じてレイアウトが変わります。
4. `npm test` を実行します。すべての言語でメタデータが揃っているかをテストが確認します。

登録用のコードは不要で、フォルダを追加するだけで自動的に読み込まれます。デモのコードは別チャンクに分割され、
表示するときにだけ読み込まれます。

## 言語を追加する

`src/i18n/locales/<lang>.json` を追加し(キーが `en.json` と一致することをテストで確認)、
`src/i18n/languages.ts` と `src/i18n/index.ts` に登録し、設定ページに言語名を追加します。各UIの `text.<lang>` が
ない場合は英語で表示されます。

## 公開

`main` にpushすると、GitHub Actions(`.github/workflows/deploy.yml`)でビルドしてGitHub Pagesに公開します。
リポジトリの **Settings → Pages → Source** を **GitHub Actions** に設定してください。

## ライセンス

[MIT](LICENSE)。アプリに同梱しているサードパーティソフトウェアは
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)(ビルド時に自動生成)とアプリのヘルプページに記載しています。
