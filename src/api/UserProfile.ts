import { fetchWithToken, getRequest } from './Request';
import { AddressResponse } from '@/component/ui/Address';
import config from '@/config/config';
import { ApiResponse, ApiUpdateResponse } from '@/interface/MyPageInterface';

/**
 *
 * @param formData  - 프로필 업데이트 요청
 * @returns  - 프로필 업데이트 응답
 */

export async function fetchProfileUpdate(
  formData: FormData
): Promise<ApiUpdateResponse> {
  const response = await fetchWithToken(`${config.baseUrl}/user/update`, {
    method: 'PUT',
    body: formData,
  });
  const result: ApiUpdateResponse = await response.json();
  if (response.ok && result.success) {
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

export async function fetchProfile(): Promise<ApiResponse> {
  const result: ApiResponse = await getRequest(`${config.baseUrl}/user/detail`);
  if (result.success) {
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}
/**
 * 사용자의 주소 정보를 가져오는 함수
 * @returns {Promise<AddressResponse>} 주소 정보를 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchUserAddress(): Promise<AddressResponse> {
  const result = await getRequest(`${config.baseUrl}/user/place`);
  if (result.success) {
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}
