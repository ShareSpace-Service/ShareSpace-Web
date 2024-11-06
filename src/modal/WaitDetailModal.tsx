import { useMutation, useQuery } from '@tanstack/react-query';
import { DetailItem } from './KeepDetailModal';
import ButtonProps from '@/component/ui/ButtonProps';
import NoRegisterPhoto from '@/assets/Photo.svg';
import { useState } from 'react';
import { MatchingRequestResult } from '@/interface/MatchingInterface';
import {
  fetchCancelRequest,
  fetchKeepAccept,
  fetchKeepModal,
} from '@/api/Matching';
import ModalHeader from '@/component/ui/ModalHeader';
import { useMatchingIdStore } from '@/store/MatchingId';
import { useStatusStore } from '@/store/ProductStatus';

function WaitDetailModal() {
  const [isCancel, setIsCancel] = useState<boolean>(true);
  const { matchingId, clearMatchingId } = useMatchingIdStore();
  const { clearStatus } = useStatusStore();

  const handleClose = () => {
    clearMatchingId();
    clearStatus();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['waitDetail', matchingId],
    queryFn: () => fetchKeepModal({ matchingId: matchingId as number }),
    enabled: !!matchingId,
  });

  const acceptMutation = useMutation<
    MatchingRequestResult,
    Error,
    { matchingId: number }
  >({
    mutationFn: ({ matchingId }) => fetchKeepAccept({ matchingId }),
    onSuccess: () => {
      console.log('수락 성공');
      alert('요청이 수락되었습니다.');
      setIsCancel(false);
      handleClose();
    },
    onError: (error) => {
      console.error('수락 실패', error);
    },
  });

  const cancelMutation = useMutation<
    MatchingRequestResult,
    Error,
    { matchingId: number }
  >({
    mutationFn: () => fetchCancelRequest({ matchingId: matchingId as number }),
    onSuccess: () => {
      console.log('요청 취소 성공');
      alert('요청이 취소되었습니다.');
      handleClose();
    },
    onError: (error) => {
      throw new Error('요청 취소 실패' + error);
    },
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  const handleAcceptClick = () => {
    acceptMutation.mutate({ matchingId: matchingId as number });
  };

  const handleCancelClick = () => {
    cancelMutation.mutate({ matchingId: matchingId as number });
  };

  return (
    <div className="w-full min-h-screen">
      <div className="signUpBg w-full min-h-screen px-4 flex flex-col overflow-hidden">
        {/* 모달 헤더 */}
        <ModalHeader onClose={handleClose} title="보관대기중" />
        {/* 모달 내용 */}
        <div className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-80 cursor-pointer">
          <div className="flex items-start m-4 gap-3 pb-2">
            <img
              src={data?.imageUrl || NoRegisterPhoto}
              className="w-[150px] h-[150px] object-contain rounded-lg"
              alt={data?.product.title}
            />
            <div className="flex flex-col w-80 gap-3">
              <DetailItem label="장소 Title" value={data?.place.title} />
              <DetailItem label="물품 Title" value={data?.product.title} />
              <DetailItem label="카테고리" value={data?.product.category} />
              <DetailItem
                label="최대 보관 일수"
                value={`${data?.product.period}일`}
              />
            </div>
          </div>
          {/* 수락 버튼 */}
          <div className="flex justify-end items-center mr-8 pb-4">
            <ButtonProps
              size="sm"
              variant="custom"
              title="수락"
              onClick={handleAcceptClick}
            />
          </div>
          <div className="flex items-start gap-3 pl-4 h-full w-full">
            <p className="text-black font-extrabold whitespace-nowrap">
              요청사항
            </p>
            <p className="text-gray-400 font-bold flex-grow">
              {data?.product.description}
            </p>
          </div>
        </div>
        <div className="mt-auto pb-5">
          <ButtonProps
            size="full"
            title="요청 취소"
            variant={isCancel ? 'gray' : 'custom'}
            onClick={handleCancelClick}
          />
        </div>
      </div>
    </div>
  );
}

export default WaitDetailModal;
