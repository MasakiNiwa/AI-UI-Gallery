import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'activity-timeline',
  category: 'data',
  tags: ['timeline', 'activity feed', 'history', 'changelog', 'order tracking'],
  difficulty: 'easy',
  tech: ['CSS', 'Semantic HTML (ol)'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Activity Timeline',
      summary:
        'A vertical timeline of events with icons, timestamps and a progress state for order tracking.',
      description:
        'A timeline lists events in chronological order along a vertical line, with an icon or dot per event. It is used for activity feeds, changelogs, project history and order or delivery tracking, where completed, current and upcoming steps look different.\n\nSemantically it is an ordered list (<ol>), with machine-readable dates in <time datetime>. The connecting line is drawn with a pseudo-element or a border, and the current step can pulse gently to attract attention.',
      prompt:
        'Create a vertical order-tracking timeline.\n- Steps: Order placed → Payment confirmed → Shipped → Out for delivery → Delivered\n- Each step: a circular icon on a vertical line, a title, a description and a timestamp in a <time datetime> element\n- Completed steps are filled with the accent color and connected by a solid line; the current step has a pulsing ring; upcoming steps are gray with a dashed line\n- Use an <ol> for semantics and aria-current="step" on the current step\n- A "Simulate progress" button advances the current step with a smooth transition\n- Compact layout that works on mobile\nUse HTML, Tailwind CSS and a little JavaScript.',
      tips: [
        'Make it a horizontal timeline on wide screens.',
        'Group events by day with sticky date headers.',
        'Add expandable details to each event.',
      ],
    },
    ja: {
      name: 'アクティビティのタイムライン',
      summary:
        'アイコンと時刻付きで出来事を縦に並べたタイムライン。配送状況の追跡のような進捗表示にも。',
      description:
        'タイムラインは、出来事を時系列で縦の線に沿って並べ、それぞれにアイコンや点を付けるUIです。アクティビティフィード、更新履歴、プロジェクトの経過、注文や配送の追跡などに使い、完了・進行中・未着手のステップを見た目で区別します。\n\n意味的には順序付きリスト(<ol>)で、日時は機械が読める <time datetime> で示します。つなぎの線は疑似要素か枠線で描き、進行中のステップは控えめに脈打たせて目を引くこともできます。',
      prompt:
        '縦向きの注文追跡タイムラインを作ってください。\n- ステップ:注文完了 → 支払い確認 → 発送 → 配達中 → 配達完了\n- 各ステップ:縦線上の円形アイコン、タイトル、説明、<time datetime> 要素で示す時刻\n- 完了したステップはアクセントカラーで塗り実線でつなぐ。進行中のステップは脈打つリング。未着手は灰色で破線\n- 意味付けのため <ol> を使い、進行中のステップに aria-current="step"\n- 「進捗を進める」ボタンで、なめらかなトランジションとともに現在のステップを進める\n- スマホでも使えるコンパクトなレイアウト\nHTML、Tailwind CSS、少しのJavaScriptで実装してください。',
      tips: [
        '広い画面では横向きのタイムラインにして',
        '日付ごとにまとめ、日付の見出しを固定表示して',
        '各出来事に開閉できる詳細を追加して',
      ],
    },
  },
};

export default meta;
