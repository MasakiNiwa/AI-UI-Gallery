import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'emoji-reactions',
  category: 'buttons',
  tags: ['reactions', 'emoji', 'chat', 'toggle', 'counter', 'popover'],
  difficulty: 'medium',
  tech: ['aria-pressed', 'CSS animation'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Emoji Reactions',
      summary:
        'Chat-style reaction pills with counts, a "+" picker and floating emoji when you react.',
      description:
        'Emoji reactions let people respond to a message or post with a single tap instead of writing a reply. Each reaction is a pill showing the emoji and how many people used it; your own reactions are highlighted. A "+" button opens a small picker to add a new one.\n\nEach pill is a toggle button with aria-pressed and an accessible label such as "👍 12 reactions, you reacted". Reacting plays a small "pop" and a floating emoji animation, and the counter updates optimistically. Hovering a pill can show who reacted.',
      prompt:
        'Add Slack-style emoji reactions under a chat message.\n- Reaction pills with an emoji and a count; pills you reacted to are highlighted with an accent border\n- Click a pill to toggle your reaction (aria-pressed); the count updates immediately with a small bump animation\n- Reacting spawns the emoji floating up and fading out\n- A "+" button opens a picker popover with 8 common emoji; choosing one adds a new pill (or toggles the existing one); closes on Escape / outside click\n- Hovering a pill shows a tooltip with who reacted ("Mina, Leo and 3 others")\n- Remove a pill when its count reaches 0\nUse React and Tailwind CSS.',
      tips: [
        'Add a search box and full emoji picker (e.g. emoji-mart).',
        'Show a long-press reaction bar on mobile.',
        'Sync reactions in real time between users.',
      ],
    },
    ja: {
      name: '絵文字リアクション',
      summary:
        '件数付きのリアクションの粒、「+」の選択パネル、押したときに浮かぶ絵文字を備えたチャット風のリアクション。',
      description:
        '絵文字リアクションは、返信を書く代わりにワンタップでメッセージや投稿に反応できるUIです。各リアクションは絵文字と使った人数を表示する粒(ピル)で、自分が付けたものは強調表示されます。「+」ボタンで小さな選択パネルを開き、新しいリアクションを追加できます。\n\n各ピルは aria-pressed と「👍 12件のリアクション、あなたも反応済み」のようなアクセシブルなラベルを持つ切り替えボタンです。反応すると小さく「ポン」と弾み、絵文字が浮かび上がるアニメーションが再生され、件数はすぐに更新(楽観的更新)されます。ピルにホバーすると、誰が反応したかを表示できます。',
      prompt:
        'Slack風の絵文字リアクションを、チャットメッセージの下に追加してください。\n- 絵文字と件数を表示するリアクションのピル。自分が反応したピルはアクセントカラーの枠で強調\n- ピルをクリックすると自分のリアクションを切り替え(aria-pressed)。件数はすぐに更新し、小さく弾むアニメーション\n- 反応すると、その絵文字が浮かび上がってフェードアウトする\n- 「+」ボタンでよく使う8つの絵文字の選択パネルを開き、選ぶと新しいピルを追加(既にあれば切り替え)。Escや外側のクリックで閉じる\n- ピルにホバーすると、誰が反応したかをツールチップで表示(「Mina、Leoほか3人」)\n- 件数が0になったピルは消す\nReactとTailwind CSSで実装してください。',
      tips: [
        '検索欄付きの本格的な絵文字ピッカー(emoji-martなど)を追加して',
        'スマホでは長押しでリアクションバーを出して',
        'ユーザー間でリアクションをリアルタイムに同期して',
      ],
    },
  },
};

export default meta;
