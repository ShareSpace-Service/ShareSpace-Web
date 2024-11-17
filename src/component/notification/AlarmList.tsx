import { useState, useEffect } from 'react';
import { useNotificationScroll } from '@/hooks/notification/useNotificationScroll';
import { fetchDeleteNotifications } from '@/api/Notification';
import EmptyNotification from '@/component/notification/EmptyNotification';
import NotificationItem from './NotificationItem';

/**
 * 알림 목록을 표시하고 관리하는 컴포넌트
 * 무한 스크롤을 지원하며, 각 알림 항목을 클릭하여 삭제 가능
 *
 * @component
 * @returns {JSX.Element} 알림 목록을 렌더링하는 JSX 요소
 */
function AlarmList({
  isDeletingAll = false,
}: {
  isDeletingAll?: boolean;
}): JSX.Element {
  const {
    notifications,
    setNotifications,
    hasMore,
    listInnerRef,
    handleScroll,
    fetchMoreNotifications,
  } = useNotificationScroll();

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (notificationId: number) => {
    try {
      setDeletingId(notificationId);
      setIsDeleting(true);

      setTimeout(async () => {
        await fetchDeleteNotifications(notificationId);
        setNotifications((prev) =>
          prev.filter(
            (notification) => notification.notificationId !== notificationId
          )
        );

        if (notifications.length <= 5 && hasMore) {
          fetchMoreNotifications();
        }

        setDeletingId(null);
        setIsDeleting(false);
      }, 300);
    } catch (error) {
      console.error('알림 삭제 중 오류 발생:', error);
      setDeletingId(null);
      setIsDeleting(false);
    }
  };

  // 전체 삭제 시 애니메이션 효과를 위한 지연 처리
  useEffect(() => {
    if (isDeletingAll) {
      // 애니메이션이 끝난 후에 notifications를 비움
      setTimeout(() => {
        setNotifications([]);
      }, 500); // 애니메이션 시간과 맞춤
    }
  }, [isDeletingAll]);

  return (
    <div
      className="w-full h-[400px] overflow-y-auto"
      onScroll={handleScroll}
      ref={listInnerRef}
    >
      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.notificationId}
              notification={notification}
              isDeleting={
                isDeletingAll || deletingId === notification.notificationId
              }
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyNotification />
      )}
    </div>
  );
}

export default AlarmList;
