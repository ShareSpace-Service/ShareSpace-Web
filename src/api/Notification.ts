/**
 * 서버에서 알림 데이터를 GET 요청으로 불러오는 함수
 *
 * @returns {Promise<Notification[]>} 알림 리스트 데이터를 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러
 */
export async function fetchNotifications() {
  const response = await fetch('http://localhost:8080/notification', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('서버 상태가 그냥 미누갓!');
  }

  const result = await response.json();
  return result.data; // 알림 데이터는 응답의 data 속성에 있으므로
}
