import KeepDetailModal from './KeepDetailModal';
import WaitDetailModal from './WaitDetailModal';

interface StatusModalRendererProps {
  matchingId: number | null;
  status: string | null;
  onClose: () => void;
}

function StatusModalRender({
  matchingId,
  status,
  onClose,
}: StatusModalRendererProps) {
  if (!matchingId || !status) {
    return null;
  }

  switch (status) {
    case 'STORED':
      return <KeepDetailModal matchingId={matchingId} onClose={onClose} />;
    case 'PENDING':
      return <WaitDetailModal matchingId={matchingId} onClose={onClose} />;
    default:
      return null;
  }
}

export default StatusModalRender;
