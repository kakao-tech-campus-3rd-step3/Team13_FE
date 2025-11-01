import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type User = {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
};

type AppState = {
  hasHydrated: boolean;
  user: User | null;
  notificationsEnabled: boolean;
  emailVerified: boolean;
  sessionExpired: boolean;
  actions: {
    setUser: (user: User) => void;
    logout: () => void;
    toggleNotifications: () => void;
    setHydrated: (value: boolean) => void;
    resetAll: () => void;
    setEmailVerified: (value: boolean) => void;
    expireSession: () => void;
    clearSessionExpired: () => void;
  };
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      user: null,
      notificationsEnabled: true,
      emailVerified: true,
      sessionExpired: false,
      actions: {
        setUser: (user) => set({ user, sessionExpired: false }),
        logout: () => {
          const { resetAll } = get().actions;
          resetAll();
        },
        toggleNotifications: () =>
          set({ notificationsEnabled: !get().notificationsEnabled }),
        setHydrated: (value) => set({ hasHydrated: value }),
        resetAll: () =>
          set({
            user: null,
            notificationsEnabled: true,
            emailVerified: true,
            sessionExpired: false,
          }),
        setEmailVerified: (value) => set({ emailVerified: value }),
        expireSession: () => set({ sessionExpired: true }),
        clearSessionExpired: () => set({ sessionExpired: false }),
      },
    }),
    {
      name: 'app-store-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        notificationsEnabled: state.notificationsEnabled,
        emailVerified: state.emailVerified,
      }),
      onRehydrateStorage: () => (state) => {
        state?.actions.setHydrated(true);
      },
      version: 1,
      migrate: (persistedState) => persistedState as Partial<AppState>,
    },
  ),
);

export const useHasHydrated = () => useAppStore((state) => state.hasHydrated);
export const useCurrentUser = () => useAppStore((state) => state.user);
export const useIsLoggedIn = () => useAppStore((state) => Boolean(state.user));
export const useNotificationsEnabled = () =>
  useAppStore((state) => state.notificationsEnabled);
export const useActions = () => useAppStore((state) => state.actions);
export const useEmailVerified = () =>
  useAppStore((state) => state.emailVerified);
export const useSessionExpired = () =>
  useAppStore((state) => state.sessionExpired);
