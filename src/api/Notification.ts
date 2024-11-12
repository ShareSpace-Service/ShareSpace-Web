import { getRequest, deleteRequest, patchRequest } from '@/api/Request';

/**
 * 서버에서 알림 데이터를 GET 요청으로 불러오는 함수
 *
 * @param page {number} 요청할 페이지 번호
 * @param size {number} 페이지당 요청할 데이터 개수
 * @returns {Promise<any>} 서버로부터 알림 리스트 데이터를 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchNotifications(
  page: number,
  size: number
): Promise<any> {
  const result = await getRequest(
    `http://localhost:8080/notification?page=${page}&size=${size}`
  );
  return result.data;
}

/**
 * 알림을 삭제하는 요청을 처리하는 함수
 * @param {number} notificationId - 삭제할 알림의 ID
 * @returns {Promise<any>} 서버로부터의 응답 데이터를 포함한 Promise
 */
export async function fetchDeleteNotifications(
  notificationId: number
): Promise<any> {
  const url = `http://localhost:8080/notification?notificationId=${notificationId}`;
  const result = await deleteRequest(url);
  return result;
}

/**
 * 모든 알림을 읽음 처리하는 함수
 * @returns {Promise<any>} 서버로부터의 응답 데이터를 포함한 Promise
 */
export async function fetchReadAllNotifications(): Promise<any> {
  const url = `http://localhost:8080/notification/read`;
  const result = await patchRequest(url, {});
  return result;
}

/**
 * 읽지 않은 알림 개수를 조회하는 함수
 * @returns {Promise<number>} 읽지 않은 알림 개수
 */
export async function fetchUnreadNotificationsCount(): Promise<number> {
  const result = await getRequest('http://localhost:8080/notification/unread-alarms');
  return result.data.unreadNotificationNum;
}
