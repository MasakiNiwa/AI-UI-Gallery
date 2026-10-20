import { ArrowUp, Heart, MessageCircle } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Post {
  id: number;
  author: string;
  text: string;
  likes: number;
  hue: number;
}

const AUTHORS = ['Mina', 'Leo', 'Hana', 'Sam', 'Yuki', 'Aki'];
const TEXTS = [
  'Shipped a new onboarding flow today 🚀',
  'Trying out container queries everywhere.',
  'Dark mode palettes are harder than they look.',
  'Prototype first, polish later.',
  'Accessibility audit done ✅',
  'Coffee and keyboard shortcuts.',
];
const PAGES = 5;
let failures = 0;

/** Mock API: 8 posts per page, random latency, fails once in a while. */
function fetchPage(page: number): Promise<Post[]> {
  return new Promise((resolve, reject) =>
    setTimeout(
      () => {
        if (page === 2 && failures++ === 0) return reject(new Error('Network error'));
        resolve(
          Array.from({ length: 8 }, (_, i) => {
            const id = page * 8 + i;
            return {
              id,
              author: AUTHORS[id % 6],
              text: TEXTS[(id * 5) % 6],
              likes: (id * 37) % 120,
              hue: (id * 47) % 360,
            };
          }),
        );
      },
      600 + Math.random() * 600,
    ),
  );
}

export default function Demo() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'done'>('idle');
  const [showTop, setShowTop] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const sentinel = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const loadMore = useCallback(() => {
    if (busy.current || status === 'done') return;
    busy.current = true;
    setStatus('loading');
    fetchPage(page)
      .then((next) => {
        setPosts((p) => [...p, ...next]);
        setPage((p) => p + 1);
        setStatus(page + 1 >= PAGES ? 'done' : 'idle');
      })
      .catch(() => setStatus('error'))
      .finally(() => (busy.current = false));
  }, [page, status]);

  useEffect(() => {
    if (status === 'error' || status === 'done') return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && loadMore(), {
      root: scroller.current,
      rootMargin: '200px',
    });
    if (sentinel.current) io.observe(sentinel.current);
    return () => io.disconnect();
  }, [loadMore, status]);

  return (
    <div className="relative h-full">
      <div
        ref={scroller}
        onScroll={(e) => setShowTop(e.currentTarget.scrollTop > 400)}
        className="h-full overflow-y-auto px-4 py-4"
      >
        <ul aria-busy={status === 'loading'} className="mx-auto flex max-w-md flex-col gap-3">
          {posts.map((p) => (
            <li key={p.id} className="rounded-2xl border border-line bg-surface p-4">
              <div className="flex items-center gap-2">
                <span
                  className="size-8 rounded-full"
                  style={{ background: `hsl(${p.hue} 60% 65%)` }}
                />
                <p className="text-sm font-medium">{p.author}</p>
                <span className="ml-auto text-xs text-muted">#{p.id + 1}</span>
              </div>
              <p className="mt-2 text-sm">{p.text}</p>
              <div className="mt-3 flex gap-4 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Heart className="size-3.5" aria-hidden /> {p.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="size-3.5" aria-hidden /> {p.likes % 17}
                </span>
              </div>
            </li>
          ))}
          {status === 'loading' &&
            [0, 1].map((i) => (
              <li
                key={`s${i}`}
                className="animate-pulse rounded-2xl border border-line bg-surface p-4"
                aria-hidden
              >
                <div className="flex items-center gap-2">
                  <span className="size-8 rounded-full bg-surface-3" />
                  <span className="h-3 w-20 rounded bg-surface-3" />
                </div>
                <div className="mt-3 h-3 w-4/5 rounded bg-surface-3" />
              </li>
            ))}
        </ul>
        <div ref={sentinel} className="h-px" />
        <div className="mx-auto max-w-md py-4 text-center text-sm">
          {status === 'error' && (
            <p className="text-muted">
              Couldn't load more posts.{' '}
              <button type="button" onClick={loadMore} className="font-medium text-accent">
                Retry
              </button>
            </p>
          )}
          {status === 'done' && <p className="text-muted">You're all caught up 🎉</p>}
          {status === 'idle' && posts.length > 0 && (
            <button
              type="button"
              onClick={loadMore}
              className="rounded-xl border border-line px-4 py-1.5 text-muted hover:text-fg"
            >
              Load more
            </button>
          )}
        </div>
      </div>
      <span className="absolute top-3 left-3 rounded-full bg-surface/90 px-2.5 py-0.5 text-xs text-muted shadow">
        {posts.length} posts · page {page}/{PAGES}
      </span>
      {showTop && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => scroller.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute right-4 bottom-4 flex size-10 items-center justify-center rounded-full bg-accent text-accent-contrast shadow-lg"
        >
          <ArrowUp className="size-5" />
        </button>
      )}
    </div>
  );
}
