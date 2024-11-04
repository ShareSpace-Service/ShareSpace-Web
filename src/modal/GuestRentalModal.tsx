import { fetchMatchingRentalRequest } from '@/api/Matching';
import { fetchPlaceDetailList } from '@/api/Place';
import ButtonProps from '@/component/ui/ButtonProps';
import { MatchingRequestResult } from '@/interface/MatchingInterface';
import { PlaceData } from '@/interface/PlaceInterface';
import {
  useMutation,
  UseMutationResult,
  useQuery,
} from '@tanstack/react-query';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  placeId: number | null;
  matchingId: number;
}

function GuestRentalModal({
  isOpen,
  onClose,
  placeId,
  matchingId,
}: ModalProps) {
  const { data, error, isLoading } = useQuery<PlaceData, Error>({
    queryKey: ['placeDetail', placeId],
    queryFn: () => fetchPlaceDetailList({ placeId: placeId! }),
    enabled: !!placeId,
  });

  const matchingRequestMutation = useMutation<
    MatchingRequestResult,
    Error,
    void
  >({
    mutationFn: () =>
      fetchMatchingRentalRequest({
        placeId: placeId!,
        matchingId: matchingId!,
      }),
    onSuccess: (data: MatchingRequestResult) => {
      console.log('요청 성공', data);
      alert('대여 요청이 완료되었습니다.');
      onClose();
    },
    onError: (error: Error) => {
      console.error('요청 실패', error);
    },
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
        {data && (
          <ModalContent
            data={data}
            matchingRequestMutation={matchingRequestMutation}
          />
        )}
      </div>
    </div>
  );
}

export function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="absolute top-3 right-3 text-2xl font-bold text-gray-600 hover:text-gray-800"
    >
      &times;
    </button>
  );
}

function ModalContent({
  data,
  matchingRequestMutation,
}: {
  data: PlaceData;
  matchingRequestMutation: UseMutationResult<
    MatchingRequestResult,
    Error,
    void
  >;
}) {
  return (
    <div className="flex flex-col h-full">
      <Header title="대여 요청" />
      <div className="p-4">
        <PlaceDetails data={data} />
      </div>
      <div className="px-4">
        <ButtonProps
          size="Rental"
          title="대여 요청"
          variant="custom"
          onClick={() => matchingRequestMutation.mutate()}
        />
      </div>
    </div>
  );
}

export function Header({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-start pl-4 py-3 border-b border-solid border-gray-300">
      <h2 className="text-2xl font-bold text-center">{title}</h2>
    </div>
  );
}

export function PlaceDetails({ data }: { data: PlaceData }) {
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
