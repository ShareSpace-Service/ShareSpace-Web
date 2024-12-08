import { fetchMatchingAccept, fetchRequestModal } from '@/api/Matching';
import { useMatchingIdStore } from '@/store/MatchingId';
import { useStatusStore } from '@/store/ProductStatus';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DetailItem } from './KeepDetailModal';
import ModalHeader from '@/component/ui/ModalHeader';
import ButtonProps from '@/component/ui/ButtonProps';
import { MatchingRequestResult } from '@/interface/MatchingInterface';

function HostRequestModal() {
  const { matchingId, clearMatchingId } = useMatchingIdStore();
  const { clearStatus } = useStatusStore();

  const handleClose = () => {
    clearMatchingId();
    clearStatus();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['requestDetail', matchingId],
    queryFn: () => fetchRequestModal({ matchingId: matchingId as number }),
    enabled: !!matchingId,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation<
    MatchingRequestResult,
    Error,
    { matchingId: number; isAccepted: boolean }
  >({
    mutationFn: ({ matchingId, isAccepted }) =>
      fetchMatchingAccept({ matchingId, isAccepted }),
    onSuccess: (_data, variables) => {
      alert(`요청이 ${variables.isAccepted ? '수락' : '거절'}되었습니다.`);
      queryClient.invalidateQueries({ queryKey: ['matching'] }); // 새로고침
      handleClose();
    },
    onError: () => {
      // console.error('수락 실패', error);
    },
  });

  const handleAcceptClick = () => {
    mutation.mutate({ matchingId: matchingId as number, isAccepted: true });
  };
  const handleCancelClick = () => {
    mutation.mutate({ matchingId: matchingId as number, isAccepted: false });
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }
  return (
    <div className="w-full min-h-screen">
      <div className="signUpBg w-full min-h-screen px-4 flex flex-col overflow-hidden">
        {/* 모달 헤더 */}
        <ModalHeader onClose={handleClose} title="요청옴" />
        {/* 모달 내용 */}
        <div className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-[28rem] cursor-pointer">
          <div className="flex items-start m-4 gap-3 pb-2">
            <img
              src={data?.product.image[0]}
              className="w-[150px] h-[150px] object-contain rounded-lg"
              alt={data?.product.title}
            />
            <div className="flex flex-col w-80 gap-3">
              <DetailItem label="물품 Title" value={data?.product.title} />
              <DetailItem label="카테고리" value={data?.product.category} />
              <DetailItem
                label="보관기간"
                value={`${data?.product.period}일`}
              />
            </div>
          </div>
          <div className="flex items-start gap-3 pl-4 h-full w-full">
            <p className="text-black font-extrabold whitespace-nowrap">
              요청사항
            </p>
            <p className="text-gray-400 font-bold flex-grow">
              {data?.product.description}
            </p>
          </div>
          <div className="flex items-start m-4 gap-3 pb-2">
            <img
              src={data?.place.image[0]}
              className="w-[150px] h-[150px] object-contain rounded-lg"
              alt={data?.place.title}
            />
            <div className="flex flex-col w-80 gap-3">
              <DetailItem label="장소 Title" value={data?.place.title} />
              <DetailItem label="카테고리" value={data?.place.category} />
              <DetailItem
                label="최대보관일수"
                value={`${data?.place.period}일`}
              />
            </div>
          </div>
          <div className="flex items-start gap-3 pl-4 h-full w-full">
            <p className="text-black font-extrabold whitespace-nowrap">비고</p>
            <p className="text-gray-400 font-bold flex-grow">
              {data?.place.description}
            </p>
          </div>
        </div>
        {/* 요청 수락 거절 버튼 */}
        <div className="flex items-center gap-3 justify-between mt-auto mb-5">
          <ButtonProps
            title="수락"
            size="check"
            variant="custom"
            onClick={handleAcceptClick}
          />
          <ButtonProps
            title="거절"
            size="check"
            variant="custom"
            onClick={handleCancelClick}
          />
        </div>
      </div>
    </div>
  );
}

export default HostRequestModal;
