import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SessionState = {
  hasHydrated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  isRefreshing: boolean;
  queue: Array<() => void>;
  actions: {
    setSession: (access: string, refresh?: string | null) => void;
    clearSession: () => void;
    setHydrated: (value: boolean) => void;
    beginRefresh: () => void;
    finishRefresh: () => void;
    enqueue: (cb: () => void) => void;
    flushQueue: () => void;
    resetQueue: () => void;
  };
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      accessToken: null,
      refreshToken: null,
      isRefreshing: false,
      queue: [],
      actions: {
        setSession: (access, refresh = null) =>
          set({
            accessToken: access,
            refreshToken: refresh,
          }),
        clearSession: () =>
          set({
            accessToken: null,
            refreshToken: null,
            isRefreshing: false,
          }),
        setHydrated: (value) => set({ hasHydrated: value }),
        beginRefresh: () => set({ isRefreshing: true }),
        finishRefresh: () => set({ isRefreshing: false }),
        enqueue: (cb) => set({ queue: [...get().queue, cb] }),
        flushQueue: () => {
          const queue = get().queue;
          queue.forEach((cb) => cb());
          set({ queue: [] });
        },
        resetQueue: () => set({ queue: [] }),
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
      migrate: (persistedState) => persistedState as Partial<SessionState>,
    },
  ),
);

export const useSessionHydrated = () =>
  useSessionStore((state) => state.hasHydrated);
export const useSessionToken = () =>
  useSessionStore((state) => state.accessToken);
export const useHasSession = () => Boolean(useSessionToken());
export const useSessionActions = () => useSessionStore.getState().actions;
