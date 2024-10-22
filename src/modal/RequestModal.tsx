import { DetailItem } from './KeepDetailModal';
import { useQuery } from '@tanstack/react-query';
import ModalHeader from '@/component/ui/ModalHeader';

interface Product {
  title: string;
  image: string[];
  category: string;
  period: number;
  description: string;
}

interface Place {
  title: string;
  image: string[];
  category: string;
  period: number;
  description: string;
}

interface ApiResponseData {
  productRequestedDetailResponse: Product;
  placeRequestedDetailResponse: Place;
}

interface ApiResponse {
  message: string;
  status: string;
  data: ApiResponseData;
  success: boolean;
}

async function fetchRequest({ matchingId }: { matchingId: number }) {
  const response = await fetch(
    `http://localhost:8080/matching/requestDetail?matchingId=${matchingId}`
  );
  if (!response.ok) {
    throw new Error('서버 상태가 그냥 미누그앗!' + response.status);
  }
  const result: ApiResponse = await response.json();
  console.log('요청 모달 API', result);
  if (response.ok && result.success) {
    console.log('요청에 성공하였습니다.', result.message);
    return result.data;
  } else {
    throw new Error(result.message || '요청이 실패하였습니다.');
  }
}

function RequestModal({
  matchingId,
  onClose,
}: {
  matchingId: number;
  onClose: () => void;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['requestDetail', matchingId],
    queryFn: () => fetchRequest({ matchingId }),
    enabled: !!matchingId,
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-20">
      <div className="signUpBg w-full h-full px-4 flex flex-col">
        {/* 모달 헤더 */}
        <ModalHeader onClose={onClose} title="요청됨" />
        {/* 모달 내용 */}
        <div className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-[28rem] cursor-pointer">
          <div className="flex items-start m-4 gap-3 pb-2">
            <img
              src={data?.productRequestedDetailResponse.image[0]}
              className="w-[150px] h-[150px] object-contain rounded-lg"
              alt={data?.productRequestedDetailResponse.title}
            />
            <div className="flex flex-col w-80 gap-3">
              <DetailItem
                label="물품 Title"
                value={data?.productRequestedDetailResponse.title}
              />
              <DetailItem
                label="카테고리"
                value={data?.productRequestedDetailResponse.category}
              />
              <DetailItem
                label="보관기간"
                value={`${data?.productRequestedDetailResponse.period}일`}
              />
            </div>
          </div>
          <div className="flex items-start gap-3 pl-4 h-full w-full">
            <p className="text-black font-extrabold whitespace-nowrap">
              요청사항
            </p>
            <p className="text-gray-400 font-bold flex-grow">
              {data?.productRequestedDetailResponse.description}
            </p>
          </div>
          <div className="flex items-start m-4 gap-3 pb-2">
            <img
              src={data?.placeRequestedDetailResponse.image[0]}
              className="w-[150px] h-[150px] object-contain rounded-lg"
              alt={data?.placeRequestedDetailResponse.title}
            />
            <div className="flex flex-col w-80 gap-3">
              <DetailItem
                label="장소 Title"
                value={data?.placeRequestedDetailResponse.title}
              />
              <DetailItem
                label="카테고리"
                value={data?.placeRequestedDetailResponse.category}
              />
              <DetailItem
                label="최대보관일수"
                value={`${data?.placeRequestedDetailResponse.period}일`}
              />
            </div>
          </div>
          <div className="flex items-start gap-3 pl-4 h-full w-full">
            <p className="text-black font-extrabold whitespace-nowrap">비고</p>
            <p className="text-gray-400 font-bold flex-grow">
              {data?.placeRequestedDetailResponse.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestModal;
