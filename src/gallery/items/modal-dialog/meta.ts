import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'modal-dialog',
  category: 'feedback',
  tags: ['modal', 'dialog', 'popup', 'confirm', 'bottom sheet'],
  difficulty: 'easy',
  tech: ['<dialog> element', 'CSS animation'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Modal Dialog',
      summary:
        'A confirmation dialog that dims the page and traps focus, built on the native <dialog> element.',
      description:
        'A modal dialog interrupts the user to ask for a decision or show important information; the rest of the page is dimmed and cannot be used until the dialog is closed. Use it sparingly, for things like confirming a destructive action.\n\nThe native <dialog> element with showModal() provides the backdrop, focus trapping, the Escape key and top-layer rendering for free. CSS animates the entrance, and on narrow screens the dialog can become a bottom sheet.',
      prompt:
        'Create a "Delete project?" confirmation modal using the native <dialog> element.\n- Open it with showModal() from a "Delete" button\n- Dimmed, slightly blurred backdrop; clicking the backdrop closes the dialog\n- Icon, title, explanation, and Cancel / Delete buttons (Delete is red)\n- Escape closes it; focus moves into the dialog and returns to the trigger button after closing\n- Scale-and-fade entrance animation\n- On screens narrower than 640px, show it as a bottom sheet sliding up from the bottom\nUse HTML, CSS and JavaScript.',
      tips: [
        'Require typing the project name before Delete is enabled.',
        'Add a form inside the dialog and return its value.',
        'Use the Radix UI Dialog component in React.',
      ],
    },
    ja: {
      name: 'モーダルダイアログ',
      summary:
        'ページを暗くしてフォーカスを閉じ込める確認ダイアログ。ネイティブの<dialog>要素で実装。',
      description:
        'モーダルダイアログは、ユーザーの操作を一時的に止めて判断を求めたり、重要な情報を伝えたりするUIです。閉じるまで背後のページは暗くなり操作できません。削除のような取り消せない操作の確認など、本当に必要な場面に絞って使います。\n\nネイティブの<dialog>要素を showModal() で開くと、背景の暗幕、フォーカスの閉じ込め、Escキーでの終了、最前面への表示がすべて標準で手に入ります。出現アニメーションはCSSで付け、狭い画面では下から出る「ボトムシート」にすることもできます。',
      prompt:
        'ネイティブの<dialog>要素を使って「プロジェクトを削除しますか?」の確認モーダルを作ってください。\n- 「削除」ボタンから showModal() で開く\n- 背景は暗く少しぼかし、背景をクリックすると閉じる\n- アイコン、タイトル、説明文、「キャンセル」「削除」ボタン(削除は赤)\n- Escキーで閉じる。開いたらダイアログ内にフォーカスが移り、閉じたら元のボタンに戻る\n- 拡大+フェードの出現アニメーション\n- 幅640px未満の画面では、下からスライドして出るボトムシートとして表示\nHTML・CSS・JavaScriptで実装してください。',
      tips: [
        'プロジェクト名を入力しないと削除ボタンが押せないようにして',
        'ダイアログ内にフォームを置いて値を返すようにして',
        'ReactでRadix UIのDialogコンポーネントを使って',
      ],
    },
  },
};

export default meta;
