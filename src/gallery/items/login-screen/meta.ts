import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'login-screen',
  category: 'inputs',
  tags: ['login', 'sign in', 'authentication', 'social login', 'split screen', 'form'],
  difficulty: 'easy',
  tech: ['Form validation', 'autocomplete attributes'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Split-Screen Login',
      summary:
        'A sign-in page with a branded visual panel, social login buttons and a polished email form.',
      description:
        'The login screen is often the first thing users see, so it deserves care. A split layout pairs a branded visual (illustration, gradient or testimonial) with a focused form. Social login buttons come first for speed, followed by an "or" divider and the email/password form.\n\nGood login forms use the right autocomplete attributes (email, current-password) so password managers work, offer a show-password toggle and a "Forgot password?" link, and show clear inline errors. On small screens, the visual panel collapses and the form takes the full width.',
      prompt:
        'Create a split-screen login page.\n- Left half: a brand panel with a gradient background, logo, a short testimonial and the author\n- Right half: "Welcome back" heading, Google and GitHub sign-in buttons, an "or continue with email" divider, email and password fields, a "Remember me" checkbox, a "Forgot password?" link and a full-width "Sign in" button\n- Correct autocomplete attributes (email, current-password) and a show/hide password toggle\n- Validate on submit; show inline errors; show a loading spinner on the button while "signing in"\n- Link to sign up at the bottom\n- On mobile (narrow container), hide the brand panel and center the form\nUse React and Tailwind CSS.',
      tips: [
        'Add a passkey (WebAuthn) sign-in option.',
        'Animate the brand panel background slowly.',
        'Add a "magic link" email-only flow.',
      ],
    },
    ja: {
      name: '2分割のログイン画面',
      summary:
        'ブランドのビジュアル、ソーシャルログインのボタン、整ったメールフォームを並べたサインイン画面。',
      description:
        'ログイン画面はユーザーが最初に目にすることが多いので、丁寧に作る価値があります。2分割のレイアウトでは、ブランドのビジュアル(イラスト・グラデーション・利用者の声)と、操作に集中できるフォームを並べます。素早く使えるソーシャルログインのボタンを先に置き、「または」の区切りのあとにメールとパスワードのフォームを続けます。\n\n良いログインフォームは、パスワードマネージャーが働くように適切な autocomplete 属性(email、current-password)を使い、パスワードの表示切り替えと「パスワードをお忘れですか?」リンクを用意し、わかりやすいエラーをその場に表示します。狭い画面ではビジュアルのパネルを隠し、フォームを全幅にします。',
      prompt:
        '2分割のログイン画面を作ってください。\n- 左半分:グラデーション背景、ロゴ、短い利用者の声とその人の名前を置いたブランドパネル\n- 右半分:「おかえりなさい」の見出し、GoogleとGitHubのサインインボタン、「またはメールで続ける」の区切り、メールとパスワードの入力欄、「ログイン状態を保持」チェックボックス、「パスワードをお忘れですか?」リンク、全幅の「サインイン」ボタン\n- 正しい autocomplete 属性(email、current-password)と、パスワードの表示/非表示切り替え\n- 送信時に入力をチェックし、エラーはその場に表示。「サインイン中」はボタンにスピナーを表示\n- 下部に新規登録へのリンク\n- スマホ(狭いコンテナ)ではブランドパネルを隠してフォームを中央に\nReactとTailwind CSSで実装してください。',
      tips: [
        'パスキー(WebAuthn)でのサインインを追加して',
        'ブランドパネルの背景をゆっくり動かして',
        'メールだけで入れる「マジックリンク」の流れを追加して',
      ],
    },
  },
};

export default meta;
