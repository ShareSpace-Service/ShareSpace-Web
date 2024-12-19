import { MatchingItem } from '@/interface/HistoryInterface';
import ButtonProps from '../ui/ButtonProps';
import { formatDistance } from '@/lib/formatDistance';
import Image from '../ui/image/Image';
import { Tag, MapPin } from 'lucide-react';

interface HistoryCardProps {
  history: MatchingItem;
  onClick: (matchingId: number) => void;
}

function HistoryCard({ onClick, history }: HistoryCardProps) {
  return (
    <div
      className="flex flex-col rounded-xl shadow-lg hover:shadow-2xl 
        transition-shadow duration-300 w-full h-[180px] cursor-pointer"
      onClick={() => onClick(history.matchingId)}
    >
      <div className="flex h-full p-5 gap-6">
        {/* 이미지 섹션과 거리 정보 */}
        <div className="justify-between flex flex-col gap-2">
          <Image
            src={history.imageUrl?.[0]}
            alt={history.title}
            className="w-[100px] h-[100px] rounded-lg"
          />
          <div className="flex items-center gap-1.5 text-black pl-1">
            <MapPin className="w-4 h-4" />
            <span className="font-bold text-sm">
              {formatDistance(history.distance)}
            </span>
          </div>
        </div>

        {/* 중앙 콘텐츠 섹션 */}
        <div className="flex-grow flex flex-col gap-4">
          <h2 className="font-extrabold text-2xl line-clamp-1">
            {history.title}
          </h2>

          {/* 카테고리 */}
          <div
            className="inline-flex items-center gap-2 bg-gray-200 text-blue-600 
            px-3 py-1 rounded-lg w-fit"
          >
            <Tag className="w-5 h-5" />
            <span className="text-base font-bold">{history.category}</span>
          </div>
        </div>

        {/* 버튼 섹션 */}
        <div className="flex-shrink-0">
          <ButtonProps
            title="완료"
            variant="custom"
            size="status"
            className="text-base"
          />
        </div>
      </div>
    </div>
  );
}

export default HistoryCard;
