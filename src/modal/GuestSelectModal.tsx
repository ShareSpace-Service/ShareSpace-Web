import { fetchKeepRequest } from '@/api/Matching';
import ButtonProps from '@/component/ui/ButtonProps';
import ModalComponent from '@/component/ui/ModalComponent';
import { MatchingRequestResult } from '@/interface/MatchingInterface';
import { useMutation } from '@tanstack/react-query';

function GuestSelectModal({
  title,
  onClose,
  placeId,
}: {
  matchingId: number;
  title: string;
  onClose: () => void;
  placeId: number;
}) {
  const mutation = useMutation<
    MatchingRequestResult,
    Error,
    { placeId: number }
  >({
    mutationFn: ({ placeId }) => fetchKeepRequest({ placeId }),
    onSuccess: (data) => {
      console.log('요청 성공', data);
      onClose();
      alert('보관 요청이 완료되었습니다.');
    },
    onError: (error) => {
      console.error('요청 실패', error);
    },
  });

  const handleClick = () => {
    mutation.mutate({ placeId });
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
            onClick={onClose}
          />
        </div>
      </ModalComponent>
    </>
  );
}

export default GuestSelectModal;
