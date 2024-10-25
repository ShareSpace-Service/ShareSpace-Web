import { ApiResponse, ApiUpdateResponse } from '@/component/card/MyPageCard';
import { fetchWithToken, getRequest, putRequest } from './Request';

/**
 *
 * @param formData  - 프로필 업데이트 요청
 * @returns  - 프로필 업데이트 응답
 */

export async function fetchProfileUpdate(
  formData: FormData
): Promise<ApiUpdateResponse> {
  const response = await fetchWithToken('http://localhost:8080/user/update', {
    method: 'PUT',
    body: formData,
  });
  const result: ApiUpdateResponse = await response.json();
  if (response.ok && result.success) {
    console.log('성공', result.message);
    return result;
  } else {
    console.log('tlqkf', result.status);
    throw new Error(result.message || '실패');
  }
}

/**
 * 프로필 정보를 불러오는 함수
 * @returns {Promise<ApiResponse>} 프로필 정보를 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */

export async function fetchProfile(): Promise<ApiResponse> {
  const result: ApiResponse = await getRequest(
    `http://localhost:8080/user/detail`
  );
  if (result.success) {
    console.log('성공', result.message);
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}
