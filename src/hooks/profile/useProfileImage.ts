import { useMyPageStore } from '@/store/MyPageState';
import { useState } from 'react';

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

export function useProfileImage() {
  const { setImage } = useMyPageStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('JPG/PNG 파일만 업로드 가능합니다.');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('파일 크기는 5MB 이하여야 합니다.');
      return false;
    }
    return true;
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onImageLoad: (image: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setError(null);
      setIsLoading(true);

      if (!validateFile(file)) {
        // 유효성 검사
        return;
      }

      setImage(file); // 서버 업로드를 위해 파일 객체를 스토어에 저장

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (result && typeof result === 'string') {
          onImageLoad(result);
        }
      };
      // 파일 읽기 실패 시 실행되는 콜백
      reader.onerror = () => {
        setError('이미지 업로드 중 오류가 발생했습니다.');
      };

      reader.readAsDataURL(file);
    } catch (error) {
      setError('이미지 처리 중 오류가 발생했습니다');
    } finally {
      // 작업 완료 후 로딩 상태 해제
      setIsLoading(false);
    }
  };

  return {
    handleImageChange,
    isLoading,
    error,
  };
}
