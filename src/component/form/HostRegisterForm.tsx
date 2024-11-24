import ButtonProps from '../ui/ButtonProps';
import ImageUpload from './ImageUpload';
import FormField from '../ui/field/FormField';
import { useImageUpload } from '@/hooks/notification/useImageUpload';
import { useProductRegisterStore } from '@/store/ProductRegister';
import { usePlaceRegister } from '@/action/post-place';

function HostRegisterForm({ email }: { email: string }) {
  // 상태 정의
  const { title, category, period, description } = useProductRegisterStore();
  const { handleAddImages, files, showImages, handleDeleteImages } =
    useImageUpload();
  // React Query mutation 훅
  const mutation = usePlaceRegister();

  // 폼 유효성 검사 로직 분리
  const validateForm = () => {
    if (!title || !category || !period) {
      alert('항목을 입력해주세요.');
      return false;
    }

    if (title.length > 50) {
      alert('제목은 50자 이내로 작성해주세요.');
      return false;
    }

    if (description.length > 100) {
      alert('요청사항은 100자 이내로 작성해주세요');
      return false;
    }

    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 폼 제출 방지

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('title', title);
    formData.append('category', category);
    formData.append('period', period);
    description && formData.append('description', description);
    files.forEach(
      (file) => formData.append('imageUrl', file) // 이미지 파일 추가
    );
    mutation.mutate(formData);
  };
  return (
    <div className="flex flex-col flex-1 px-6 pt-3">
      <form className="space-y-6 flex flex-col flex-1" onSubmit={handleSubmit}>
        <div className="space-y-8 flex-1">
          {/* 파일 선택 */}
          <ImageUpload
            handleAddImages={handleAddImages}
            showImages={showImages}
            handleDeleteImage={handleDeleteImages}
          />
          {/* Form 항목 */}
          <FormField />

          {/* onSubmit */}
          <div className="mt-6 pt-4">
            <ButtonProps
              size="full"
              variant="custom"
              title={mutation.isPending ? '등록 중...' : '등록하기'}
              type="submit"
              disabled={mutation.isPending}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default HostRegisterForm;
