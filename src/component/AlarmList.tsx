import { useEffect, useState, useRef } from 'react';
import {
  fetchDeleteNotifications,
  fetchNotifications,
} from '@/api/Notification';
import { formatTimeElapsed } from '@/lib/Formatter';

interface Notification {
  notificationId: number;
  message: string;
  timeElapsed: number; // 분 단위
  read: boolean;
}

/**
 * AlarmList 컴포넌트는 서버에서 알림 데이터를 페이지네이션 방식으로 불러오고,
 * 스크롤 이벤트를 처리하여 더 많은 데이터를 가져오는 기능을 제공한다.
 * 또한, 알림 클릭 시 삭제 처리도 담당한다.
 *
 * @component
 * @returns {JSX.Element} 알림 목록을 보여주는 JSX 컴포넌트
 */
function AlarmList(): JSX.Element {
  /**
   * 알림 데이터를 저장하는 상태
   * @type {Notification[]}
   */
  const [notifications, setNotifications] = useState<Notification[]>([]);

  /**
   * 페이지 번호를 저장하는 상태. 기본값은 0으로, 첫 번째 페이지부터 시작
   * @type {number}
   */
  const [page, setPage] = useState(0); // 페이지 상태

  /**
   * 한 번에 불러올 데이터 개수. 기본값은 5개로 설정되어 있음.
   * @type {number}
   */
  const [size] = useState(5); // 한 번에 불러올 데이터 개수

  /**
   * 더 많은 데이터를 불러올 수 있는지 여부를 저장하는 상태.
   * 데이터가 없으면 false로 설정된다.
   * @type {boolean}
   */
  const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터가 있는지 여부

  /**
   * 리스트 내부의 스크롤 참조를 위한 Ref.
   * 스크롤 이벤트를 처리하기 위해 사용한다.
   * @type {React.MutableRefObject<HTMLDivElement | null>}
   */
  const listInnerRef = useRef<HTMLDivElement | null>(null);

  // 삭제 중인 알림 ID를 추적하기 위한 상태 추가
  const [deletingId, setDeletingId] = useState<number | null>(null);

  /**
   * 알림을 삭제한 후 빈 자리를 채우기 위해 추가 데이터를 가져오는 함수
   */
  const fetchAfterDelete = async () => {
    try {
      // 현재 표시된 마지막 알림의 다음 데이터부터 가져오기
      const data = await fetchNotifications(Math.floor(notifications.length / size), size);
      
      if (data.length > 0) {
        // 새로운 데이터 중 하나만 추가
        setNotifications(prev => {
          const uniqueNotifications = [...prev, data[0]].filter(
            (notification, index, self) =>
              index === self.findIndex(
                (n) => n.notificationId === notification.notificationId
              )
          );
          return uniqueNotifications;
        });
      }
      
      // 더 이상 가져올 데이터가 없으면 hasMore false
      if (data.length < size) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('추가 알림을 불러오는 중 오류 발생:', error);
    }
  };

  /**
   * 서버로부터 알림 데이터를 페이지네이션 방식으로 가져오는 함수.
   * 페이지 번호와 페이지당 데이터 개수를 인자로 서버에 전달하여 데이터를 요청한다.
   * 데이터를 성공적으로 불러오면 기존 상태에 데이터를 추가하고,
   * 불러온 데이터가 설정된 개수보다 적으면 더 이상 불러올 데이터가 없음을 의미하므로 hasMore 상태를 false로 설정한다.
   *
   * @async
   * @function fetchMoreNotifications
   * @returns {Promise<void>}
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
   * 컴포넌트가 처음 렌더링될 때 호출되는 hook.
   * 페이지 번호가 바뀔 때마다 새로운 알림 데이터를 가져온다.
   *
   * @useEffect
   */
  useEffect(() => {
    if (notifications.length === 0 && hasMore) {
      fetchMoreNotifications(); // 다음 페이지 자동 로드
    }
  }, [notifications, hasMore]);
  /**
   * 스크롤 이벤트를 처리하는 함수.
   * 스크롤이 리스트의 끝에 도달하면 페이지 번호를 증가시키고, 새로운 알림 데이터를 요청한다.
   *
   * @function handleScroll
   */
  const handleScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore) {
        setPage((prevPage) => prevPage + 1); // 페이지 증가
      }
    }
  };

  /**
   * 개별 알림을 클릭했을 때 실행되는 함수.
   * 해당 알림을 서버에서 삭제하고, 로컬 상태에서도 해당 알림을 제거한다.
   *
   * @async
   * @function handleNotificationClick
   * @param {number} notificationId - 클릭한 알림의 ID
   * @returns {Promise<void>}
   */
  const handleNotificationClick = async (notificationId: number) => {
    try {
      setDeletingId(notificationId);
      
      setTimeout(async () => {
        await fetchDeleteNotifications(notificationId);
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification.notificationId !== notificationId
          )
        );
        setDeletingId(null);
        
        // 알림 삭제 후 새로운 데이터 하나 가져오기
        if (hasMore) {
          fetchAfterDelete();
        }
      }, 300);
      
    } catch (error) {
      console.error(error);
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
        notifications.map((notification) => (
          <div
            key={notification.notificationId}
            className={`flex justify-between items-center rounded-xl shadow-lg hover:shadow-2xl 
              transition-all duration-300 ease-in-out w-full h-[80px] cursor-pointer mb-4 p-4 
              ${!notification.read ? 'bg-blue-50' : 'bg-white'}
              ${deletingId === notification.notificationId ? 
                'transform translate-x-full opacity-0' : 
                'transform translate-x-0 opacity-100'
              }`}
            onClick={() => handleNotificationClick(notification.notificationId)}
          >
            <div className="flex items-center w-full">
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse" />
              )}
              <div className="flex-1">
                <p
                  className={`font-bold ${!notification.read ? 'text-blue-900' : ''}`}
                >
                  {notification.message}
                </p>
                <p className="text-sm text-gray-500">
                  {formatTimeElapsed(notification.timeElapsed)}
                </p>
              </div>
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
