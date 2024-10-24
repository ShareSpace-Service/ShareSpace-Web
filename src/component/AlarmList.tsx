import { useEffect, useState } from 'react';
import {
  fetchDeleteNotifications,
  fetchNotifications,
} from '@/api/Notification';
import { formatTimeElapsed } from '@/lib/Formatter';

interface Notification {
  notificationId: number;
  message: string;
  timeElapsed: number; // 분 단위
  isRead?: boolean;
}

/**
 * AlarmList 컴포넌트는 기존 알림을 불러오고, 알림을 클릭하면 개별 알림을 가져옴
 *
 * @returns {JSX.Element} 알림 목록을 보여주는 컴포넌트
 */
function AlarmList(): JSX.Element {
  // 알림 데이터를 저장하는 상태 선언
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    /*
     * 서버에서 기존 알림 데이터를 불러오는 함수
     */
    const getNotifications = async () => {
      try {
        const data = await fetchNotifications(); // 서버에서 알림 데이터 fetch

        // timeElapsed를 기준으로 오름차순 정렬 (최신 알림이 위에 오게)
        const sortedData = data.sort(
          (a: Notification, b: Notification) => a.timeElapsed - b.timeElapsed
        );
        setNotifications(sortedData); // 상태에 정렬된 알림 데이터 저장
      } catch (error) {
        console.error('알림을 불러오는 중 오류 발생:', error); // 오류 처리
      }
    };
    getNotifications();
  }, []);
  /**
   * 개별 알림 클릭 시 실행할 함수
   * @param notificationId - 클릭한 알림의 ID
   */
  const handleNotificationClick = async (notificationId: number) => {
    try {
      await fetchDeleteNotifications(notificationId); // 알림 삭제 페치
      // 삭제된 알림을 상태에서 제거
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.notificationId !== notificationId
        )
      );
    } catch (error) {
      console.error('알림을 삭제하는 중 오류 발생:', error);
    }
  };

  return (
    <div className="w-full">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification.notificationId}
            className="flex justify-between items-center rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-[80px] cursor-pointer mb-4 p-4"
            onClick={() => handleNotificationClick(notification.notificationId)}
          >
            <div>
              <p className="font-bold">{notification.message}</p>
              <p className="text-sm text-gray-500">
                {formatTimeElapsed(notification.timeElapsed)}{' '}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>알림이 없습니다.</p>
      )}
    </div>
  );
}

export default AlarmList;
