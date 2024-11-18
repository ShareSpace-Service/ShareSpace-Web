import { fetchMatchingPlace } from '@/api/Matching';
import { MatchingPlaceResponse } from '@/interface/MatchingInterface';
import { formatDistance } from '@/lib/formatDistance';
import { ModalPortal } from '@/lib/ModalPortal';
import GuestSelectModal from '@/modal/GuestSelectModal';
import { useModalStore } from '@/store/ModalState';
import { usePlaceIdStore } from '@/store/PlaceId';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

function GuestPlaceFilter() {
  const { isOpen, openModal } = useModalStore();
  const { placeId } = usePlaceIdStore();

  const [selectedProps, setSelectedProps] = useState<{
    matchingId: number;
    title: string;
  } | null>(null);

  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search); // URLSearchParams 객체 생성
  // const placeId = queryParams.get('placeId'); // URL 파라미터로 전달받은 placeId

  const {
    data: placeResponse,
    isLoading,
    error,
    refetch,
  } = useQuery<MatchingPlaceResponse, Error>({
    queryKey: ['matchingPlace', placeId],
    queryFn: () => {
      if (placeId === null) {
        throw new Error('placeId is null');
      }
      return fetchMatchingPlace({ placeId: placeId });
    },
    enabled: placeId !== null,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const places = placeResponse?.data || []; // 데이터가 없을 경우 빈 배열 반환

  const handleClick = (matchingId: number, title: string) => {
    openModal();
    setSelectedProps({ matchingId, title });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {places.map((place) => (
        <div
          key={place.matchingId}
          className="flex flex-col rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-[180px] cursor-pointer"
          onClick={() => {
            if (place.matchingId !== null) {
              handleClick(place.matchingId, place.title);
            }
          }}
        >
          {/* 상단 이미지 및 Title, description */}
          <div className="flex items-start m-4 gap-3 pb-5 border-b border-solid border-gray-200">
            <img
              src={place.imageUrl[0]}
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
      {isOpen && selectedProps && (
        <ModalPortal>
          <GuestSelectModal
            matchingId={selectedProps.matchingId}
            title={selectedProps.title}
            refetch={refetch}
          />
        </ModalPortal>
      )}
    </div>
  );
}

export default GuestPlaceFilter;
