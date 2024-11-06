import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface RoleState {
  role: string | null;
  setRole: (role: string) => void;
}

export const useRoleStore = create<RoleState>()(
  devtools(
    (set) => ({
      role: null,
      setRole: (role) => set({ role }),
    }),
    { name: 'RoleStore' }
  )
);
