import { UserData } from '@/interface/MyPageInterface';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface MyPageProps {
  isEdit: boolean;
  formData: UserData | null;
  image: File | null;

  setIsEdit: (isEdit: boolean) => void;
  setFormData: (
    formData: UserData | null | ((prev: UserData | null) => UserData | null)
  ) => void;
  setImage: (image: File | null) => void;
}

export const useMyPageStore = create<MyPageProps>()(
  devtools(
    (set) => ({
      isEdit: false,
      formData: null,
      image: null,

      setIsEdit: (isEdit: boolean) => set({ isEdit }),
      setFormData: (formData) =>
        set((state) => ({
          formData:
            typeof formData === 'function'
              ? (formData as (prev: UserData | null) => UserData | null)(
                  state.formData
                )
              : formData,
        })),
      setImage: (image: File | null) => set({ image }),
    }),
    { name: 'MyPageStore' }
  )
);
