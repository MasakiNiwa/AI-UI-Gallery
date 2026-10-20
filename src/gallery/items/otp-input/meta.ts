import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'otp-input',
  category: 'inputs',
  tags: ['otp', 'pin', 'verification code', '2fa', 'one-time password'],
  difficulty: 'medium',
  tech: ['Input events', 'autocomplete="one-time-code"'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'One-Time Code Input',
      summary:
        'Six separate boxes for a verification code, with auto-advance, paste and backspace support.',
      description:
        'A one-time code (OTP) input splits a short numeric code into separate boxes, one per digit, which makes the length obvious and the code easy to check. Typing a digit moves focus to the next box, Backspace goes back, and pasting the whole code fills every box at once.\n\nautocomplete="one-time-code" and inputMode="numeric" let phones suggest the code from an SMS and show a number pad. When all digits are filled, verification starts automatically.',
      prompt:
        'Build a 6-digit verification code input for two-factor authentication.\n- Six separate boxes, one digit each; only digits are accepted\n- Typing moves focus to the next box; Backspace on an empty box moves to the previous one; arrow keys move between boxes\n- Pasting a 6-digit code anywhere fills all boxes\n- Use inputMode="numeric" and autocomplete="one-time-code" on the first box\n- When complete, auto-submit: show a spinner, then success (green) or error (red with a shake animation, clear the boxes)\n- A "Resend code" link with a 30-second countdown\nUse React and Tailwind CSS.',
      tips: [
        'Mask the digits like a PIN with a show/hide toggle.',
        'Use the input-otp library instead.',
        'Support alphanumeric codes.',
      ],
    },
    ja: {
      name: 'ワンタイムコード入力',
      summary: '認証コード用の6つの入力欄。自動で次へ進み、貼り付けやBackspaceにも対応。',
      description:
        'ワンタイムコード(OTP)入力は、短い数字のコードを1桁ずつ別々の欄に分けて入力するUIです。桁数がひと目でわかり、コードの確認もしやすくなります。数字を入力すると次の欄へフォーカスが移り、Backspaceで前に戻り、コード全体を貼り付けると全欄が一度に埋まります。\n\nautocomplete="one-time-code" と inputMode="numeric" を指定すると、スマホではSMSのコードが候補に出て、数字キーパッドが表示されます。すべて入力されると自動的に認証が始まります。',
      prompt:
        '2段階認証用の6桁の認証コード入力を作ってください。\n- 1桁ずつの6つの入力欄。数字のみ受け付ける\n- 入力すると次の欄へフォーカスが移り、空欄でBackspaceを押すと前の欄へ、矢印キーで欄を移動できる\n- どこに6桁のコードを貼り付けても全欄が埋まる\n- 最初の欄に inputMode="numeric" と autocomplete="one-time-code" を指定\n- 入力が揃ったら自動送信:スピナーを出し、成功(緑)かエラー(赤く揺れるアニメーションのあと欄をクリア)\n- 30秒のカウントダウン付きの「コードを再送」リンク\nReactとTailwind CSSで実装してください。',
      tips: [
        '数字をPINのように伏せ字にし、表示切り替えを付けて',
        'input-otpライブラリを使って',
        '英数字のコードにも対応して',
      ],
    },
  },
};

export default meta;
