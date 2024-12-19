import { usePlaceEditStore } from '@/store/PlaceEdit';
import { useEffect, useRef } from 'react';

export function useImageHandler() {
  const { isEdit, formData, setFormData, currentImage, setCurrentImage } =
    usePlaceEditStore();
  const objectUrls = useRef<string[]>([]);

  // 수정 모드 종료 시 cleanup
  useEffect(() => {
    if (!isEdit) {
      objectUrls.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      objectUrls.current = [];
    }
  }, [isEdit]);

  // 이미지 추가 로직
  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !formData) return; // files 또는 formData가 없으면 종료

    // console.log('이미지 추가 시작 - 현재 URL 목록:', objectUrls.current);

    // 이미지 최대 개수 제한
    if (currentImage.length + files.length > 10) {
      alert('이미지는 최대 10개까지 추가할 수 있습니다.');
      return;
    }

    // 파일 유효성 검사 및 유효한 파일 배열 생성
    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // 파일 크기 제한
      if (file.size > 1 * 1024 * 1024) {
        alert('이미지 크기는 1MB를 초과할 수 없습니다.');
        continue;
      }
      validFiles.push(file);
      console.log('유효한 파일 추가:', file.name);
    }
    if (validFiles.length === 0) return; // 유효한 파일이 없으면 종료

    setFormData({
      ...formData,
      newImageUrl: [...(formData.newImageUrl || []), ...validFiles],
    });

    // 이전에 생성된 URL 객체들 정리 (메모리 누수 방지)
    objectUrls.current.forEach((url) => {
      URL.revokeObjectURL(url);
    });

    // 미리보기 URL 생성
    const newImageUrls = validFiles.map((file) => {
      const url = URL.createObjectURL(file);
      objectUrls.current.push(url); // 생성된 URL을 ref에 저장
      // console.log('새로운 URL 생성:', url);
      return url;
    });

    console.log('URL 생성 후 objectUrls:', objectUrls.current);
    // 현재 이미지 배열에 새로운 미리보기 URL 추가
    setCurrentImage([...currentImage, ...newImageUrls]);

    // 파일 input 초기화 (동일한 파일 재선택 가능하도록 하기 위함)
    e.target.value = '';
  };

  const handleImageDelete = (deleteUrl: string) => {
    // formData가 없으면 종료
    if (!formData) return;

    console.log('이미지 삭제 시작 - 삭제할 이미지 :', deleteUrl);
    // 1. 현재 이미지 목록(미리보기)에서 삭제할 이미지 제거
    // filter를 사용해서 삭제할 이미지를 제외한 새 배열 생성
    setCurrentImage(currentImage.filter((img) => img !== deleteUrl));

    // 2. 새로 추가된 이미지인 경우 처리
    // objectUrls.current에 URL이 있다면 새로 추가된 이미지
    if (objectUrls.current.includes(deleteUrl)) {
      // 메모리 누구 방지를 위해 URL객체 제거
      URL.revokeObjectURL(deleteUrl);
      objectUrls.current = objectUrls.current.filter(
        (url) => url !== deleteUrl
        // objectUrls 배열에서 해당 URL 제거
      );

      // 3. formData에 있는 newImageUrl에서도 파일 제거
      const fileIndex = currentImage.indexOf(deleteUrl);
      if (formData.newImageUrl && fileIndex !== -1) {
        const updatedFiles = [...formData.newImageUrl]; // 기조 배열 복사해 불변성 유지
        updatedFiles.splice(fileIndex, 1); // fileIndex 위치의 파일 제거
        setFormData({
          ...formData,
          newImageUrl: updatedFiles.length > 0 ? updatedFiles : null,
          // formData 업데이트
          // 파일이 남아있으면 updateFiles를, 없으면 Null을 넣어줌
        });
      }
    }
    // 4. 기존 이미지인 경우
    else {
      setFormData({
        ...formData,
        deleteImageUrl: [...(formData.deleteImageUrl || []), deleteUrl],
        // deleteImageUrl 배열에 삭제할 URL 추가
        // 기존 배열이 없으면 빈 배열을 생성하여 추가
      });
    }
    // console.log('이미지 삭제 완료');
  };

  return {
    handleImageAdd,
    handleImageDelete,
    objectUrls,
  };
}
