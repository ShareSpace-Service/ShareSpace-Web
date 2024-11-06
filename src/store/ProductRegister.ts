import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface FormState {
  title: string;
  category: string;
  period: string;
  description: string;
  files: File[];
  showImages: string[];
  setTitle: (title: string) => void;
  setCategory: (category: string) => void;
  setPeriod: (period: string) => void;
  setDescription: (description: string) => void;
  setFiles: (files: File[]) => void;
  setShowImages: (showImages: string[]) => void;
  clearForm: () => void;
}

export const useProductRegisterStore = create<FormState>()(
  devtools(
    (set) => ({
      title: '',
      category: '',
      period: '',
      description: '',
      files: [],
      showImages: [],
      setTitle: (title) => set({ title }),
      setCategory: (category) => set({ category }),
      setPeriod: (period) => set({ period }),
      setDescription: (description) => set({ description }),
      setFiles: (files) => set({ files }),
      setShowImages: (showImages) => set({ showImages }),
      clearForm: () =>
        set({
          title: '',
          category: '',
          period: '',
          description: '',
          files: [],
          showImages: [],
        }),
    }),
    { name: 'ProductRegisterStore' }
  )
);
