import { fetchPlaceList } from '@/api/Place';
import ModalHeader from '@/component/ui/ModalHeader';
import { Place } from '@/interface/PlaceInterface';
import { ModalPortal } from '@/lib/ModalPortal';
import { useQuery } from '@tanstack/react-query';
import GuestRentalModal from './GuestRentalModal';
import { useModalStore } from '@/store/ModalState';
import { useMatchingIdStore } from '@/store/MatchingId';
import { useStatusStore } from '@/store/ProductStatus';
import { usePlaceIdStore } from '@/store/PlaceId';
import { formatDistance } from '@/lib/formatDistance';

function UnassignedModal() {
  const { openModal } = useModalStore();
  const { matchingId, clearMatchingId } = useMatchingIdStore();
  const { status, clearStatus } = useStatusStore();
  const { setPlaceId } = usePlaceIdStore();

  const menuTitle = status === 'UNASSIGNED' ? '미배정' : '반려됨';

  const handleClick = (placeId: number) => {
    openModal();
    setPlaceId(placeId);
  };

  const handleClose = () => {
    clearMatchingId();
    clearStatus();
  };

  const { data, error, isLoading } = useQuery<Place[], Error>({
    queryKey: ['places', matchingId],
    queryFn: () => {
      if (!matchingId) {
        throw new Error('matchingId is null');
      }
      return fetchPlaceList(matchingId);
    },
    enabled: !!matchingId,
  });

  // 로딩 상태 처리
  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 중일 때의 UI
  }

  // 에러 처리
  if (error) {
    return <div>에러 발생: {error.message}</div>; // 에러 발생 시 UI
  }

  return (
    <div className="w-full min-h-screen">
      <div className="signUpBg w-full min-h-screen px-4 flex flex-col overflow-hidden">
        {/* 모달 헤더 */}
        <ModalHeader onClose={handleClose} title={menuTitle} />
        <div className="flex flex-col items-center gap-4">
          {data?.map((place) => (
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
      </div>
    </div>
  );
}

export default UnassignedModal;
