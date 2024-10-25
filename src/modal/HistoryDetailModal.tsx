import { AiOutlineArrowLeft } from 'react-icons/ai';
import { DetailItem } from './KeepDetailModal';
import ButtonProps from '@/component/ui/ButtonProps';
import { useQuery } from '@tanstack/react-query';
import { fetchDetailHistory } from '@/api/History';

function HistoryDetailModal({
  onClose,
  matchingId,
}: {
  onClose: () => void;
  matchingId: number | null;
}) {
  const { data } = useQuery({
    queryKey: ['historyDetail', matchingId],
    queryFn: () => fetchDetailHistory({ matchingId: matchingId! }),
    enabled: !!matchingId,
  });
  console.log('matchingId', matchingId);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-20">
      <div className="signUpBg w-full h-full px-4 flex flex-col">
        {/* 모달 헤더 */}
        <div className="h-[60px] w-full bg-blue flex items-center gap-3">
          <AiOutlineArrowLeft
            className="ml-2 text-2xl font-extrabold cursor-pointer hover:text-gray-500 transition-colors duration-200"
            onClick={onClose}
          />
          <p className="font-bold">뒤로가기</p>
        </div>
        {/* 모달 내용 */}
        <div className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-60 cursor-pointer">
          <div className="flex items-start m-4 gap-3 pb-2">
            <img
              src={data?.data.imageUrl || 'https://via.placeholder.com/150'}
              className="w-[150px] h-[150px] object-contain rounded-lg"
              alt={data?.data.product.title}
            />
            <div className="flex flex-col w-80 gap-3">
              <DetailItem label="장소 Title" value={data?.data.place.title} />
              <DetailItem label="물품 Title" value={data?.data.product.title} />
              <DetailItem
                label="카테고리"
                value={data?.data.product.category}
              />
              <DetailItem
                label="보관 일수"
                value={`${data?.data.product.period}일`}
              />
            </div>
          </div>
          <div className="flex items-start gap-3 pl-4 h-full">
            <p className="text-black font-extrabold">요청사항</p>
            <p className="text-gray-400 font-bold">
              {data?.data.product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryDetailModal;
