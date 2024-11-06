import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PlaceIdState {
  placeId: number | null;
  setPlaceId: (id: number) => void;
  clearPlaceId: () => void;
}

export const usePlaceIdStore = create<PlaceIdState>()(
  devtools(
    (set) => ({
      placeId: null,
      setPlaceId: (id) => set({ placeId: id }),
      clearPlaceId: () => set({ placeId: null }),
    }),
    { name: 'PlaceIdStore' }
  )
);
