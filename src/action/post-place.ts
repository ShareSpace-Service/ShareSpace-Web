import { fetchPlaceRegister } from '@/api/Place';
import { useImageUpload } from '@/hooks/notification/useImageUpload';
import { ApiUpdateResponse } from '@/interface/MyPageInterface';
import { useProductRegisterStore } from '@/store/ProductRegister';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const usePlaceRegister = () => {
  const navigate = useNavigate();
  const { clearForm } = useProductRegisterStore();
  const { cleanUp } = useImageUpload();

  return useMutation({
    mutationFn: (formData: FormData) => fetchPlaceRegister(formData),
    onSuccess: async (data) => {
      await new Promise<void>((resolve) => {
        alert('장소가 성공적으로 등록되었습니다.');
        resolve();
      });
      clearForm(); // store의 상태 초기화
      cleanUp(); // 이미지 메모리 초기화
      navigate('/login');
    },
    onError: (error: ApiUpdateResponse) => {
      // 에러 처리
      console.log('에러 객체:', error);
      alert(error.message);
    },
  });
};
