import { useRef, useState } from 'react';
import { Notification } from '@/interface/NotificationInterface';
import { fetchNotifications } from '@/api/Notification';

/**
 * 알림 목록의 무한 스크롤 기능을 관리하는 커스텀 훅
 * 
 * @param {number} size - 한 번에 불러올 알림의 개수 (기본값: 5)
 * @returns {Object} 알림 목록 상태와 관련 메서드들을 포함한 객체
 * @property {Notification[]} notifications - 현재 표시된 알림 목록
 * @property {Function} setNotifications - 알림 목록을 업데이트하는 함수
 * @property {boolean} hasMore - 추가로 불러올 알림이 있는지 여부
 * @property {Function} setHasMore - hasMore 상태를 업데이트하는 함수
 * @property {React.RefObject} listInnerRef - 스크롤 컨테이너의 ref
 * @property {Function} handleScroll - 스크롤 이벤트 핸들러
 * @property {Function} fetchMoreNotifications - 추가 알림을 불러오는 함수
 */
export const useNotificationScroll = (size: number = 5) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const listInnerRef = useRef<HTMLDivElement | null>(null);

  /**
   * 서버로부터 추가 알림을 불러오는 함수
   * 중복 알림을 필터링하고 새로운 알림을 기존 목록에 추가
   * 
   * @async
   * @throws {Error} 알림 데이터 로드 실패 시 에러
   */
  const fetchMoreNotifications = async () => {
    try {
      const data = await fetchNotifications(page, size);

      setNotifications((prev) => {
        const uniqueNotifications = [...prev, ...data].filter(
          (notification, index, self) =>
            index === self.findIndex(
              (n) => n.notificationId === notification.notificationId
            )
        );
        return uniqueNotifications;
      });

      if (data.length < size) setHasMore(false);
    } catch (error) {
      console.error('알림을 불러오는 중 오류 발생:', error);
    }
  };

  /**
   * 스크롤 이벤트를 처리하는 함수
   * 스크롤이 하단에 가까워지면 추가 데이터를 로드하기 위해 페이지 번호를 증가
   */
  const handleScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  return {
    notifications,
    setNotifications,
    hasMore,
    setHasMore,
    listInnerRef,
    handleScroll,
    fetchMoreNotifications,
  };
};
