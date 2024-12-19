import { useMutation } from '@tanstack/react-query';
import { RegistResponse } from '@/interface/ProductRegistInterface';
import { RegistProduct } from '@/api/ProductRegist';
import { useModalStore } from '@/store/ModalState';
import { useMatchingIdStore } from '@/store/MatchingId';

export const useProductMutation = () => {
  const { openModal } = useModalStore();
  const { setMatchingId } = useMatchingIdStore();

  return useMutation<RegistResponse, Error, FormData>({
    mutationFn: (formData: FormData) => RegistProduct(formData),
    onSuccess: (data) => {
      const newMatchingId = data.data.matchingId;
      if (newMatchingId) {
        setMatchingId(newMatchingId);
        alert('상품이 등록되었습니다.');
        openModal();
      } else {
        alert('상품 등록에 실패했습니다.');
      }
    },
    onError: () => {
      alert('상품 등록에 실패했습니다.');
    },
  });
};
