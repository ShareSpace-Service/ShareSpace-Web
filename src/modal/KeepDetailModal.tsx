import { fetchKeepModal, fetchMatchingComplete } from '@/api/Matching';
import ButtonProps from '@/component/ui/ButtonProps';
import CompletedToast from '@/component/ui/CompletedToast';
import ModalHeader from '@/component/ui/ModalHeader';
import { useMatchingIdStore } from '@/store/MatchingId';
import { useStatusStore } from '@/store/ProductStatus';
import { useRoleStore } from '@/store/Role';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

function KeepDetailModal() {
  const { matchingId, clearMatchingId } = useMatchingIdStore();
  const { clearStatus } = useStatusStore();
  const { role } = useRoleStore();
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    clearMatchingId();
    clearStatus();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['keepDetail', matchingId],
    queryFn: () => {
      if (!matchingId) {
        throw new Error('matchingId is null');
      }
      return fetchKeepModal({ matchingId });
    },
    enabled: !!matchingId,
  });

  // 물품 보관 완료 처리 API 호출
  const mutation = useMutation<Error, unknown, { matchingId: number }>({
    mutationFn: ({ matchingId }) => fetchMatchingComplete({ matchingId }),
    onSuccess: () => {
      console.log('성공');
      alert('보관 완료 처리되었습니다. 이용해주셔서 감사합니다!');
      handleClose();
      // TODO: API 호출 성공 시 List 리랜더링 필요!
    },
    onError: (error) => {
      console.error('실패', error);
    },
  });

  const isCompleted =
    role === 'GUEST' ? data?.guestCompleted : data?.hostCompleted;

  const handleComplete = (matchingId: number | null) => {
    if (!matchingId) {
      throw new Error('matchingId is null');
    }

    if (isCompleted) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return;
    }

    mutation.mutate({ matchingId });
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }
  return (
    <>
      <div className="w-full min-h-screen">
        <div className="signUpBg w-full min-h-screen px-4 flex flex-col overflow-hidden">
          {/* 모달 헤더 */}
          <ModalHeader onClose={handleClose} title="보관중" />
          {/* 모달 내용 */}
          <div className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-60 cursor-pointer">
            <div className="flex items-start m-4 gap-3 pb-2">
              <img
                src={data?.imageUrl || 'https://via.placeholder.com/150'}
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
            <div className="flex items-start gap-3 pl-4 h-full">
              <p className="text-black font-extrabold">요청사항</p>
              <p className="text-gray-400 font-bold">
                {data?.product.description}
              </p>
            </div>
          </div>
          <div className="mt-auto pb-5">
            <ButtonProps
              size="full"
              title="완료"
              variant={isCompleted ? 'gray' : 'custom'}
              onClick={() => {
                handleComplete(matchingId);
              }}
            />
          </div>
        </div>
      </div>
      <CompletedToast
        isVisible={isVisible}
        message="이미 완료 처리가 진행되었습니다. 상대방의 완료 확인 후 보관이 최종 완료됩니다."
      />
    </>
  );
}

export default KeepDetailModal;

export function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  return (
    <div className="flex items-center">
      <h2 className="font-extrabold text-lg flex-1">{label}</h2>
      <h2 className="font-extrabold text-lg flex-1 text-gray-300">{value}</h2>
    </div>
  );
}
