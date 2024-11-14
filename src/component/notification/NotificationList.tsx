import { Notification } from '@/interface/NotificationInterface';
import NotificationItem from '@/component/notification/NotificationItem';

interface NotificationListProps {
  notifications: Notification[];
  deletingId: number | null;
  onDelete: (id: number) => Promise<void>;
}

/**
 * 알림 목록을 렌더링하는 컴포넌트
 * 
 * @component
 * @param {Object} props - 컴포넌트 props
 * @param {Notification[]} props.notifications - 표시할 알림 목록
 * @param {number | null} props.deletingId - 현재 삭제 중인 알림의 ID
 * @param {Function} props.onDelete - 알림 삭제 핸들러 함수
 */
function NotificationList({ notifications, deletingId, onDelete }: NotificationListProps): JSX.Element {
  return (
    <>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.notificationId}
          notification={notification}
          isDeleting={deletingId === notification.notificationId}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}

export default NotificationList; 