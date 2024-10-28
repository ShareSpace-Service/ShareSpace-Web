import ButtonProps from '@/component/ui/ButtonProps';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface ApiResponse {
  message: string;
  status: string;
  data: {
    product: ProductDetails;
    place: PlaceDetails;
    imageUrl: string | null; // 이거 이미지가 Null이 들어갈 수가 없음 수정해야함
  };
  success: boolean;
}

interface ProductDetails {
  title: string;
  period: number;
  description: string;
  category: string;
}

interface PlaceDetails {
  title: string;
}

export async function fetchKeepDetail(
  matchingId: number
): Promise<ApiResponse['data'] | null> {
  const response = await fetch(
    `http://localhost:8080/matching/keepDetail?matchingId=${matchingId}`
  );
  if (!response.ok) {
    throw new Error('서버 상태가 그냥 미누그앗!' + response.status);
  }

  const result: ApiResponse = await response.json();
  console.log('보관중 모달 API', result);
  if (result.success && result.data) {
    return result.data;
  } else {
    console.error('API 요청 실패', result);
    return null;
  }
}

function KeepDetailModal({
  matchingId,
  onClose,
}: {
  matchingId: number;
  onClose: () => void;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['keepDetail', matchingId],
    queryFn: () => fetchKeepDetail(matchingId),
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
        <div className="h-[60px] w-full bg-blue flex items-center gap-3">
          <AiOutlineArrowLeft
            className="ml-2 text-2xl font-extrabold cursor-pointer hover:text-gray-500 transition-colors duration-200"
            onClick={onClose}
          />
          <p className="font-bold">보관중</p>
        </div>
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
        <div className="mt-auto pb-5" onClick={onClose}>
          <ButtonProps size="full" title="완료" variant="custom" />
        </div>
      </div>
    </div>
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
