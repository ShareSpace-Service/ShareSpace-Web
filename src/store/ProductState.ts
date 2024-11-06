import { MatchingData } from '@/interface/MatchingInterface';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ProductState {
  selectedMenu: string;
  filteredData: MatchingData[];

  setSelectedMenu: (menu: string) => void;
  setFilteredData: (data: MatchingData[]) => void;
}

export const useProductStore = create<ProductState>()(
  devtools(
    (set) => ({
      selectedMenu: '전체',
      filteredData: [],

      setSelectedMenu: (menu) => set({ selectedMenu: menu }),
      setFilteredData: (data) => set({ filteredData: data }),
    }),
    { name: 'ProductStore' }
  )
);
