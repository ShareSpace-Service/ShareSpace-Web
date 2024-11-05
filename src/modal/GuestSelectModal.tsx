import { fetchKeepRequest } from '@/api/Matching';
import ButtonProps from '@/component/ui/ButtonProps';
import ModalComponent from '@/component/ui/ModalComponent';
import { MatchingRequestResult } from '@/interface/MatchingInterface';
import { useModalStore } from '@/store/ModalState';
import { usePlaceIdStore } from '@/store/PlaceId';
import { useMutation } from '@tanstack/react-query';

function GuestSelectModal({
  title,
  matchingId,
  refetch,
}: {
  matchingId: number;
  title: string;
  refetch: () => void;
}) {
  const { closeModal } = useModalStore();
  const { placeId } = usePlaceIdStore();

  const mutation = useMutation<
    MatchingRequestResult,
    Error,
    { placeId: number; matchingId: number }
  >({
    mutationFn: ({ placeId, matchingId }) =>
      fetchKeepRequest({ placeId, matchingId }),
    onSuccess: (data) => {
      console.log('요청 성공', data);
      refetch(); // 성공시 데이터 GuestPlaceFilter 데이터 새로고침
      alert('보관 요청이 완료되었습니다.');
      closeModal();
    },
    onError: (error) => {
      console.error('요청 실패', error);
    },
  });

  const handleClick = () => {
    if (placeId !== null) {
      mutation.mutate({ placeId, matchingId });
    } else {
      alert('요청에 실패하였습니다!');
    }
  };
  return (
    <>
      <ModalComponent>
        <div>
          <h2 className="text-2xl font-bold mb-2 text-center">
            선택한 물품이 맞으신가요?
          </h2>
          <p className="text-gray-300 font-bold text-center">{title}</p>
        </div>
        <div className="flex items-center gap-3 justify-around">
          <ButtonProps
            title="네"
            size="check"
            variant="custom"
            onClick={handleClick}
          />
          <ButtonProps
            title="아니요"
            size="check"
            variant="custom"
            onClick={closeModal}
          />
        </div>
      </ModalComponent>
    </>
  );
}

export default GuestSelectModal;
