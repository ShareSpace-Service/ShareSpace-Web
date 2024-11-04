import { useQuery } from '@tanstack/react-query';
import { Header, PlaceDetails } from './GuestRentalModal';
import { PlaceData } from '@/interface/PlaceInterface';
import { fetchPlaceDetailList } from '@/api/Place';
import ButtonProps from '@/component/ui/ButtonProps';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from '@/store/ModalState';
import { usePlaceIdStore } from '@/store/PlaceId';

function GuestKeepRequestModal() {
  const { isOpen, closeModal } = useModalStore();
  const { placeId, clearPlaceId } = usePlaceIdStore();

  const { data, error, isLoading } = useQuery<PlaceData, Error>({
    queryKey: ['placeDetail', placeId],
    queryFn: () => fetchPlaceDetailList({ placeId: placeId! }),
    enabled: !!placeId,
  });

  const handleClose = () => {
    clearPlaceId();
    closeModal();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="signUpBg w-[500px] h-[400px] rounded-lg relative">
        <CloseButton onClose={handleClose} />
        {data && <ModalContent data={data} />}
      </div>
    </div>
  );
}

function ModalContent({ data }: { data: PlaceData }) {
  const navigate = useNavigate();
  const { placeId } = usePlaceIdStore();
  const handleClick = () => {
    navigate(`/matching/by-place?placeId=${placeId}`);
  };
  return (
    <div className="flex flex-col h-full">
      <Header title="보관 요청" />
      <div className="p-4">
        <PlaceDetails data={data} />
      </div>
      <div className="px-4">
        <ButtonProps
          size="Rental"
          title="보관 요청"
          variant="custom"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="absolute top-3 right-3 text-2xl font-bold text-gray-600 hover:text-gray-800"
    >
      &times;
    </button>
  );
}

export default GuestKeepRequestModal;
