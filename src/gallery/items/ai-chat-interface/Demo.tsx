import { ArrowDown, ArrowUp, Sparkles, Square } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { DemoProps } from '../../types';

interface Msg {
  role: 'user' | 'assistant';
  text: string;
}

const SUGGESTIONS = ['Design a pricing page', 'Explain glassmorphism', 'Make a dark color palette'];
const REPLIES = [
  'Great idea! I would start with three plans side by side, highlight the middle one as "Most popular", and add a monthly/yearly toggle above them. Want me to write the component?',
  'Glassmorphism uses semi-transparent surfaces with backdrop-filter: blur() to look like frosted glass. It works best over colorful backgrounds with a subtle light border.',
  'For a calm dark palette, use a near-black blue background (#14161a), slightly lighter surfaces, muted text (#8a919b) and a desaturated accent like #8a9cbf.',
];

export default function Demo({ mode }: DemoProps) {
  const [messages, setMessages] = useState<Msg[]>(
    mode === 'preview'
      ? [
          { role: 'user', text: 'Explain glassmorphism' },
          { role: 'assistant', text: REPLIES[1] },
        ]
      : [],
  );
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [atBottom, setAtBottom] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);
  const stopRef = useRef(false);
  const replyIndex = useRef(0);

  useEffect(() => {
    const el = listRef.current;
    if (el && atBottom) el.scrollTop = el.scrollHeight;
  }, [messages, typing, atBottom]);

  const send = async (text: string) => {
    if (!text.trim() || streaming || typing) return;
    setMessages((m) => [...m, { role: 'user', text: text.trim() }]);
    setInput('');
    setAtBottom(true);
    setTyping(true);
    await new Promise((r) => setTimeout(r, 900));
    setTyping(false);
    setStreaming(true);
    stopRef.current = false;
    const words = REPLIES[replyIndex.current++ % REPLIES.length].split(' ');
    setMessages((m) => [...m, { role: 'assistant', text: '' }]);
    for (const w of words) {
      if (stopRef.current) break;
      await new Promise((r) => setTimeout(r, 40));
      setMessages((m) => {
        const copy = [...m];
        const last = copy[copy.length - 1];
        copy[copy.length - 1] = { ...last, text: last.text ? `${last.text} ${w}` : w };
        return copy;
      });
    }
    setStreaming(false);
  };

  return (
    <div className="flex h-full flex-col bg-bg">
      <style>{`@keyframes demo-dot{0%,80%,100%{opacity:.25;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}`}</style>
      <header className="flex items-center gap-3 border-b border-line bg-surface px-4 py-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-teal-400 text-white">
          <Sparkles className="size-4" aria-hidden />
        </span>
        <div>
          <p className="text-sm font-semibold">UI Assistant</p>
          <p className="flex items-center gap-1 text-xs text-muted">
            <span className="size-1.5 rounded-full bg-emerald-500" /> Online
          </p>
        </div>
      </header>
      <div
        ref={listRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 40);
        }}
        className="relative flex-1 space-y-3 overflow-y-auto p-4"
        aria-live="polite"
      >
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <p className="text-lg font-semibold">How can I help with your UI today?</p>
            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm hover:bg-surface-2"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className="flex justify-end">
              <p className="max-w-[80%] rounded-2xl rounded-br-md bg-accent px-4 py-2 text-sm whitespace-pre-wrap text-accent-contrast">
                {m.text}
              </p>
            </div>
          ) : (
            <div key={i} className="flex gap-2">
              <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-teal-400 text-white">
                <Sparkles className="size-3.5" aria-hidden />
              </span>
              <p className="max-w-[80%] rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-2 text-sm leading-relaxed">
                {m.text}
              </p>
            </div>
          ),
        )}
        {typing && (
          <div className="flex gap-2" aria-label="Assistant is typing">
            <span className="size-7 shrink-0 rounded-full bg-gradient-to-br from-indigo-400 to-teal-400" />
            <span className="flex gap-1 rounded-2xl border border-line bg-surface px-4 py-3">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="size-1.5 rounded-full bg-muted"
                  style={{ animation: `demo-dot 1.2s ${d * 0.15}s infinite` }}
                />
              ))}
            </span>
          </div>
        )}
      </div>
      {!atBottom && (
        <button
          type="button"
          onClick={() => setAtBottom(true)}
          aria-label="Jump to latest"
          className="mx-auto -mt-12 mb-2 flex size-8 items-center justify-center rounded-full border border-line bg-surface shadow"
        >
          <ArrowDown className="size-4" />
        </button>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
        className="border-t border-line bg-surface p-3"
      >
        <div className="flex items-end gap-2 rounded-2xl border border-line bg-bg p-2 focus-within:border-accent">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                void send(input);
              }
            }}
            rows={1}
            placeholder="Ask about any UI…"
            aria-label="Message"
            className="max-h-32 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none [field-sizing:content] placeholder:text-muted"
          />
          {streaming ? (
            <button
              type="button"
              onClick={() => (stopRef.current = true)}
              aria-label="Stop"
              className="flex size-9 items-center justify-center rounded-xl bg-fg text-bg"
            >
              <Square className="size-3.5 fill-current" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Send"
              className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-contrast disabled:opacity-40"
            >
              <ArrowUp className="size-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
