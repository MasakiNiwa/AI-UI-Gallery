import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'ai-chat-interface',
  category: 'layout',
  tags: ['chat', 'ai assistant', 'streaming', 'messages', 'typing indicator', 'chatbot'],
  difficulty: 'medium',
  tech: ['Streaming text', 'Auto-resizing textarea', 'aria-live'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'AI Chat Interface',
      summary:
        'A chat screen with message bubbles, a typing indicator, streamed replies and suggestion chips.',
      description:
        'The AI chat interface has become one of the most requested UIs. Messages from the user and the assistant appear as bubbles, the assistant\'s reply streams in word by word after a short "typing" indicator, and suggestion chips help people get started.\n\nThe input is an auto-growing textarea where Enter sends and Shift+Enter adds a new line. The message list scrolls to the bottom when new content arrives (unless the user has scrolled up), and replies are announced to screen readers through an aria-live region. A Stop button can cancel a reply mid-stream.',
      prompt:
        'Build an AI chat interface.\n- Header with assistant name and status; message list; input area at the bottom\n- User messages right-aligned in accent-colored bubbles; assistant messages left-aligned with an avatar\n- When the user sends a message: show a three-dot typing indicator, then stream a mock reply word by word (about 40ms per word)\n- A Stop button replaces Send while streaming and cancels the reply\n- Auto-growing textarea (max 5 lines): Enter sends, Shift+Enter inserts a newline; disable Send when empty\n- Suggestion chips shown before the first message\n- Auto-scroll to the newest message unless the user scrolled up; show a "jump to latest" button in that case\n- Announce new assistant messages with aria-live="polite"\nUse React and Tailwind CSS.',
      tips: [
        'Render Markdown and code blocks with syntax highlighting in replies.',
        'Connect it to a real streaming API with fetch and ReadableStream.',
        'Add copy and regenerate buttons under each reply.',
      ],
    },
    ja: {
      name: 'AIチャット画面',
      summary:
        'メッセージの吹き出し、入力中インジケーター、ストリーミング表示の返答、提案チップを備えたチャット画面。',
      description:
        'AIチャット画面は、今もっとも依頼の多いUIのひとつです。ユーザーとアシスタントのメッセージは吹き出しで表示され、アシスタントの返答は短い「入力中」表示のあと単語ごとに流れるように現れ、提案チップが最初の一歩を助けます。\n\n入力欄は自動で高さが伸びるテキストエリアで、Enterで送信、Shift+Enterで改行します。新しい内容が届くとメッセージ一覧は一番下までスクロールし(ユーザーが上にスクロールしているときを除く)、返答は aria-live 領域でスクリーンリーダーにも伝えます。返答の途中で止められる停止ボタンも用意します。',
      prompt:
        'AIチャット画面を作ってください。\n- アシスタント名と状態を表示するヘッダー、メッセージ一覧、下部の入力エリア\n- ユーザーのメッセージはアクセントカラーの吹き出しで右寄せ、アシスタントのメッセージはアバター付きで左寄せ\n- ユーザーが送信したら、3つの点の入力中インジケーターを表示し、その後に仮の返答を単語ごと(1語40msほど)にストリーミング表示\n- ストリーミング中は送信ボタンが停止ボタンに変わり、返答を中断できる\n- 自動で伸びるテキストエリア(最大5行):Enterで送信、Shift+Enterで改行。空のときは送信を無効化\n- 最初のメッセージの前に提案チップを表示\n- 最新のメッセージへ自動スクロール。ただしユーザーが上へスクロールしている場合はせず、「最新へ」ボタンを表示\n- アシスタントの新しいメッセージは aria-live="polite" で読み上げる\nReactとTailwind CSSで実装してください。',
      tips: [
        '返答のMarkdownとコードブロックをシンタックスハイライト付きで表示して',
        'fetchとReadableStreamで本物のストリーミングAPIにつないで',
        '各返答の下にコピーと再生成のボタンを付けて',
      ],
    },
  },
};

export default meta;
