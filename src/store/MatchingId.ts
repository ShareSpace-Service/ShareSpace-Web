import { devtools } from 'zustand/middleware';
import { create } from 'zustand';

interface MatchingIdState {
  matchingId: number | null;
  setMatchingId: (id: number) => void;
  clearMatchingId: () => void;
}

export const useMatchingIdStore = create<MatchingIdState>()(
  devtools(
    (set) => ({
      matchingId: null,
      setMatchingId: (id) => set({ matchingId: id }),
      clearMatchingId: () => set({ matchingId: null }),
    }),
    { name: 'MatchingIdStore' }
  )
);
