import { PlaceEditForm } from '@/interface/PlaceInterface';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PlaceEditProps {
  isEdit: boolean;
  isOpen: boolean;
  formData: PlaceEditForm | null;
  currentImage: string[];

  setIsEdit: (isEdit: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  setFormData: (formData: PlaceEditForm | null) => void;
  setCurrentImage: (images: string[]) => void;
}

export const usePlaceEditStore = create<PlaceEditProps>()(
  devtools(
    (set) => ({
      isEdit: false,
      isOpen: false,
      formData: null,
      currentImage: [],

      setIsEdit: (isEdit: boolean) => set(() => ({ isEdit })),
      setIsOpen: (isOpen: boolean) => set(() => ({ isOpen })),
      setFormData: (formData) => set(() => ({ formData })),
      setCurrentImage: (images) => set(() => ({ currentImage: images })),
    }),
    { name: 'PlaceEditStore' }
  )
);
