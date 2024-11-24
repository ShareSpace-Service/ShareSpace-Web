import TokenRefreshManager from '@/lib/TokenManager';
import config from '@/config/config';


export async function fetchWithToken(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = {
    ...options.headers,
  };

  const isHttps = config.env === 'release';
  const credentials: RequestCredentials = isHttps ? 'include' : 'include';
  
  let response = await fetch(url, {
    ...options,
    headers,
    credentials,
  });

  if (response.status === 401 && !url.includes('/user/logout')) {
    const isRefreshSuccess = await TokenRefreshManager.refreshToken();

    if (isRefreshSuccess) {
      response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include',
      });
    } else {
      alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      window.location.href = '/login';
      throw new Error('인증 실패');
    }
  }

  if (!response.ok && !url.includes('/user/logout')) {
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

  return await response.json();
}

/**
 * POST 요청을 처리하는 함수
 * @param {string} url - 요청할 URL
 * @param {any} body - 요청 본문 데이터
 * @returns {Promise<any>} 서버로부터의 응답 데이터를 포함한 Promise
 * @throws {Error} - 요청 실패 시 에�� 발생
 */
export async function postRequest(url: string, body: any): Promise<any> {
  const response = await fetchWithToken(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return await response.json();
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

  return await response.json();
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

  return await response.json();
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

  return await response.json();
}
