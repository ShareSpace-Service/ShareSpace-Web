import { ProfileFormProps } from '@/component/MyPage/form/ProfileForm';
import { useMyPageStore } from '@/store/MyPageState';
import { useEffect } from 'react';

export function useProfileForm(data: ProfileFormProps) {
  const {
    isEdit,
    setIsEdit,
    formData,
    setFormData,
    initialFormData,
    setInitialFormData,
    image, // 이미지 상태 추가
    setImage,
  } = useMyPageStore();

  useEffect(() => {
    if (data?.data && !formData) {
      setFormData(data.data);
      setInitialFormData(data.data);
    }
  }, [data]);

  const startEdit = () => {
    setInitialFormData(formData);
    setImage(null);
    setIsEdit(true);
  };

  const cancelEdit = () => {
    setFormData(initialFormData);
    setImage(null);
    setIsEdit(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleAddressSelect = (address: string) => {
    if (formData) {
      setFormData({
        ...formData,
        location: address,
      });
    }
  };

  const handleImageLoad = (image: string) => {
    setFormData((prev) => ({
      ...prev!,
      image,
    }));
    setImage(null);
  };

  return {
    isEdit,
    formData,
    image,
    startEdit,
    cancelEdit,
    handleInputChange,
    handleImageLoad,
    handleAddressSelect,
  };
}
