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
  isRead?: boolean;
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
      const data = await fetchNotifications(page, size); // 페이지와 크기 전달
      setNotifications((prev) => [...prev, ...data]);

      // 서버에서 받은 데이터가 size보다 작으면 더 이상 데이터가 없음
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
    fetchMoreNotifications(); // 첫 페이지 데이터 로드
  }, [page]);

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
      await fetchDeleteNotifications(notificationId);
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.notificationId !== notificationId
        )
      );
    } catch (error) {
      console.error(error);
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
