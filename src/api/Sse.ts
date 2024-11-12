import { EventSourcePolyfill } from 'event-source-polyfill';

export function connectSSE(
  onMessage: (event: MessageEvent) => void
): EventSourcePolyfill {
  const eventSource = new EventSourcePolyfill(
    `http://localhost:8080/notification/sse`,
    {
      withCredentials: true,
      heartbeatTimeout: 60000,
      reconnectInterval: 3000,
    }
  );

  eventSource.onopen = () => {
    console.log('SSE 연결 성공');
  };

  eventSource.addEventListener('NOTIFICATION', (event) => {
    console.log('알림 이벤트 수신:', event.data);
    onMessage(new MessageEvent('message', { data: event.data }));
  });

  eventSource.addEventListener('HEARTBEAT', () => {
    console.log('하트비트 수신');
  });

  eventSource.onerror = (error) => {
    console.error('SSE 연결 오류 발생:', error);

    if (
      eventSource.readyState === EventSource.CLOSED ||
      eventSource.readyState === EventSource.CONNECTING
    ) {
      console.log('연결이 종료되거나 연결 중 문제 발생. 재연결 시도');
      
      eventSource.close();

      // 재연결 시도
      setTimeout(() => {
        try {
          connectSSE(onMessage);
        } catch (reconnectError) {
          console.error('재연결 실패:', reconnectError);
        }
      }, 5000);
    }
  };

  return eventSource;
}

export function disconnectSSE() {
  // 기존 연결 종료 로직
}
