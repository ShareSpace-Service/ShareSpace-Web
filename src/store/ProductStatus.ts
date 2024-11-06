import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface StatusState {
  status: string | null;
  setStatus: (status: string | null) => void;
  clearStatus: () => void;
}

export const useStatusStore = create<StatusState>()(
  devtools(
    (set) => ({
      status: null,
      clearStatus: () => {
        console.log('Clearing Status');
        set({ status: null });
      },
      setStatus: (status) => set({ status }),
    }),
    { name: 'StatusStore' }
  )
);
