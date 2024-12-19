import ButtonProps from '../ui/ButtonProps';
import ImageUpload from './ImageUpload';
import GuestPlaceChoice from '@/modal/GuestPlaceChoice';
import { useModalStore } from '@/store/ModalState';
import { useMatchingIdStore } from '@/store/MatchingId';
import { useProductRegisterStore } from '@/store/ProductRegister';
import { useImageUpload } from '@/hooks/notification/useImageUpload';
import { useProductMutation } from '@/action/post-register';
import { validateProduct } from '@/utils/form/validate';
import { createProductFormData } from '@/utils/form/createFormData';
import { FormField } from './FormField';

function GuestRegisterForm() {
  const { isOpen } = useModalStore();
  const { matchingId } = useMatchingIdStore();
  const productStore = useProductRegisterStore();
  const { files, showImages, handleAddImages, handleDeleteImages } =
    useImageUpload();
  const mutation = useProductMutation();

  // 폼 제출
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 폼 제출 방지

    const validationError = validateProduct({
      title: productStore.title,
      category: productStore.category,
      period: productStore.period,
      description: productStore.description,
    });

    if (validationError) {
      alert(validationError);
      return;
    }

    const formData = createProductFormData({
      ...productStore,
      files,
    });
    mutation.mutate(formData); // mutate 호출로 제품 등록 요청
  };

  return (
    <div className="flex flex-col h-full">
      <form className="space-y-6 h-full" onSubmit={handleSubmit}>
        {/* 파일 선택 */}
        <ImageUpload
          handleAddImages={handleAddImages}
          showImages={showImages}
          handleDeleteImage={handleDeleteImages}
        />

        <FormField {...productStore} />

        {/* onSubmit */}
        <div className="mt-6 pt-4">
          <ButtonProps
            size="full"
            variant="custom"
            title="등록하기"
            type="submit"
          />
        </div>
      </form>
      {isOpen && matchingId !== null && <GuestPlaceChoice />}
    </div>
  );
}

export default GuestRegisterForm;
