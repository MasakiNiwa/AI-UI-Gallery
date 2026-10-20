import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'stepper-wizard',
  category: 'navigation',
  tags: ['stepper', 'wizard', 'multi-step form', 'progress', 'onboarding'],
  difficulty: 'medium',
  tech: ['State machine', 'aria-current="step"'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Multi-step Wizard',
      summary:
        'A step indicator with numbered circles and a connecting progress line, guiding a multi-step form.',
      description:
        'A wizard breaks a long process (sign-up, checkout, onboarding) into short steps. A stepper at the top shows where you are: completed steps get a check mark, the current step is highlighted, and the connecting line fills as you progress.\n\nEach step validates before moving on, Back keeps entered data, and the final step summarizes everything for confirmation. The current step is marked with aria-current="step".',
      prompt:
        'Create a 4-step onboarding wizard: Account → Profile → Preferences → Confirm.\n- A horizontal stepper at the top: numbered circles connected by a line; completed steps show a check mark and the line fills with an animated transition; the current step is highlighted and marked aria-current="step"\n- Each step has a small form; validate required fields before allowing "Next"\n- "Back" and "Next" buttons; the last step shows a summary of all answers and a "Finish" button\n- Completed steps are clickable to jump back\n- Slide the step content left/right depending on direction\n- On mobile, show "Step 2 of 4" and a progress bar instead of the full stepper\nUse React and Tailwind CSS.',
      tips: [
        'Save progress to localStorage so users can resume later.',
        'Make the stepper vertical on the left side.',
        'Use React Hook Form with a Zod schema per step.',
      ],
    },
    ja: {
      name: 'ステップ形式のウィザード',
      summary: '番号付きの円と進捗の線でつないだステップ表示で、複数ステップのフォームを案内する。',
      description:
        'ウィザードは、会員登録・購入手続き・初期設定のような長い手続きを、短いステップに分けるUIです。上部のステッパーが現在地を示し、終わったステップにはチェックマーク、今のステップは強調表示され、進むにつれてつなぎの線が満ちていきます。\n\n各ステップでは次に進む前に入力をチェックし、「戻る」でも入力内容は保たれ、最後のステップで全体を確認できるようにします。現在のステップには aria-current="step" を付けます。',
      prompt:
        'アカウント → プロフィール → 設定 → 確認 の4ステップの初期設定ウィザードを作ってください。\n- 上部に横向きのステッパー:線でつないだ番号付きの円。完了したステップはチェックマークになり、線がアニメーションで満ちる。現在のステップは強調し aria-current="step" を付ける\n- 各ステップに小さなフォーム。必須項目をチェックしてから「次へ」を許可\n- 「戻る」「次へ」ボタン。最後のステップでは全回答のまとめと「完了」ボタン\n- 完了したステップはクリックで戻れる\n- 進む方向に応じてステップの内容を左右にスライド\n- スマホでは、ステッパー全体の代わりに「ステップ 2 / 4」と進捗バーを表示\nReactとTailwind CSSで実装してください。',
      tips: [
        '進捗をlocalStorageに保存して、あとで再開できるようにして',
        'ステッパーを左側に縦向きで配置して',
        'ステップごとにZodのスキーマを使ってReact Hook Formで検証して',
      ],
    },
  },
};

export default meta;
