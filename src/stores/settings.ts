import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemePreference = 'system' | 'light' | 'dark';
export type LanguagePreference = 'auto' | 'en' | 'ja';

export interface SettingsState {
  theme: ThemePreference;
  language: LanguagePreference;
  /** Render live, scaled-down demos inside gallery cards. */
  livePreviews: boolean;
  /** Minimize animations across the app and demos. */
  reduceMotion: boolean;
  set: <K extends keyof SettingsValues>(key: K, value: SettingsValues[K]) => void;
  reset: () => void;
}

export type SettingsValues = Omit<SettingsState, 'set' | 'reset'>;

export const DEFAULT_SETTINGS: SettingsValues = {
  theme: 'system',
  language: 'auto',
  livePreviews: true,
  reduceMotion: false,
};

/** Every localStorage key this app writes starts with this prefix (used by "Clear all data"). */
export const STORAGE_PREFIX = 'ai-ui-gallery:';

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      set: (key, value) => set({ [key]: value } as Partial<SettingsState>),
      reset: () => set(DEFAULT_SETTINGS),
    }),
    { name: `${STORAGE_PREFIX}settings`, version: 1 },
  ),
);

export function clearAllStoredData() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(STORAGE_PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    // Storage may be unavailable (private mode); nothing to clear.
  }
  useSettings.getState().reset();
  // Imported lazily to avoid a circular import (library.ts uses STORAGE_PREFIX from this file).
  void import('./library').then(({ useLibrary }) => useLibrary.getState().reset());
}
