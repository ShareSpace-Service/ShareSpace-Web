/**
 * SSE 연결을 설정하는 함수.
 * @param {number} userId - 로그인한 사용자의 ID
 * @param {(event: MessageEvent) => void} onMessage - 알림 메시지를 받을 때 호출되는 콜백 함수
 * @returns {EventSource} SSE 연결 객체를 반환
 */
export function connectSSE(
  userId: number,
  onMessage: (event: MessageEvent) => void
): EventSource {
  // SSE 연결 설정
  const eventSource = new EventSource(
    `http://localhost:8080/notification/sse/${userId}`
  );

  // 일반적인 메시지(onmessage) 처리 (기본적으로 명명되지 않은 이벤트)
  eventSource.onmessage = (event) => {
    onMessage(event); // 외부에서 전달된 onMessage 콜백 함수 호출
  };

  // 명명된 이벤트 처리 (예: 'NOTIFICATION' 이벤트)
  eventSource.addEventListener('NOTIFICATION', (event) => {
    onMessage(event); // 외부에서 전달된 onMessage 콜백 함수 호출
  });

  // 오류 발생 시 처리
  eventSource.onerror = (error) => {
    console.error('SSE 연결 오류 발생:', error);
    eventSource.close(); // 오류 발생 시 연결 종료
  };

  // SSE 연결 객체 반환
  return eventSource;
}
