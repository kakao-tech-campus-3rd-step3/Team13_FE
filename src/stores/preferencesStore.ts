import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type TimeSlotKey =
  | 'MORNING_EARLY'
  | 'MORNING_LATE'
  | 'NOON_EARLY'
  | 'NOON_LATE'
  | 'EVENING_EARLY'
  | 'EVENING_LATE';

export type TimePeriod = 'MORNING' | 'NOON' | 'EVENING';

export const mapSlotToPeriod = (slot: TimeSlotKey): TimePeriod => {
  if (slot.startsWith('MORNING')) return 'MORNING';
  if (slot.startsWith('NOON')) return 'NOON';
  return 'EVENING';
};

type PrefState = {
  hasHydrated: boolean;
  sports: number[];
  timeSlots: TimeSlotKey[];
  actions: {
    toggleSport: (id: number) => void;
    resetSports: () => void;
    toggleTimeSlot: (key: TimeSlotKey) => void;
    resetTimeSlots: () => void;
    resetAll: () => void;
    setHydrated: (value: boolean) => void;
  };
};

export const usePreferencesStore = create<PrefState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      sports: [],
      timeSlots: [],
      actions: {
        toggleSport: (id) => {
          const current = get().sports;
          const next = current.includes(id)
            ? current.filter((sportId) => sportId !== id)
            : [...current, id];
          set({ sports: next });
        },
        resetSports: () => set({ sports: [] }),
        toggleTimeSlot: (key) => {
          const current = get().timeSlots;
          const next = current.includes(key)
            ? current.filter((slot) => slot !== key)
            : [...current, key];
          set({ timeSlots: next });
        },
        resetTimeSlots: () => set({ timeSlots: [] }),
        resetAll: () => set({ sports: [], timeSlots: [] }),
        setHydrated: (value) => set({ hasHydrated: value }),
      },
    }),
    {
      name: 'preferences-store-v1',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.actions.setHydrated(true);
      },
      partialize: (state) => ({
        sports: state.sports,
        timeSlots: state.timeSlots,
      }),
      version: 1,
      migrate: (persistedState) => persistedState as Partial<PrefState>,
    },
  ),
);

export const usePrefHydrated = () =>
  usePreferencesStore((state) => state.hasHydrated);
export const useSelectedSports = () =>
  usePreferencesStore((state) => state.sports);
export const useSelectedTimeSlots = () =>
  usePreferencesStore((state) => state.timeSlots);
export const usePrefActions = () =>
  usePreferencesStore((state) => state.actions);
export const useOnboardingComplete = () =>
  usePreferencesStore(
    (state) => state.sports.length > 0 && state.timeSlots.length > 0,
  );
