import { Place, ApiResponse } from '@/interface/Place';
import { ModalPortal } from '@/lib/ModalPortal';
import GuestRentalModal from '@/modal/GuestRentalModal';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// API 요청 함수 추후에 API 디렉토리로 이동 예정
async function getPlaceList(productId: number): Promise<Place[]> {
  try {
    const response = await fetch(
      `http://localhost:8080/place/searchByProduct?productId=${productId}`
    );
    if (!response.ok) {
      throw new Error('서버 상태가 그냥 미누그앗!' + response.status);
    }

    const result: ApiResponse = await response.json();
    console.log(result, 'result');
    if (result.success && result.data) {
      return result.data;
    } else {
      console.error('API 요청 실패', result);
      return [];
    }
  } catch (error) {
    console.log('error fetch', error);
    return [];
  }
}

function PlaceList({ productId }: { productId: number }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [placeId, setPlaceId] = useState<number | null>(null);

  const handleClick = (placeId: number) => {
    setIsOpen(true);
    setPlaceId(placeId);
  };

  console.log(productId);
  // productId는 URL 파라미터로 전달받은 값
  // 이 값은 GusetPlace 컴포넌트에서 useParams를 사용

  // React Query를 사용하여 데이터 요청 및 상태 관리
  const {
    data: places,
    error,
    isLoading,
  } = useQuery<Place[], Error>({
    queryKey: ['places', productId], // 쿼리 키
    queryFn: () => getPlaceList(productId), // 데이터 가져오기 함수
    enabled: !!productId, // productId가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 신선하게 유지
  });
  // 로딩 상태 처리
  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 중일 때의 UI
  }

  // 에러 처리
  if (error) {
    return <div>에러 발생: {error.message}</div>; // 에러 발생 시 UI
  }
  console.log('fetched places', places);

  return (
    <div className="flex flex-col items-center gap-4">
      {places?.map((place) => (
        <div
          key={place.placeId}
          className="flex flex-col rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-[180px] cursor-pointer"
          onClick={() => handleClick(place.placeId)}
        >
          {/* 상단 이미지 및 Title, description */}
          <div className="flex items-start m-4 gap-3 pb-5 border-b border-solid border-gray-200">
            <img
              src={place.imageUrl}
              className="w-[100px] h-[100px] object-contain rounded-lg"
            />
            <div className="flex flex-col w-60 gap-3">
              <h2 className="font-extrabold text-2xl">{place.title}</h2>
              <p className="text-gray-400 font-bold">{place.category}</p>
            </div>
          </div>
          {/* 하단 거리 */}
          <div className="flex flex-col items-start pl-4 h-full">
            <p className="text-black font-bold">{place.distance}</p>
          </div>
        </div>
      ))}
      <ModalPortal>
        <GuestRentalModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placeId={placeId}
          productId={productId}
        />
      </ModalPortal>
    </div>
  );
}

export default PlaceList;
