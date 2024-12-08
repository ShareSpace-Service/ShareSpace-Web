import { useEffect, useRef, useState } from 'react';
import { connectSSE } from '@/api/Sse';
import { fetchUnreadNotificationsCount } from '@/api/Notification';
import { fetchUnreadNoteCount } from '@/api/Note';
import useNotificationStore from '@/store/NotificationStore';
import useNoteStore from '@/store/NoteStore';
import { useAuthStore } from '@/store/AuthStore';

/**
 * SSE(Server-Sent Events)를 통한 실시간 알림 기능을 관리하는 커스텀 훅
 *
 * @returns {Object} 알림 상태와 관련 메서드들을 포함한 객체
 * @property {boolean} hasNewNotification - 새로운 알림 존재 여부
 * @property {string} latestNotification - 최신 알림 메시지
 * @property {boolean} isVisible - 알림 토스트의 표시 여부
 * @property {number} unreadCount - 읽지 않은 알림의 개수
 * @property {Function} showNotification - 새로운 알림을 표시하는 함수
 */
export const useNotificationSSE = () => {
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [latestNotification, setLatestNotification] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { unreadCount, setUnreadCount } = useNotificationStore();
  const { setUnreadCount: setUnreadNoteCount } = useNoteStore();
  const { isAuthenticated } = useAuthStore();

  const timerRef = useRef<NodeJS.Timeout>();
  const sseConnectionRef = useRef<EventSource | null>(null);

  /**
   * 읽지 않은 알림과 쪽지 개수를 서버로부터 가져오는 함수
   *
   * @async
   * @throws {Error} 알림/쪽지 개수 로드 실패 시 에러
   */
  const loadUnreadCounts = async () => {
    try {
      const [notificationCount, noteCount] = await Promise.all([
        fetchUnreadNotificationsCount(),
        fetchUnreadNoteCount(),
      ]);

      setUnreadCount(notificationCount);
      setUnreadNoteCount(noteCount.data.unreadCount);
    } catch (error) {
      // console.error('읽지 않은 알림/쪽지 개수 로드 실패:', error);
    }
  };

  /**
   * 새로운 알림을 화면에 표시하는 함수
   * 3초 후 자동으로 사라지는 토스트 알림을 생성
   *
   * @param {string} message - 표시할 알림 메시지
   */
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

  // SSE 연결 해제 함수
  // const disconnectSSE = () => {
  //   if (sseConnectionRef.current) {
  //     sseConnectionRef.current.close();
  //     sseConnectionRef.current = null;
  //   }
  // };

  useEffect(() => {
    let mounted = true;
    const channel = new BroadcastChannel('notification-channel');

    const handleBroadcastMessage = (event: MessageEvent) => {
      if (!mounted) return;

      switch (event.data.type) {
        case 'NOTIFICATION':
          showNotification(event.data.data);
          loadUnreadCounts();
          break;
        case 'SSE_DISCONNECTED':
          sseConnectionRef.current = null;
          break;
      }
    };

    channel.addEventListener('message', handleBroadcastMessage);

    if (isAuthenticated && !sseConnectionRef.current) {
      loadUnreadCounts();
      const eventSource = connectSSE(async (event: MessageEvent) => {
        if (!mounted) return;
        try {
          const newNotification = event.data;
          showNotification(newNotification);
          loadUnreadCounts();
        } catch (parseError) {
          // console.error('SSE 메시지 파싱 실패:', parseError);
        }
      });

      sseConnectionRef.current = eventSource;
    }

    return () => {
      mounted = false;
      channel.removeEventListener('message', handleBroadcastMessage);
      channel.close();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isAuthenticated]);

  return {
    hasNewNotification,
    latestNotification,
    isVisible,
    unreadCount,
    showNotification,
  };
};
