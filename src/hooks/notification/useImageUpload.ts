import { useProductRegisterStore } from '@/store/ProductRegister';

export const useImageUpload = () => {
  const { files, setFiles, showImages, setShowImages } =
    useProductRegisterStore();

  // 이미지 추가
  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageLists = event.target.files;
    if (!imageLists) return;

    // 이미지 최대 개수(5개) 체크
    if (showImages.length >= 5) {
      alert('이미지는 최대 5개까지 업로드 가능합니다.');
      return;
    }

    // 기존 이미지 배열과 파일 배열 복사
    let imagesUrlLists = [...showImages];
    let fileList = [...files];

    for (let i = 0; i < imageLists.length; i++) {
      const file = imageLists[i];

      // 파일 크기 제한 (1MB)
      if (file.size > 1 * 1024 * 1024) {
        alert('파일 사이즈가 너무 큽니다.');
        return;
      }

      // 최대 5개 제한
      if (imagesUrlLists.length >= 5) break;

      // 브라우저 메모리에 이미지 URL 생성 (미리보기용)
      const currentImageUrl = URL.createObjectURL(file);
      imagesUrlLists.push(currentImageUrl);
      fileList.push(file);
    }

    // 상태 업데이트
    setShowImages(imagesUrlLists);
    setFiles(fileList);
  };

  // 이미지 삭제
  const handleDeleteImages = (id: number) => {
    // 브라우저 메모리에서 삭제
    URL.revokeObjectURL(showImages[id]);

    setShowImages(showImages.filter((_, index) => index != id));
    setFiles(files.filter((_, index) => index != id));
  };

  // 이미지 초기화
  const cleanUp = () => {
    showImages.forEach((url) => URL.revokeObjectURL(url));

    setShowImages([]);
    setFiles([]);
  };

  return {
    files,
    showImages,
    handleAddImages,
    handleDeleteImages,
    cleanUp,
  };
};
