import { PlaceEditForm } from '@/interface/PlaceInterface';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PlaceEditProps {
  isEdit: boolean;
  isOpen: boolean;
  formData: PlaceEditForm | null;
  currentImage: string[];
  originalImage: string[];
  originalData: PlaceEditForm | null;

  setIsEdit: (isEdit: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  setFormData: (formData: PlaceEditForm | null) => void;
  setCurrentImage: (images: string[]) => void;
  setOriginalImage: (image: string[]) => void;
  setOriginalData: (data: PlaceEditForm | null) => void;
}

export const usePlaceEditStore = create<PlaceEditProps>()(
  devtools(
    (set) => ({
      isEdit: false,
      isOpen: false,
      formData: null,
      originalData: null,
      currentImage: [],
      originalImage: [],

      setIsEdit: (isEdit: boolean) => set(() => ({ isEdit })),
      setIsOpen: (isOpen: boolean) => set(() => ({ isOpen })),
      setFormData: (formData) => set(() => ({ formData })),
      setOriginalData: (originalData) => set(() => ({ originalData })),
      setCurrentImage: (images) => set(() => ({ currentImage: images })),
      setOriginalImage: (originalImage) => set(() => ({ originalImage })),
    }),
    { name: 'PlaceEditStore' }
  )
);
