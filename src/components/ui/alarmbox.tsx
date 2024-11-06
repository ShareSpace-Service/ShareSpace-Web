import { useState, useEffect } from 'react';
import Alarm from '@/assets/Alarm.svg';
import HeaderIcon from '@/component/ui/HeaderIcon';
import { connectSSE } from '@/api/Sse';

interface AlarmBoxProps {
  onClick: () => void;
}

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
  const [hasNewNotification, setHasNewNotification] = useState<boolean>(false); // 새로운 알림이 있는지 여부
  const [latestNotification, setLatestNotification] = useState<string>(''); // 최근 알림 메시지 저장

  // userId를 가져오고 SSE 연결을 설정하는 비동기 함수
  useEffect(() => {
    const setupSSE = async () => {
      try {
        // userId를 비동기적으로 가져옴
        // const userData = await fetchUserId();
        // setUserId(userData.userId); // userId 저장

        // SSE 연결 설정
        const eventSource = connectSSE((event) => {
          const newNotification = event.data; // 이벤트 데이터를 바로 할당
          setHasNewNotification(true); // 새로운 알림이 있음을 표시
          setLatestNotification(newNotification); // 최근 알림 메시지 저장
        });

        // 알림 이벤트 처리
        eventSource.addEventListener('NOTIFICATION', (event) => {
          const parsedData = JSON.parse(event.data); // 이벤트 데이터를 파싱
          setHasNewNotification(true); // 새로운 알림이 있음을 표시
          setLatestNotification(parsedData.message); // 최근 알림 메시지 저장
        });

        // 컴포넌트 언마운트 시 SSE 연결 종료
        return () => {
          eventSource.close();
        };
      } catch (error) {
        console.error('Failed to fetch user ID or connect to SSE:', error);
      }
    };

    setupSSE(); // useEffect 안에서 비동기 함수 실행
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
          <p className="text-sm text-gray-700">{latestNotification}</p>
        </div>
      )}
    </div>
  );
}

export default AlarmBox;
