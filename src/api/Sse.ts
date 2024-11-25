import { useAuthStore } from '@/store/AuthStore';
import config from '@/config/config';

const NOTIFICATION_CHANNEL = 'notification-channel';
let activeEventSource: EventSource | null = null;
const broadcastChannel = new BroadcastChannel(NOTIFICATION_CHANNEL);

export function connectSSE(
  onMessage: (event: MessageEvent) => void
): EventSource {
  // 이미 활성화된 연결이 있다면 재사용
  if (activeEventSource?.readyState === EventSource.OPEN) {
    return activeEventSource;
  }

  const eventSource = new EventSource(`${config.baseUrl}/notification/sse`, {
    withCredentials: true,
  });

  activeEventSource = eventSource;

  eventSource.onopen = () => {
    // 다른 탭들에게 연결 상태 브로드캐스트
    broadcastChannel.postMessage({ type: 'SSE_CONNECTED' });
  };

  eventSource.addEventListener('NOTIFICATION', (event) => {
    // 현재 탭에서 메시지 처리
    onMessage(new MessageEvent('message', { data: event.data }));
    // 다른 탭들에게 알림 브로드캐스트
    broadcastChannel.postMessage({
      type: 'NOTIFICATION',
      data: event.data,
    });
  });

  eventSource.onerror = (error) => {
    if ((error as any).status === 401) {
      closeConnection();
      return;
    }

    if (
      eventSource.readyState === EventSource.CLOSED ||
      eventSource.readyState === EventSource.CONNECTING
    ) {
      closeConnection();

    //   if (useAuthStore.getState().isAuthenticated) {
    //     setTimeout(() => {
    //       try {
    //         connectSSE(onMessage);
    //       } catch (reconnectError) {
    //         console.error('재연결 실패:', reconnectError);
    //       }
    //     }, 5000);
    //   }
    // }
  };

  return eventSource;
}

function closeConnection() {
  if (activeEventSource) {
    activeEventSource.close();
    activeEventSource = null;
    broadcastChannel.postMessage({ type: 'SSE_DISCONNECTED' });
  }
}

// 페이지 언로드 시 연결 정리
window.addEventListener('unload', closeConnection);
