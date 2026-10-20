import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'floating-label-input',
  category: 'inputs',
  tags: ['form', 'input', 'floating label', 'validation', 'password strength'],
  difficulty: 'medium',
  tech: ['CSS :placeholder-shown', 'Form validation'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Floating Label Form',
      summary:
        'Labels that float above the field on focus, with live validation and a password strength meter.',
      description:
        'In a floating label input, the label sits inside the field like a placeholder and moves up when the field is focused or filled, so the label is never lost while typing. It saves vertical space while staying accessible, because it is a real <label>.\n\nThis demo adds inline validation shown after the user leaves a field, and a password strength meter that updates as you type.',
      prompt:
        'Create a sign-up form with floating label inputs.\n- Fields: name, email, password\n- The label sits inside the input and animates above it on focus or when the field has a value (use :placeholder-shown, no JS for the float)\n- Validate on blur: show an error message under the field and a red border; show a check mark when valid\n- Password strength meter with 4 levels (weak to strong) based on length, digits, symbols and mixed case\n- Show/hide password toggle button\n- Accessible: real <label>, aria-invalid and aria-describedby for errors\nUse HTML, CSS and JavaScript.',
      tips: [
        'Use Zod and React Hook Form for validation.',
        'Add a "confirm password" field that must match.',
        'Shake the field slightly when an error appears.',
      ],
    },
    ja: {
      name: 'フローティングラベルフォーム',
      summary:
        'フォーカスするとラベルが上に浮かぶ入力欄。入力チェックとパスワード強度メーター付き。',
      description:
        'フローティングラベルは、最初はプレースホルダーのように入力欄の中にあるラベルが、フォーカスや入力時に上へ移動するUIです。入力中もラベルが消えないので「何の欄だったか」がわからなくなりません。本物の<label>を使うため、省スペースでありながらアクセシブルです。\n\nこのデモでは、欄から離れたときに表示するエラーメッセージと、入力に合わせて変化するパスワード強度メーターも組み合わせています。',
      prompt:
        'フローティングラベルの入力欄を使った会員登録フォームを作ってください。\n- 項目:名前、メールアドレス、パスワード\n- ラベルは入力欄の中にあり、フォーカス時や値があるときに上へアニメーションで移動する(浮かせる処理は:placeholder-shownを使い、JSなしで)\n- フォーカスが外れたときに入力チェックを行い、エラー時は欄の下にメッセージと赤い枠、正しいときはチェックマークを表示\n- 長さ・数字・記号・大文字小文字の混在から判定する4段階のパスワード強度メーター\n- パスワードの表示/非表示切り替えボタン\n- アクセシブルに:本物の<label>、エラーには aria-invalid と aria-describedby\nHTML・CSS・JavaScriptで実装してください。',
      tips: [
        'React Hook FormとZodで入力チェックして',
        '一致を確認する「パスワード(確認)」欄を追加して',
        'エラーが出たときに欄を少し揺らして',
      ],
    },
  },
};

export default meta;
