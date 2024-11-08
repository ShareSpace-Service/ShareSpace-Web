import ModalHeader from '@/component/ui/ModalHeader';
import { DetailItem } from './KeepDetailModal';
import { useStatusStore } from '@/store/ProductStatus';
import { useMatchingIdStore } from '@/store/MatchingId';
import NoPhoto from '@/assets/PhotoWait.svg';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchKeepModal, fetchMatchingUploadImage } from '@/api/Matching';

function HostWaitModal() {
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

  const mutation = useMutation<
    unknown,
    Error,
    { matchingId: number; imageUrl: string }
  >({
    mutationFn: ({ matchingId, imageUrl }) =>
      fetchMatchingUploadImage({ matchingId, imageUrl }),
  });

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
        <ModalHeader onClose={handleClose} title="보관대기중" />
        {/* 모달 내용 */}
        <div className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-80 cursor-pointer">
          <div className="flex items-start m-4 gap-3 pb-2">
            <img
              src={data?.imageUrl || NoPhoto}
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
          <div className="flex items-start gap-3 pl-4 h-full w-full">
            <p className="text-black font-extrabold whitespace-nowrap">
              요청사항
            </p>
            <p className="text-gray-400 font-bold flex-grow">
              {data?.product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostWaitModal;
