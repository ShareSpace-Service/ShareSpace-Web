import { fetchPlaceList } from '@/api/Place';
import { Place } from '@/interface/PlaceInterface';
import { formatDistance } from '@/lib/formatDistance';
import { ModalPortal } from '@/lib/ModalPortal';
import GuestRentalModal from '@/modal/GuestRentalModal';
import { useMatchingIdStore } from '@/store/MatchingId';
import { useModalStore } from '@/store/ModalState';
import { usePlaceIdStore } from '@/store/PlaceId';
import { useQuery } from '@tanstack/react-query';
import { EmptyPlaceList } from './card/EmptyPlaceList';

function PlaceList() {
  const { matchingId } = useMatchingIdStore();
  const { openModal } = useModalStore();
  const { setPlaceId } = usePlaceIdStore();

  const handleClick = (placeId: number) => {
    openModal();
    setPlaceId(placeId);
  };

  console.log(matchingId);
  // React Query를 사용하여 데이터 요청 및 상태 관리
  const {
    data: places,
    error,
    isLoading,
  } = useQuery<Place[], Error>({
    queryKey: ['places', matchingId], // 쿼리 키
    queryFn: () => {
      if (matchingId === null) {
        throw new Error('matchingId is null');
      }
      return fetchPlaceList(matchingId);
    }, // 데이터 가져오기 함수
    enabled: !!matchingId, // matchingId가 있을 때만 쿼리 실행
  });
  // 로딩 상태 처리
  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 중일 때의 UI
  }

  // 에러 처리
  if (error) {
    return <div>에러 발생: {error.message}</div>; // 에러 발생 시 UI
  }
  if (!places || places.length === 0) {
    return <EmptyPlaceList />;
  }

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
            <p className="text-black font-bold">
              {formatDistance(place.distance)}
            </p>
          </div>
        </div>
      ))}
      <ModalPortal>
        <GuestRentalModal />
      </ModalPortal>
    </div>
  );
}

export default PlaceList;
