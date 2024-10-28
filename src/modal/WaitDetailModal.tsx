import { useMutation, useQuery } from '@tanstack/react-query';
import { DetailItem } from './KeepDetailModal';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import ButtonProps from '@/component/ui/ButtonProps';
import NoRegisterPhoto from '@/assets/Photo.svg';
import { useState } from 'react';
import { MatchingRequestResult } from '@/interface/MatchingInterface';
import { fetchKeepModal } from '@/api/Matching';

// 물품 보관 요청 수락 API
async function fetchKeepAccept({ matchingId }: { matchingId: number }) {
  const response = await fetch(
    'http://localhost:8080/matching/confirmStorage/guest',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matchingId }),
    }
  );
  if (!response.ok) {
    throw new Error('서버 상태가 그냥 미누그앗!' + response.status);
  }
  const result: MatchingRequestResult = await response.json();
  console.log('수락 API', result);
  if (response.ok && result.success) {
    console.log('요청에 성공하였습니다.', result.message);
    return result;
  } else {
    throw new Error(result.message || '수락이 실패하였습니다.');
  }
}

async function fetchCancelRequest({ matchingId }: { matchingId: number }) {
  const response = await fetch(
    `http://localhost:8080/matching/cancelRequest?matchingId=${matchingId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    throw new Error('서버 상태가 그냥 미누그앗!' + response.status);
  }
  const result: MatchingRequestResult = await response.json();
  console.log('요청 취소 API', result);
  if (response.ok && result.success) {
    console.log('요청이 취소되었습니다.', result.message);
    return result;
  } else {
    throw new Error(result.message || '요청 취소에 실패하였습니다.');
  }
}

function WaitDetailModal({
  matchingId,
  onClose,
}: {
  matchingId: number;
  onClose: () => void;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['waitDetail', matchingId],
    queryFn: () => fetchKeepModal({ matchingId }),
    enabled: !!matchingId,
  });

  const [isCancel, setIsCancel] = useState<boolean>(true);

  const acceptMutation = useMutation<
    MatchingRequestResult,
    Error,
    { matchingId: number }
  >({
    mutationFn: ({ matchingId }) => fetchKeepAccept({ matchingId }),
    onSuccess: () => {
      console.log('수락 성공');
      alert('수락됐다 민우야');
      setIsCancel(false);
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
    mutationFn: () => fetchCancelRequest({ matchingId }),
    onSuccess: () => {
      console.log('요청 취소 성공');
      alert('요청이 취소되었습니다.');
      onClose();
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
    acceptMutation.mutate({ matchingId });
  };

  const handleCancelClick = () => {
    cancelMutation.mutate({ matchingId });
  };

  return (
    <div className="w-full min-h-screen">
      <div className="signUpBg w-full min-h-screen px-4 flex flex-col overflow-hidden">
        {/* 모달 헤더 */}
        <div className="h-[60px] w-full bg-blue flex items-center gap-3">
          <AiOutlineArrowLeft
            className="ml-2 text-2xl font-extrabold cursor-pointer hover:text-gray-500 transition-colors duration-200"
            onClick={onClose}
          />
          <p className="font-bold">보관대기중</p>
        </div>
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
            // disabled={isCancel}
          />
        </div>
      </div>
    </div>
  );
}

export default WaitDetailModal;
