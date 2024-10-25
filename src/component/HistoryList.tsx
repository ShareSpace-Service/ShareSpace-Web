import { fetchHistory, fetchHistoryComplete } from '@/api/History';
import { useMutation, useQuery } from '@tanstack/react-query';
import ButtonProps from './ui/ButtonProps';
import { useEffect, useState } from 'react';
import HistoryDetailModal from '@/modal/HistoryDetailModal';
import { ApiResponse, MatchingItem } from '@/interface/HistoryInterface';

function HistoryList() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [matchingId, setMatchingId] = useState<number | null>(null);
  const [historyData, setHistoryData] = useState<MatchingItem[]>([]);

  const { data, error, isLoading } = useQuery<ApiResponse>({
    queryKey: ['history'],
    queryFn: fetchHistory,
  });

  useEffect(() => {
    if (data) {
      setHistoryData(data.data || []);
    }
  }, [data]);

  const mutation = useMutation<Error, unknown, { matchingId: number }>({
    mutationFn: ({ matchingId }) => fetchHistoryComplete({ matchingId }),
    onSuccess: () => {
      console.log('성공');
    },
    onError: (error) => {
      console.error('실패', error);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  // 히스토리 디테일 열기
  const handleClick = (matchingId: number) => {
    setIsOpen(true);
    setMatchingId(matchingId);
  };

  const handleComplete = (matchingId: number) => {
    mutation.mutate(
      { matchingId },
      {
        onSuccess: () => {
          setHistoryData((prev) =>
            prev.filter((item) => item.matchingId !== matchingId)
          );
        },
      }
    );
  };

  console.log('data', data);
  return (
    <div className="flex flex-col items-center gap-4">
      {historyData.map((history) => (
        <div
          key={history.matchingId}
          className="flex flex-col rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-[180px] cursor-pointer"
          onClick={() => handleClick(history.matchingId)}
        >
          {/* 상단 이미지 및 Title, description */}
          <div className="flex items-start m-4 gap-5 pb-5 border-b border-solid border-gray-200">
            <img
              src={history.imageUrl}
              className="w-[100px] h-[100px] object-full rounded-lg"
            />
            <div className="flex flex-col w-60 gap-3 h-full justify-center">
              <h2 className="font-extrabold text-2xl">{history.title}</h2>
              <p className="text-gray-400 font-bold">{history.category}</p>
            </div>
            <div className="w-40 flex flex-col h-full items-end">
              <ButtonProps
                title="완료"
                variant="custom"
                size="status"
                className="text-base"
                onClick={(event) => {
                  event.stopPropagation(); // 상위에 Link 이벤트 전파 방지
                  handleComplete(history.matchingId);
                }}
              />
            </div>
          </div>
          {/* 하단 거리 */}
          <div className="flex flex-col items-start pl-4 h-full">
            <p className="text-black font-bold">{history.distance}</p>
          </div>
        </div>
      ))}
      {isOpen && (
        <HistoryDetailModal
          onClose={() => setIsOpen(false)}
          matchingId={matchingId}
        />
      )}
    </div>
  );
}

export default HistoryList;
