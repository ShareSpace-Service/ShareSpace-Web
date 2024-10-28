import { DetailItem } from './KeepDetailModal';
import { useQuery } from '@tanstack/react-query';
import ModalHeader from '@/component/ui/ModalHeader';
import { fetchRequestModal } from '@/api/Matching';

function RequestModal({
  matchingId,
  onClose,
}: {
  matchingId: number;
  onClose: () => void;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['requestDetail', matchingId],
    queryFn: () => fetchRequestModal({ matchingId }),
    enabled: !!matchingId,
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
        <ModalHeader onClose={onClose} title="요청됨" />
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
      </div>
    </div>
  );
}

export default RequestModal;
