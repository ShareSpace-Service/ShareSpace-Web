import { ApiResponse, ApiUpdateResponse } from '@/component/card/MyPageCard';
import { getRequest, putRequest } from './Request';

/**
 *
 * @param formData  - 프로필 업데이트 요청
 * @returns  - 프로필 업데이트 응답
 */

export async function fetchProfileUpdate(
  formData: FormData
): Promise<ApiUpdateResponse> {
  const response = await putRequest('http://localhost:8080/user/update', {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('서버 상태 !' + response.status);
  }
  const result: ApiUpdateResponse = await response.json();
  if (response.ok && result.success) {
    console.log('성공', result.message);
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}

/**
 * 프로필 정보를 불러오는 함수
 * @returns {Promise<ApiResponse>} 프로필 정보를 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */

export async function fetchProfile() {
  const response = await getRequest(`http://localhost:8080/user/detail`);
  if (!response.ok) {
    throw new Error('서버 상태가 그냥 미누그앗!' + response.status);
  }
  const result: ApiResponse = await response.json();
  console.log('성공했습니다.', result);
  if (response.ok && result.success) {
    console.log('성공', result.message);
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}
