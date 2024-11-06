import { useState, useEffect } from 'react';
import Alarm from '@/assets/Alarm.svg';
import HeaderIcon from '@/component/ui/HeaderIcon';
import { connectSSE } from '@/api/Sse';

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
  const [hasNewNotification, setHasNewNotification] = useState<boolean>(false); // 새로운 알림이 있는지 여부
  const [latestNotification, setLatestNotification] = useState<string>(''); // 최근 알림 메시지 저장

  useEffect(() => {
    let eventSource: EventSource | null = null;

    const setupSSE = async () => {
      try {
        console.log('SSE 설정 시작');  // 디버깅용 로그
        
        const handleMessage = (event: MessageEvent) => {
          try {
            const newNotification = event.data;
            setHasNewNotification(true);
            setLatestNotification(newNotification);
          } catch (parseError) {
          }
        };

        eventSource = connectSSE(handleMessage);
        console.log('SSE 연결 완료');  // 디버깅용 로그
      } catch (error) {
        console.error('SSE 연결 실패:', error);
      }
    };

    setupSSE();

    // return () => {
    //   if (eventSource) {
    //     console.log('SSE 연결 종료');
    //     eventSource.close();
    //   }
    // };
  }, []);

  useEffect(() => {
    if (hasNewNotification) {
      // 6초 후에 알림을 자동으로 닫음
      const timer = setTimeout(() => {
        setHasNewNotification(false);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [hasNewNotification]);

  // 알림창(모달)이 열릴 때, 알림 미리보기 박스 숨기기
  const handleIconClick = () => {
    setHasNewNotification(false); // 미리보기 박스 숨기기
    onClick(); // 상위 컴포넌트에서 모달 열기 처리
  };

  return (
    <div className="relative">
      <HeaderIcon src={Alarm} alt="Alarm" onClick={handleIconClick} />

      {/* 알림 메시지 컨테이너 */}
      <div
        className={`fixed top-0 left-0 right-0 flex justify-center transition-transform duration-700 ease-in-out ${
          hasNewNotification ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border border-blue-600 shadow-lg rounded-b-lg px-6 py-4 mt-0 max-w-md transform hover:scale-102 transition-all">
          <div className="flex items-center space-x-3">
            {/* 알림 아이콘 */}
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
            
            {/* 알림 메시지 */}
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
