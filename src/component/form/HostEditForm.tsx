import { usePlaceEditStore } from '@/store/PlaceEdit';
import { useMutation } from '@tanstack/react-query';
import { fetchPlaceForm } from '@/api/Place';
import { PlaceEditData } from '@/interface/PlaceInterface';
import { useInitForm } from '@/hooks/place/usePlaceForm';
import { useImageHandler } from '@/hooks/place/usePlaceImage';
import PlaceEditButton from '../MyPage/edit/PlaceEditButton';
import ImageSlider from '../place/form/ImageSlider';
import FormInput from '../place/form/FormInput';
import SaveButton from '../place/form/SaveButton';
import PlaceAddressModal from '@/modal/PlaceAddressModal';

function HostEditForm({ data }: { data: PlaceEditData }) {
  const { isEdit, setIsEdit, formData } = usePlaceEditStore();
  useInitForm(data); // 2. 불러온 장소 정보를 formData에 저장한다.
  const { objectUrls } = useImageHandler(); // 이미지 관련 로직 분리

  const mutation = useMutation({
    mutationFn: (formData: FormData) => fetchPlaceForm(formData),

    onSuccess: () => {
      // console.log('장소가 정상적으로 수정되었습니다.', data);

      // 성공 시 URL 객체들 정리
      objectUrls.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      objectUrls.current = [];
      setIsEdit(false);
      alert('장소 수정이 성공적으로 완료되었습니다!');
    },
    onError: (error: Error) => {
      // console.error('장소 수정 중 오류가 발생했습니다.', error);
      alert(error.message || '장소 수정에 실패했습니다.');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData && isEdit) {
      const formDataSubmit = new FormData();
      if (formData.title.length > 50) {
        alert('제목은 50자 이내로 작성해주세요');
        return;
      }

      if (formData.description.length > 100) {
        alert('요청사항은 100자 이내로 작성해주세요');
        return;
      }

      formDataSubmit.append('title', formData.title);
      formDataSubmit.append('location', formData.location);
      formDataSubmit.append('category', formData.category);
      formDataSubmit.append('description', formData.description);
      formDataSubmit.append('period', formData.period.toString()); // string으로 변환되서 넘겨야됨

      // 삭제할 이미지가 있는 경우에만 전송
      if (formData.deleteImageUrl && formData.deleteImageUrl.length > 0) {
        formData.deleteImageUrl.forEach((url) => {
          formDataSubmit.append('deleteImageUrl', url);
        });
      }

      // 새로 추가할 이미지가 있는 경우에만 전송
      if (formData.newImageUrl && formData.newImageUrl.length > 0) {
        formData.newImageUrl.forEach((file) => {
          formDataSubmit.append('newImageUrl', file);
        });
      }
      try {
        // mutation 실행
        await mutation.mutateAsync(formDataSubmit);
      } catch (error) {
        console.error('Update failed:', error);
      }
    }
  };

  return (
    <form
      className="flex flex-col max-w-2xl mx-auto p-6 pt-0 gap-10"
      onSubmit={handleSubmit}
    >
      {/* 상단 버튼 영역 */}
      <PlaceEditButton />

      {/* 이미지 슬라이더 */}
      <ImageSlider />

      {/* 폼 필드 영역 */}
      <FormInput />

      {/* 저장 버튼 */}
      <SaveButton />

      {/* 주소 선택 모달 */}
      <PlaceAddressModal />
    </form>
  );
}
export default HostEditForm;
