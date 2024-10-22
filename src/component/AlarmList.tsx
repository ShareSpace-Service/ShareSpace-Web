import { useEffect, useState } from 'react';
import { fetchNotifications } from '@/api/Notification';
// import { connectSSE } from '@/api/Sse';
import { formatTimeElapsed } from '@/lib/Formatter';

interface Notification {
  notificationId: number;
  message: string;
  timeElapsed: number; // 분 단위
  isRead?: boolean;
}

/**
 * AlarmList 컴포넌트는 기존 알림을 불러오고, SSE를 통해 실시간으로 알림을 받는 컴포넌트
 *
 * @returns {JSX.Element} 알림 목록을 보여주는 컴포넌트
 */
function AlarmList(): JSX.Element {
  // 알림 데이터를 저장하는 상태 선언
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // userId는 고정된 값으로 설정 (실제 로그인 후 userId를 받아와야 함)
  const userId = 1; // 예시로 고정된 userId

  useEffect(() => {
    /*
     * 서버에서 기존 알림 데이터를 불러오는 함수
     */
    const getNotifications = async () => {
      try {
        const data = await fetchNotifications(); // 서버에서 알림 데이터 fetch
        setNotifications(data); // 상태에 알림 데이터 저장
      } catch (error) {
        console.error('알림을 불러오는 중 오류 발생:', error); // 오류 처리
      }
    };
    getNotifications();
  }, [userId]);

  return (
    <div className="w-full">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification.notificationId}
            className="flex justify-between items-center rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-[80px] cursor-pointer mb-4 p-4"
          >
            <div>
              <p className="font-bold">{notification.message}</p>
              <p className="text-sm text-gray-500">
                {formatTimeElapsed(notification.timeElapsed)}{' '}
                {/* 경과 시간 형식 적용 */}
              </p>
            </div>
          </div>
        ))
      ) : (
        // 알림이 없을 경우 표시할 문구
        <p>알림이 없습니다.</p>
      )}
    </div>
  );
}

export default AlarmList;
