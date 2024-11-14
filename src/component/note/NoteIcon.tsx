import Message from '@/assets/Message.svg';
import HeaderIcon from '@/component/ui/HeaderIcon';
import NoteBadge from './NoteBadge';
import { Link } from 'react-router-dom';
import useNoteStore from '@/store/NoteStore';

/**
 * 쪽지 아이콘과 읽지 않은 쪽지 개수를 표시하는 컴포넌트
 *
 * @component
 */
function NoteIcon(): JSX.Element {
  const { unreadCount } = useNoteStore();

  return (
    <div className="relative">
      <Link to="/message">
        <HeaderIcon src={Message} alt="Message" />
        <NoteBadge count={unreadCount} />
      </Link>
    </div>
  );
}

export default NoteIcon;
