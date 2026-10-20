import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_PREFIX } from './settings';

const MAX_RECENT = 12;

interface LibraryState {
  /** Favorite item ids, most recently added first. */
  favorites: string[];
  /** Recently viewed item ids, most recent first. */
  recent: string[];
  toggleFavorite: (id: string) => void;
  addRecent: (id: string) => void;
  clearRecent: () => void;
  reset: () => void;
}

export const useLibrary = create<LibraryState>()(
  persist(
    (set) => ({
      favorites: [],
      recent: [],
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((f) => f !== id)
            : [id, ...s.favorites],
        })),
      addRecent: (id) =>
        set((s) => ({ recent: [id, ...s.recent.filter((r) => r !== id)].slice(0, MAX_RECENT) })),
      clearRecent: () => set({ recent: [] }),
      reset: () => set({ favorites: [], recent: [] }),
    }),
    { name: `${STORAGE_PREFIX}library`, version: 1 },
  ),
);
