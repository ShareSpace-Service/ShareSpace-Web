import { EventSourcePolyfill } from 'event-source-polyfill';
import { getCookieValue } from '@/api/Login';

export function connectSSE(
  onMessage: (event: MessageEvent) => void
): EventSource {
  const accessToken = getCookieValue('accessToken');

  if (!accessToken) {
    console.error('인증 토큰이 없습니다.');
    throw new Error('인증 토큰이 필요합니다.');
  }

  const eventSource = new EventSourcePolyfill(
    `http://localhost:8080/notification/sse`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
      heartbeatTimeout: 60000,
      reconnectInterval: 3000,
    }
  );

  eventSource.onopen = () => {
    console.log('SSE 연결 성공');
  };

  // NOTIFICATION 이벤트에 대한 리스너 추가
  eventSource.addEventListener('NOTIFICATION', (event) => {
    console.log('알림 이벤트 수신:', event.data);
    // 서버에서 온 데이터를 직접 사용
    onMessage(new MessageEvent('message', { data: event.data }));
  });

  // 하트비트 이벤트 리스너 추가
  eventSource.addEventListener('HEARTBEAT', () => {
    console.log('하트비트 수신');
  });

  eventSource.onerror = (error) => {
    console.error('SSE 연결 오류 발생:', error);

    if (eventSource.readyState === EventSource.CLOSED || eventSource.readyState === EventSource.CONNECTING) {
      console.log('연결이 종료되거나 연결 중 문제 발생. 재연결 시도');
      
      eventSource.close();
      
      setTimeout(() => {
        try {
          const newToken = getCookieValue('accessToken');
          if (newToken) {
            connectSSE(onMessage);
          } else {
            console.error('재연결을 위한 토큰이 없습니다.');
          }
        } catch (reconnectError) {
          console.error('재연결 실패:', reconnectError);
        }
      }, 5000);
    }
  };

  return eventSource;
}
