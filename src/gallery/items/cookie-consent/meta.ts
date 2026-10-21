import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'cookie-consent',
  category: 'feedback',
  tags: ['cookie banner', 'consent', 'privacy', 'GDPR', 'preferences', 'toggle'],
  difficulty: 'medium',
  tech: ['ARIA dialog', 'CSS transitions'],
  addedAt: '2026-10-22',
  text: {
    en: {
      name: 'Cookie Consent Banner',
      summary:
        'A friendly consent banner with equal Accept / Reject buttons and a preferences panel with per-category switches.',
      description:
        'Sites that use non-essential cookies must ask first, and a good banner makes the choice honest and quick. This one slides up from the bottom with a short explanation and "Reject all" and "Accept all" buttons of equal weight, so declining is as easy as accepting.\n\n"Customize" expands a preferences panel listing each category (necessary, analytics, marketing) with a description and a switch. Necessary cookies are locked on. After a choice the banner closes, and a small floating button lets the visitor reopen their settings at any time.',
      prompt:
        'Create a cookie consent banner.\n- Slides up from the bottom (card on desktop, full width on mobile) with a cookie icon, a one-sentence explanation and a "Privacy policy" link\n- Buttons: "Reject all", "Accept all" (same size and prominence) and a text button "Customize"\n- Customize expands a panel with categories (Necessary – always on and disabled, Analytics, Marketing), each with a description and a switch (role="switch"), plus "Save choices"\n- After any choice, hide the banner, show a toast like "Preferences saved" and a small floating cookie button to reopen settings\n- Store the choice with a timestamp; use role="dialog" with aria-labelledby, and move focus into the banner\nUse React and Tailwind CSS.',
      tips: [
        'Load analytics scripts only after consent.',
        'Ask again when the policy version changes.',
        'Add a link to download the consent record.',
      ],
    },
    ja: {
      name: 'Cookie同意バナー',
      summary:
        '「すべて許可」と「すべて拒否」を同じ重みで並べ、カテゴリ別のスイッチで設定もできる親しみやすい同意バナー。',
      description:
        '必須ではないCookieを使うサイトは事前に同意を得る必要があり、良いバナーは選択を誠実かつ素早くできるようにします。このバナーは下からスライドして現れ、短い説明と、同じ大きさの「すべて拒否」「すべて許可」ボタンを表示するので、断るのも許可するのと同じくらい簡単です。\n\n「カスタマイズ」を押すと、カテゴリ(必須、分析、マーケティング)ごとに説明とスイッチが並ぶ設定パネルが開きます。必須Cookieはオンに固定です。選択するとバナーは閉じ、小さな浮遊ボタンからいつでも設定を開き直せます。',
      prompt:
        'Cookie同意バナーを作ってください。\n- 下からスライドして表示(デスクトップではカード、モバイルでは全幅)。Cookieのアイコン、1文の説明、「プライバシーポリシー」へのリンク\n- ボタン:「すべて拒否」「すべて許可」(同じ大きさと目立ち方)と、テキストボタン「カスタマイズ」\n- カスタマイズでパネルを展開し、カテゴリ(必須:常にオンで無効化、分析、マーケティング)ごとに説明とスイッチ(role="switch")、「選択を保存」ボタン\n- 選択後はバナーを隠し、「設定を保存しました」のようなトーストと、設定を開き直すための小さなCookieボタンを表示\n- 選択はタイムスタンプ付きで保存。role="dialog" と aria-labelledby を使い、フォーカスをバナー内に移動\nReactとTailwind CSSで実装してください。',
      tips: [
        '同意を得てから分析用スクリプトを読み込むようにして',
        'ポリシーのバージョンが変わったら再度確認して',
        '同意の記録をダウンロードできるリンクを追加して',
      ],
    },
  },
};

export default meta;
