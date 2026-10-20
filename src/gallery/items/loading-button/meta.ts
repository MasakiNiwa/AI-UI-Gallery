import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'loading-button',
  category: 'buttons',
  tags: ['button', 'loading', 'spinner', 'success state', 'submit'],
  difficulty: 'easy',
  tech: ['CSS transition', 'ARIA live region'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Stateful Submit Button',
      summary: 'A button that morphs from idle to a spinner, then to a success or error state.',
      description:
        'A stateful button shows the progress of the action it triggers right where the user clicked. After clicking, the label is replaced by a spinner and the button is disabled to prevent double submission; when the request finishes it briefly shows a check mark (or an error) before returning to normal.\n\nKeep the button width stable so the layout does not jump, and announce the state changes through aria-live so screen reader users also know what happened.',
      prompt:
        'Create a "Save changes" button with four states: idle, loading, success and error.\n- On click: show a spinner, change the label to "Saving…", disable the button and set aria-busy\n- Simulate a request that takes 1.5 s and randomly succeeds (80%) or fails\n- Success: green background with a check mark and "Saved"; error: red with "Try again"\n- Return to idle after 2 seconds\n- Keep the button width fixed so nothing shifts; animate colors with CSS transitions\n- Announce state changes in an aria-live region\nUse React and Tailwind CSS.',
      tips: [
        'Add a progress bar that fills inside the button.',
        'Make the button shrink into a circle while loading.',
        'Connect it to a real fetch() call with error handling.',
      ],
    },
    ja: {
      name: '状態が変わる送信ボタン',
      summary: '押すとスピナーに変わり、完了すると成功やエラーの表示に切り替わるボタン。',
      description:
        '状態が変わるボタンは、押した操作の進み具合をその場で見せるUIです。クリックするとラベルがスピナーに変わり、二重送信を防ぐためにボタンを無効化します。処理が終わると、チェックマーク(またはエラー)を少しのあいだ表示してから元に戻ります。\n\nレイアウトがずれないようボタンの幅は固定し、状態の変化は aria-live で伝えて、スクリーンリーダーの利用者にも結果がわかるようにします。',
      prompt:
        '待機・読み込み中・成功・エラーの4つの状態を持つ「変更を保存」ボタンを作ってください。\n- クリックするとスピナーを表示し、ラベルを「保存中…」に変え、ボタンを無効化して aria-busy を設定\n- 1.5秒かかり、ランダムに成功(80%)か失敗するリクエストを模擬する\n- 成功:緑の背景にチェックマークと「保存しました」、エラー:赤で「再試行」\n- 2秒後に待機状態へ戻る\n- ボタンの幅を固定して何もずれないようにし、色はCSSトランジションで変化させる\n- 状態の変化を aria-live 領域で読み上げる\nReactとTailwind CSSで実装してください。',
      tips: [
        'ボタンの中で満ちていくプログレスバーを付けて',
        '読み込み中はボタンが縮んで円になるようにして',
        '実際の fetch() 呼び出しとエラー処理につないで',
      ],
    },
  },
};

export default meta;
