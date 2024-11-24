import { postRequest } from '@/api/Request';
import config from '@/config/config';
import { LogoutResponse } from '@/interface/AuthInterface';
import { useAuthStore } from '@/store/AuthStore';

/**
 * 주어진 이메일(username)과 비밀번호(password)를 이용하여
 * 서버에 로그인 요청을 보내는 함수
 * 요청 성공 시, 서버에서 쿠키를 포함한 응답을 받음
 *
 * @param {string} username - 사용자의 이메일 또는 사용자명
 * @param {string} password - 사용자의 비밀번호
 * @returns {Promise<Response>} 서버 응답을 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러를 발생
 */
export async function login(
  username: string,
  password: string
): Promise<Response> {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  const response = await fetch(`${config.baseUrl}/user/login`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (response.ok) {
    useAuthStore.getState().setIsAuthenticated(true);
  }

  return response;
}

/**
 * 사용자 로그아웃 요청을 서버에 보내는 함수.
 * 이 함수는 쿠키에서 accessToken과 refreshToken을 추출하여
 * 해당 토큰들을 포함한 로그아웃 요청을 서버로 보냄
 *
 * // 2024-11-13 쿠키 사용 제거
 *
 * @returns {Promise<LogoutResponse>} 서버의 응답 데이터가 담긴 Promise 객체
 * @throws {Error} 토큰이 없거나 요청이 실패할 경우 에러를 발생
 */
export async function userLogout(): Promise<LogoutResponse> {
  try {
    const result = await postRequest(`${config.baseUrl}/user/logout`, {});

    if (result.success) {
      localStorage.clear();
      sessionStorage.clear();
      useAuthStore.getState().setIsAuthenticated(false);
    }

    return result;
  } catch (error: any) {
    throw new Error(`로그아웃 처리 중 오류 발생: ${error.message}`);
  }
}
