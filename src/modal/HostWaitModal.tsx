import ModalHeader from '@/component/ui/ModalHeader';
import { DetailItem } from './KeepDetailModal';
import { useStatusStore } from '@/store/ProductStatus';
import { useMatchingIdStore } from '@/store/MatchingId';
import NoPhoto from '@/assets/PhotoWait.svg';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchCancelRequest,
  fetchKeepModal,
  fetchMatchingUploadImage,
} from '@/api/Matching';
import { Input } from '@/components/ui/input';
import { useRef } from 'react';
import ButtonProps from '@/component/ui/ButtonProps';
import {
  MatchingApiResponse,
  MatchingRequestResult,
} from '@/interface/MatchingInterface';

function HostWaitModal() {
  const { matchingId, clearMatchingId } = useMatchingIdStore();
  const { clearStatus } = useStatusStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // 이미지 업로드 클릭 시 ref를 사용한 이유
  // input type="file"이 숨겨져 있어서 클릭 이벤트를 발생시키기 위함
  // hidden 속성을 사용하면 직접 클릭 이벤트를 발생시킬 수 없음

  const handleClose = () => {
    clearMatchingId();
    clearStatus();
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['waitDetail', matchingId],
    queryFn: () => fetchKeepModal({ matchingId: matchingId as number }),
    enabled: !!matchingId,
  });

  // 이미지 업로드 Mutation
  const mutation = useMutation<unknown, Error, FormData>({
    mutationFn: (formData: FormData) => fetchMatchingUploadImage(formData),
    onSuccess: () => {
      alert('이미지가 업로드 되었습니다!');
      refetch();
      // 렌더링을 위해 새로고침
    },
  });

  const mutationCancel = useMutation<
    MatchingRequestResult,
    Error,
    { matchingId: number }
  >({
    mutationFn: () => fetchCancelRequest({ matchingId: matchingId as number }),
    onSuccess: () => {
      alert('요청이 취소되었습니다.');
      handleClose();
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && matchingId) {
      if (file.size > 1 * 1024 * 1024) {
        alert('파일 사이즈는 1MB 이하여야 합니다.');
        return;
      }
    }

    const formData = new FormData();
    if (file) {
      formData.append('imageUrl', file);
    }
    if (matchingId !== null) {
      formData.append('matchingId', matchingId.toString());
    }
    mutation.mutate(formData);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  const handleCancelClick = () => {
    mutationCancel.mutate({ matchingId: matchingId as number });
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
              src={data?.imageUrl || NoPhoto}
              className="w-[150px] h-[150px] object-contain rounded-lg"
              id="image"
              onClick={handleClick}
              alt={data?.product.title}
            />
            <Input
              type="file"
              id="image"
              accept=".jpeg, .png"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
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
          <div className="flex items-start gap-3 pl-4 h-full w-full">
            <p className="text-black font-extrabold whitespace-nowrap">
              요청사항
            </p>
            <p className="text-gray-400 font-bold flex-grow">
              {data?.product.description}
            </p>
          </div>
        </div>
        {/* 요청하기 */}
        <div className="mt-auto pb-5">
          <ButtonProps
            size="full"
            variant="custom"
            title="요청하기"
            onClick={handleCancelClick}
          />
        </div>
      </div>
    </div>
  );
}

export default HostWaitModal;
