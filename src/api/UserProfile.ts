import { fetchWithToken, getRequest } from './Request';
import { UserData } from '@/components/ui/alarmbox';
import { AddressResponse } from '@/component/ui/Address';
import { ApiResponse, ApiUpdateResponse } from '@/interface/MyPageInterface';

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

/**
 * 서버로부터 사용자 ID 정보를 가져오는 함수.
 * 이 함수는 지정된 API 엔드포인트로 GET 요청을 보내어 사용자 데이터를 반환
 * 요청이 성공하면 사용자 데이터(UserData)를 반환하고, 실패 시 에러를 발생
 *
 * @returns {Promise<UserData>} 사용자 데이터가 담긴 Promise 객체
 * @throws {Error} 요청이 실패하거나 서버에서 오류 메시지를 반환한 경우 에러 발생
 */
export async function fetchUserId(): Promise<UserData> {
  const result = await getRequest(`http://localhost:8080/user/userId`);
  if (result.success) {
    console.log('성공', result.message);
    return result.data;
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
  const result = await getRequest('http://localhost:8080/user/place');
  if (result.success) {
    console.log('성공', result.message);
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}
