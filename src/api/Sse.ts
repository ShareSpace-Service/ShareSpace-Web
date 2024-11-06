import { EventSourcePolyfill } from 'event-source-polyfill';
import { getCookieValue } from '@/api/Login';

export function connectSSE(
  onMessage: (event: MessageEvent) => void
): EventSource {
  const accessToken = getCookieValue('accessToken');
  const eventSource = new EventSourcePolyfill(
    `http://localhost:8080/notification/sse`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  eventSource.onmessage = (event) => {
    onMessage(event);
  };

  eventSource.onerror = (error) => {
    console.error('SSE 연결 오류 발생:', error);
    eventSource.close();
  };

  return eventSource;
}
