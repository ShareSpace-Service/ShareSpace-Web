import { useState, useEffect, useRef } from 'react';
import Alarm from '@/assets/Alarm.svg';
import HeaderIcon from '@/component/ui/HeaderIcon';
import { connectSSE } from '@/api/Sse';
import { fetchUnreadNotificationsCount } from '@/api/Notification';
import useNotificationStore from '@/store/NotificationStore';

interface AlarmBoxProps {
  onClick: () => void;
}
// TODO : ApiResponse 및 UserData 삭제 예정
export interface ApiResponse {
  message: string;
  status: string;
  data: UserData;
  success: boolean;
}

export interface UserData {
  userId: number;
}

/**
 * alarmbox 컴포넌트는 알림을 실시간으로 받아 알림 아이콘 밑에 작은 박스를 표시함
 *
 * @param {Function} onClick - 알림 아이콘 클릭 시 호출되는 함수
 * @returns {JSX.Element} 알림 아이콘과 미리보기 박스를 표시하는 컴포넌트
 */
function AlarmBox({ onClick }: AlarmBoxProps): JSX.Element {
  const [hasNewNotification, setHasNewNotification] = useState<boolean>(false);
  const [latestNotification, setLatestNotification] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { unreadCount, setUnreadCount } = useNotificationStore();

  const timerRef = useRef<NodeJS.Timeout>();
  const sseConnectionRef = useRef<EventSource | null>(null); // SSE 연결 상태 추적

  const loadUnreadCount = async () => {
    try {
      const count = await fetchUnreadNotificationsCount();
      setUnreadCount(count);
    } catch (error) {
      console.error('읽지 않은 알림 개수 로드 실패:', error);
    }
  };

  useEffect(() => {
    loadUnreadCount();

    const setupSSE = () => {
      if (sseConnectionRef.current) return; // 이미 연결된 상태라면 중복 연결 방지

      try {
        const eventSource = connectSSE(async (event: MessageEvent) => {
          try {
            const newNotification = event.data;
            showNotification(newNotification);
            loadUnreadCount();
          } catch (parseError) {
            console.error('SSE 메시지 파싱 실패:', parseError);
          }
        });
        sseConnectionRef.current = eventSource; // 연결을 추적
      } catch (error) {
        console.error('SSE 연결 실패:', error);
      }
    };

    setupSSE();

    // cleanup: 컴포넌트가 언마운트되거나 재렌더링될 때 기존 SSE 연결 해제
    return () => {
      if (sseConnectionRef.current) {
        sseConnectionRef.current.close();
        sseConnectionRef.current = null;
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const showNotification = (message: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      setHasNewNotification(false);
    }

    setLatestNotification(message);
    setIsVisible(true);
    setHasNewNotification(true);

    timerRef.current = setTimeout(() => {
      setHasNewNotification(false);
      setTimeout(() => {
        setIsVisible(false);
      }, 700);
    }, 3000);
  };

  const handleIconClick = async () => {
    try {
      onClick();
    } catch (error) {
      console.error('알림 처리 실패:', error);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <HeaderIcon src={Alarm} alt="Alarm" onClick={handleIconClick} />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}
      </div>

      <div className="fixed top-0 left-0 right-0 flex justify-center pointer-events-none overflow-hidden">
        <div
          className={`bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
            border border-blue-600 shadow-lg rounded-b-lg px-6 py-4 mt-0 max-w-md 
            transform transition-all duration-700 ease-in-out`}
          style={{
            transform: `translateY(${isVisible ? '0' : '-100%'})`,
            opacity: hasNewNotification ? '1' : '0',
            pointerEvents: 'none',
            position: 'relative',
            top: 0,
          }}
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-white animate-pulse"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold tracking-wide">
                {latestNotification}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlarmBox;
