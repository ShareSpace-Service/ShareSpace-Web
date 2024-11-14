import { create } from 'zustand';

interface NoteState {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  incrementUnreadCount: () => void;
  resetUnreadCount: () => void;
}

const useNoteStore = create<NoteState>((set) => ({
  unreadCount: 0,
  setUnreadCount: (count) => set({ unreadCount: count }),
  incrementUnreadCount: () =>
    set((state) => ({ unreadCount: state.unreadCount + 1 })),
  resetUnreadCount: () => set({ unreadCount: 0 }),
}));

export default useNoteStore; 