import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SessionState = {
  hasHydrated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  actions: {
    setSession: (accessToken: string, refreshToken?: string | null) => void;
    clearSession: () => void;
    setHydrated: (value: boolean) => void;
  };
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      accessToken: null,
      refreshToken: null,
      actions: {
        setSession: (accessToken, refreshToken = null) => {
          set({
            accessToken,
            refreshToken,
          });
        },
        clearSession: () => {
          set({ accessToken: null, refreshToken: null });
        },
        setHydrated: (value) => set({ hasHydrated: value }),
      },
    }),
    {
      name: 'session-store-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage: () => (state) => {
        state?.actions.setHydrated(true);
      },
      version: 1,
      migrate: (persisted) => persisted as Partial<SessionState>,
    },
  ),
);

export const useSessionHydrated = () =>
  useSessionStore((state) => state.hasHydrated);
export const useSessionToken = () =>
  useSessionStore((state) => state.accessToken);
export const useSessionActions = () =>
  useSessionStore((state) => state.actions);
export const useHasSession = () => Boolean(useSessionToken());
