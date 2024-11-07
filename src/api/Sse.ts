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

  eventSource.onerror = (error) => {
    console.error('SSE 연결 오류 발생:', error);

    if (eventSource.readyState === EventSource.CLOSED) {
      console.log('연결이 종료됨. 재연결 시도');
      setTimeout(() => {
        try {
          eventSource.close();
          connectSSE(onMessage);
        } catch (reconnectError) {
          console.error('재연결 실패:', reconnectError);
        }
      }, 3000);
    }
  };

  return eventSource;
}
