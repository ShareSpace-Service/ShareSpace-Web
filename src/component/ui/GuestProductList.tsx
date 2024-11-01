import { fetchProductList } from '@/api/Place';
import { ModalPortal } from '@/lib/ModalPortal';
import GuestKeepRequestModal from '@/modal/GuestKeepRequestModal';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

function GuestProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['places'],
    queryFn: fetchProductList,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [placeId, setPlaceId] = useState<number | null>(null);

  const handleClick = (placeId: number) => {
    setIsOpen(true);
    setPlaceId(placeId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
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
            <p className="text-black font-bold">{place.distance}</p>
          </div>
        </div>
      ))}
      <ModalPortal>
        <GuestKeepRequestModal
          isOpen={isOpen}
          placeId={placeId}
          onClose={() => setIsOpen(false)}
        />
      </ModalPortal>
    </div>
  );
}

export default GuestProductList;
