import { getRequest } from './Request'; // getRequest 함수 사용

/**
 * 서버에서 알림 데이터를 GET 요청으로 불러오는 함수
 *
 * @returns {Promise<any>} 서버로부터 알림 리스트 데이터를 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchNotifications(): Promise<any> {
  const result = await getRequest('http://localhost:8080/notification');
  return result.data;
}