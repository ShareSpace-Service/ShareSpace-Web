import { useState, useEffect } from 'react';
import Alarm from '@/assets/Alarm.svg';
import HeaderIcon from '@/component/ui/HeaderIcon';
import { connectSSE } from '@/api/Sse';

interface AlarmBoxProps {
  onClick: () => void;
}

/**
 * alarmbox 컴포넌트는 알림을 실시간으로 받아 알림 아이콘 밑에 작은 박스를 표시함
 *
 * @param {Function} onClick - 알림 아이콘 클릭 시 호출되는 함수
 * @returns {JSX.Element} 알림 아이콘과 미리보기 박스를 표시하는 컴포넌트
 */
function AlarmBox({ onClick }: AlarmBoxProps): JSX.Element {
  const [hasNewNotification, setHasNewNotification] = useState<boolean>(false); // 새로운 알림이 있는지 여부
  const [latestNotification, setLatestNotification] = useState<string>(''); // 최근 알림 메시지

  useEffect(() => {
    const userId = 1; // 테스트를 위해 매직 넘버 사용, 실제로는 userId 동적으로 받아와야 함
    const eventSource = connectSSE(userId, (event) => {
      const newNotification = event.data.message;
      setHasNewNotification(true); // 새로운 알림이 있음을 표시
      setLatestNotification(newNotification); // 최근 알림 메시지 저장
    });

    // 알림 이벤트 처리
    eventSource.addEventListener('NOTIFICATION', (event) => {
      const parsedData = JSON.parse(event.data);
      console.log('알림 수신:', parsedData.message); // 수신된 알림 콘솔 출력
      setHasNewNotification(true);
      setLatestNotification(parsedData.message);
    });

    return () => {
      eventSource.close(); // 컴포넌트 언마운트 시 SSE 연결 종료
    };
  }, []);

  // 알림창(모달)이 열릴 때, 알림 미리보기 박스 숨기기
  const handleIconClick = () => {
    setHasNewNotification(false); // 미리보기 박스 숨기기
    onClick(); // 상위 컴포넌트에서 모달 열기 처리
  };

  return (
    <div className="relative">
      <HeaderIcon src={Alarm} alt="Alarm" onClick={handleIconClick} />

      {/* 새로운 알림이 있을 때만 작은 박스를 표시 */}
      {hasNewNotification && (
        <div className="absolute top-0 mt-12 right-0 bg-white border border-gray-300 shadow-lg rounded-lg p-2 w-48">
          <p className="text-sm text-gray-700">새로운 알림이 도착했습니다</p>
        </div>
      )}
    </div>
  );
}

export default AlarmBox;
