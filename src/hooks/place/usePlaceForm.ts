import { PlaceEditData } from '@/interface/PlaceInterface';
import { usePlaceEditStore } from '@/store/PlaceEdit';
import { useEffect } from 'react';
import { useImageHandler } from './usePlaceImage';
import { validatePeriod } from '@/lib/PeriodFormat';
import { useModalStore } from '@/store/ModalState';

// 초기화 로직
export function useInitForm(data?: PlaceEditData) {
  const { setFormData, setOriginalData, setCurrentImage, setOriginalImage } =
    usePlaceEditStore();

  // 2. 불러온 장소 정보를 formData에 저장한다.
  useEffect(() => {
    if (data) {
      const formattedData = {
        title: data.title,
        location: data.location,
        category: data.category,
        period: data.period,
        description: data.description,
        deleteImageUrl: [],
        newImageUrl: [],
      };
      setFormData(formattedData);
      setOriginalData(formattedData);
      setCurrentImage(data.imageUrl);
      setOriginalImage(data.imageUrl);
    }
  }, [data, setFormData, setOriginalData, setOriginalImage]);
}

export function useEditHandler() {
  const {
    formData,
    setFormData,
    isEdit,
    setIsEdit,
    currentImage,
    setCurrentImage,
    originalData,
    setOriginalData,
    originalImage,
    setOriginalImage,
  } = usePlaceEditStore();
  const { objectUrls } = useImageHandler();
  const { openModal } = useModalStore();

  // 수정 버튼 클릭 시
  const handleEditClick = () => {
    if (formData) {
      setOriginalData(formData);
      setOriginalImage(currentImage);
    }
    setIsEdit(true);
  };

  // 취소 버튼 클릭 시
  const handleCancelClick = () => {
    // console.log('취소 버튼 클릭 - Cleanup 시작');
    // console.log('정리할 URL 목록:', objectUrls.current);

    objectUrls.current.forEach((url) => {
      console.log('URL revoke:', url);
      URL.revokeObjectURL(url);
    });
    objectUrls.current = [];

    if (originalData) {
      setFormData(originalData);
      setCurrentImage(originalImage);
    }
    setIsEdit(false);
  };

  // 주소 검색 버튼 클릭 시
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openModal();
  };

  return {
    handleCancelClick,
    handleEditClick,
    handleClick,
    isEdit,
    currentImage,
  };
}

export function useFormHandler() {
  const { formData, setFormData } = usePlaceEditStore();

  // 입력 필드 변경 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    if (!formData) return;

    if (typeof e === 'string') {
      setFormData({
        ...formData, // 기존 formData 복사
        category: e, // category 필드만 새로운 값으로 업데이트
      });
      return;
    }

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'period' ? validatePeriod(value) : value,
    });
  };

  // 텍스트영역 변경 핸들러
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  return {
    formData,
    handleInputChange,
    handleTextareaChange,
  };
}
