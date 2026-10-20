import { useSyncExternalStore } from 'react';
import { useSettings } from '@/stores/settings';

const query = () => window.matchMedia('(prefers-reduced-motion: reduce)');

/** True when either the OS or the in-app setting asks for less motion. JS-driven demos should honor it. */
export function useReducedMotion() {
  const setting = useSettings((s) => s.reduceMotion);
  const os = useSyncExternalStore(
    (cb) => {
      const mq = query();
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => query().matches,
  );
  return setting || os;
}
