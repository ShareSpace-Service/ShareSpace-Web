import { fetchProductList } from '@/api/Place';
import { formatDistance } from '@/lib/formatDistance';
import { ModalPortal } from '@/lib/ModalPortal';
import GuestKeepRequestModal from '@/modal/GuestKeepRequestModal';
import { useModalStore } from '@/store/ModalState';
import { usePlaceIdStore } from '@/store/PlaceId';
import { useQuery } from '@tanstack/react-query';
import { EmptyPlaceList } from '../card/EmptyPlaceList';

function GuestProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['place'],
    queryFn: fetchProductList,
  });

  const { openModal } = useModalStore();
  const { setPlaceId } = usePlaceIdStore();

  const handleClick = (placeId: number) => {
    openModal();
    setPlaceId(placeId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
  if (!data || data.length === 0) {
    return <EmptyPlaceList />;
  }

  return (
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
        <GuestKeepRequestModal />
      </ModalPortal>
    </div>
  );
}

export default GuestProductList;
