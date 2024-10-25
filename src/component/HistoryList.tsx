import { fetchHistory } from '@/api/History';
import { useQuery } from '@tanstack/react-query';
import ButtonProps from './ui/ButtonProps';
import { useState } from 'react';
import HistoryDetailModal from '@/modal/HistoryDetailModal';

function HistoryList() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [matchingId, setMatchingId] = useState<number | null>(null);
  const { data } = useQuery({
    queryKey: ['history'],
    queryFn: fetchHistory,
  });

  const handleClick = (matchingId: number) => {
    setIsOpen(true);
    setMatchingId(matchingId);
  };
  console.log('data', data);
  return (
    <div className="flex flex-col items-center gap-4">
      {data?.data.map((history) => (
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
