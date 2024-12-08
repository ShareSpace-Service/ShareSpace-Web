import { Role } from '@/constants/role';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface RoleState {
  role: Role;
  setRole: (role: string) => void;
  clearRole: () => void;
}

export const useRoleStore = create<RoleState>()(
  devtools(
    (set) => ({
      role: null,
      setRole: (role) => set({ role: role.toUpperCase() as Role }),
      clearRole: () => set({ role: null }),
    }),
    { name: 'RoleStore' }
  )
);
