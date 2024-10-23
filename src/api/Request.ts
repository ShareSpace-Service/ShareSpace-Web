import { getCookieValue } from './Login';

/**
 * 공통으로 토큰을 실어서 fetch 요청을 처리하는 함수
 * @param {string} url - 요청할 URL
 * @param {RequestInit} options - fetch 옵션(메서드, 바디 등)
 * @returns {Promise<Response>} - 서버 응답을 포함한 Promise 객체
 * @throws {Error} - 토큰이 없거나 요청 실패 시 에러 발생
 */
async function fetchWithToken(
  url: string,
  options: RequestInit
): Promise<Response> {
  const token = getCookieValue('accessToken');

  if (!token) {
    throw new Error('토큰이 없습니다. 로그인을 확인하세요.');
  }

  // 공통적으로 Authorization 헤더 추가
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    ...options,
    headers, // 헤더를 위에서 설정한 토큰 포함 헤더로 덮어씀
  });

  if (!response.ok) {
    throw new Error(`요청에 실패했습니다: ${response.status}`);
  }

  return response;
}

/**
 * GET 요청을 처리하는 함수
 * @param {string} url - 요청할 URL
 * @returns {Promise<any>} 서버로부터의 응답 데이터를 포함한 Promise
 * @throws {Error} - 요청 실패 시 에러 발생
 */
export async function getRequest(url: string): Promise<any> {
  const response = await fetchWithToken(url, {
    method: 'GET',
  });

  const result = await response.json();
  return result;
}

/**
 * POST 요청을 처리하는 함수
 * @param {string} url - 요청할 URL
 * @param {any} body - 요청 본문 데이터
 * @returns {Promise<any>} 서버로부터의 응답 데이터를 포함한 Promise
 * @throws {Error} - 요청 실패 시 에러 발생
 */
export async function postRequest(url: string, body: any): Promise<any> {
  const response = await fetchWithToken(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  return result;
}

/**
 * PATCH 요청을 처리하는 함수
 * @param {string} url - 요청할 URL
 * @param {any} body - 요청 본문 데이터
 * @returns {Promise<any>} 서버로부터의 응답 데이터를 포함한 Promise
 * @throws {Error} - 요청 실패 시 에러 발생
 */
export async function patchRequest(url: string, body: any): Promise<any> {
  const response = await fetchWithToken(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  return result;
}

/**
 * PUT 요청을 처리하는 함수
 * @param {string} url - 요청할 URL
 * @param {any} body - 요청 본문 데이터
 * @returns {Promise<any>} 서버로부터의 응답 데이터를 포함한 Promise
 * @throws {Error} - 요청 실패 시 에러 발생
 */
export async function putRequest(url: string, body: any): Promise<any> {
  const response = await fetchWithToken(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  return result;
}

/**
 * DELETE 요청을 처리하는 함수
 * @param {string} url - 요청할 URL
 * @returns {Promise<any>} 서버로부터의 응답 데이터를 포함한 Promise
 * @throws {Error} - 요청 실패 시 에러 발생
 */
export async function deleteRequest(url: string): Promise<any> {
  const response = await fetchWithToken(url, {
    method: 'DELETE',
  });

  const result = await response.json();
  return result;
}
