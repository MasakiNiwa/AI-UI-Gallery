import { useEffect, useSyncExternalStore, type RefObject } from 'react';

/*
 * Decides which single gallery card may run its live demo: the one closest to the centre of the
 * viewport once scrolling has stopped. While the page scrolls, no card is live, so scrolling stays
 * smooth no matter how heavy the demos are.
 */

const cards = new Map<string, Element>();
const listeners = new Set<() => void>();
let active: string | null = null;
let idleTimer: ReturnType<typeof setTimeout> | undefined;
let listening = false;

const IDLE_MS = 250;

function setActive(key: string | null) {
  if (key === active) return;
  active = key;
  listeners.forEach((l) => l());
}

function pickCentered() {
  const mid = window.innerHeight / 2;
  let best: string | null = null;
  let bestDist = Infinity;
  for (const [key, el] of cards) {
    const r = el.getBoundingClientRect();
    const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
    if (visible < r.height * 0.6) continue; // mostly on screen only
    const dist = Math.abs(r.top + r.height / 2 - mid);
    if (dist < bestDist) {
      bestDist = dist;
      best = key;
    }
  }
  setActive(best);
}

function onScroll() {
  setActive(null);
  clearTimeout(idleTimer);
  idleTimer = setTimeout(pickCentered, IDLE_MS);
}

function ensureListening() {
  if (listening) return;
  listening = true;
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}

function stopListeningIfIdle() {
  if (cards.size || !listening) return;
  listening = false;
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onScroll);
  clearTimeout(idleTimer);
  setActive(null);
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** Registers a card element and returns whether it is the one allowed to run its live preview. */
export function useCenteredPreview(key: string, ref: RefObject<Element | null>, enabled: boolean) {
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    cards.set(key, el);
    ensureListening();
    clearTimeout(idleTimer);
    idleTimer = setTimeout(pickCentered, IDLE_MS);
    return () => {
      cards.delete(key);
      if (active === key) setActive(null);
      stopListeningIfIdle();
    };
  }, [key, ref, enabled]);

  return useSyncExternalStore(subscribe, () => enabled && active === key);
}
