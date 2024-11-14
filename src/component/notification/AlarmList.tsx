import { useState, useEffect } from 'react';
import { useNotificationScroll } from '@/hooks/notification/useNotificationScroll';
import { fetchDeleteNotifications } from '@/api/Notification';
import NotificationList from '@/component/notification/NotificationList';
import EmptyNotification from '@/component/notification/EmptyNotification'

/**
 * 알림 목록을 표시하고 관리하는 컴포넌트
 * 무한 스크롤을 지원하며, 각 알림 항목을 클릭하여 삭제 가능
 * 
 * @component
 * @returns {JSX.Element} 알림 목록을 렌더링하는 JSX 요소
 */
function AlarmList(): JSX.Element {
  const {
    notifications,
    setNotifications,
    hasMore,
    listInnerRef,
    handleScroll,
    fetchMoreNotifications
  } = useNotificationScroll();

  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (notifications.length === 0 && hasMore) {
      fetchMoreNotifications();
    }
  }, [notifications, hasMore]);

  const handleDelete = async (notificationId: number) => {
    try {
      setDeletingId(notificationId);
      
      setTimeout(async () => {
        await fetchDeleteNotifications(notificationId);
        setNotifications((prev) =>
          prev.filter((notification) => notification.notificationId !== notificationId)
        );
        setDeletingId(null);
        
        if (hasMore) {
          fetchMoreNotifications();
        }
      }, 300);
    } catch (error) {
      console.error('알림 삭제 중 오류 발생:', error);
      setDeletingId(null);
    }
  };

  return (
    <div
      className="w-full h-[400px] overflow-y-auto"
      onScroll={handleScroll}
      ref={listInnerRef}
    >
      {notifications.length > 0 ? (
        <NotificationList
          notifications={notifications}
          deletingId={deletingId}
          onDelete={handleDelete}
        />
      ) : (
        <EmptyNotification />
      )}
    </div>
  );
}

export default AlarmList;
