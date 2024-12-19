import { useState } from 'react';
import HistoryDetailModal from '@/modal/HistoryDetailModal';
import { MatchingItem } from '@/interface/HistoryInterface';
import { useHistory } from '@/action/get-history';
import { useModalStore } from '@/store/ModalState';
import HistoryCard from './card/HistoryCard';
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from './ui/state/StateComponent';

function HistoryList() {
  const [matchingId, setMatchingId] = useState<number | null>(null);
  const { isOpen, openModal, closeModal } = useModalStore();
  const { data, error, isLoading } = useHistory();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!data?.data) return <EmptyState />;

  const handleClick = (matchingId: number) => {
    openModal();
    setMatchingId(matchingId);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {data?.data.map((history: MatchingItem) => (
        <HistoryCard
          key={history.matchingId}
          onClick={handleClick}
          history={history}
        />
      ))}
      {isOpen && (
        <HistoryDetailModal onClose={closeModal} matchingId={matchingId} />
      )}
    </div>
  );
}

export default HistoryList;
