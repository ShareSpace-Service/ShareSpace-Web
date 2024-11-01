import { useQuery } from '@tanstack/react-query';
import { CloseButton, Header, PlaceDetails } from './GuestRentalModal';
import { PlaceData } from '@/interface/PlaceInterface';
import { fetchPlaceDetailList } from '@/api/Place';
import ButtonProps from '@/component/ui/ButtonProps';
import { useNavigate } from 'react-router-dom';

interface GuestRequestProps {
  isOpen: boolean;
  onClose: () => void;
  placeId: number | null;
}

function GuestKeepRequestModal({
  isOpen,
  onClose,
  placeId,
}: GuestRequestProps) {
  const { data, error, isLoading } = useQuery<PlaceData, Error>({
    queryKey: ['placeDetail', placeId],
    queryFn: () => fetchPlaceDetailList({ placeId: placeId! }),
    enabled: !!placeId,
  });
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
        <CloseButton onClose={onClose} />
        {data && <ModalContent data={data} placeId={placeId} />}
      </div>
    </div>
  );
}

function ModalContent({
  data,
  placeId,
}: {
  data: PlaceData;
  placeId: number | null;
}) {
  const navigate = useNavigate();
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

export default GuestKeepRequestModal;
