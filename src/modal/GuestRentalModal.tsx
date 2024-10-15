import ButtonProps from '@/component/ui/ButtonProps';
import { useQuery } from '@tanstack/react-query';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  placeId: number | null;
}
interface PlaceData {
  placeId: number;
  title: string;
  category: string;
  period: number;
  imageUrl: string;
  description: string;
}
interface ApiResponse {
  message: string;
  status: string;
  data: PlaceData;
  success: boolean;
}

async function getPlaceDetailList({ placeId }: { placeId: number }) {
  const response = await fetch(
    `http://localhost:8080/place/placeDetail?placeId=${placeId}`
  );
  if (!response.ok) {
    throw new Error('서버 상태가 그냥 미누그앗!' + response.status);
  }
  const result: ApiResponse = await response.json();
  console.log('first', result);

  if (result.success && result.data) {
    return result.data;
  } else {
    console.error('API 요청 실패', result);
    throw new Error('Failed to fetch place detail');
  }
}

function GuestRentalModal({ isOpen, onClose, placeId }: ModalProps) {
  const { data, error, isLoading } = useQuery<PlaceData, Error>({
    queryKey: ['placeDetail', placeId],
    queryFn: () => getPlaceDetailList({ placeId: placeId! }), // Pass placeId properly
    enabled: !!placeId,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!isOpen) return null; // isOpen이 false일 때는 모달을 렌더링하지 않음

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="signUpBg w-[500px] h-[400px] rounded-lg relative">
        <CloseButton onClose={onClose} />
        {data && <ModalContent data={data} />}
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

function ModalContent({ data }: { data: PlaceData }) {
  return (
    <div className="flex flex-col h-full">
      <Header title="대여 요청" />
      <div className="p-4">
        <PlaceDetails data={data} />
      </div>
      <div className="px-4">
        <ButtonProps size="Rental" title="대여 요청" variant="custom" />
      </div>
    </div>
  );
}

function Header({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-start pl-4 py-3 border-b border-solid border-gray-300">
      <h2 className="text-2xl font-bold text-center">{title}</h2>
    </div>
  );
}

function PlaceDetails({ data }: { data: PlaceData }) {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-60 cursor-pointer">
      <div className="flex items-start m-4 gap-3 pb-2">
        <img
          src={data.imageUrl}
          className="w-[150px] h-[150px] object-contain rounded-lg"
          alt={data.title}
        />
        <div className="flex flex-col w-80 gap-3">
          <DetailItem label="Title" value={data.title} />
          <DetailItem label="카테고리" value={data.category} />
          <DetailItem label="최대 보관 일수" value={`${data.period}일`} />
        </div>
      </div>
      <div className="flex items-start gap-3 pl-4 h-full">
        <p className="text-black font-extrabold">비고</p>
        <p className="text-gray-400 font-bold">{data.description}</p>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center">
      <h2 className="font-extrabold text-lg flex-1">{label}</h2>
      <h2 className="font-extrabold text-lg flex-1 text-gray-300">{value}</h2>
    </div>
  );
}

export default GuestRentalModal;
