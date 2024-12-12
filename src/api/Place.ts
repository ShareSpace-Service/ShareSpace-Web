import {
  ApiDetailResponse,
  ApiEditResponse,
  ApiResponse,
  Place,
  PlaceData,
  PlaceEditData,
  PlaceEditForm,
  PlaceEditResponse,
} from '@/interface/PlaceInterface';
import { fetchWithToken, getRequest } from './Request';
import config from '@/config/config';
import { ApiUpdateResponse } from '@/interface/MyPageInterface';

/**
 * 서버에서 Place 데이터를 GET 요청으로 불러오는 함수
 *
 * @returns {Promise<Place[]>} 서버로부터 Place 리스트 데이터를 반환하는 Promise
 */
export async function fetchProductList() {
  const result: ApiResponse = await getRequest(`${config.baseUrl}/place`);
  if (result.success && result.data) {
    return result.data;
  } else {
    throw new Error(result.message);
  }
}

/**
 * 서버에서 Place 데이터를 GET 요청으로 불러오는 함수
 *
 * @returns {Promise<Place[]>} 서버로부터 Place 리스트 데이터를 반환하는 Promise
 */
export async function fetchPlaceList(matchingId: number): Promise<Place[]> {
  try {
    const result: ApiResponse = await getRequest(
      `${config.baseUrl}/place/searchByProduct?matchingId=${matchingId}`
    );
    if (result.success && result.data) {
      return result.data;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

/**
 * 서버에서 Place 디테일 데이터를 GET 요청으로 불러오는 함수
 *
 * @returns {Promise<PlaceData>} 서버로부터 Place 디테일 데이터를 반환하는 Promise
 */
export async function fetchPlaceDetailList({
  placeId,
}: {
  placeId: number;
}): Promise<PlaceData> {
  const result: ApiDetailResponse = await getRequest(
    `${config.baseUrl}/place/placeDetail?placeId=${placeId}`
  );
  if (result.success) {
    return result.data;
  } else {
    throw new Error(result.message || '실패');
  }
}

/**
 * HOST가 장소 수정 시 장소 정보를 불러오는 함수
 * @returns {Promise<PlaceData>} 장소 정보를 반환하는 Promise
 */
export async function fetchPlaceEdit(): Promise<PlaceEditData> {
  const result: ApiEditResponse = await getRequest(
    `${config.baseUrl}/place/edit`
  );
  if (result.success) {
    return result.data;
  } else {
    throw new Error(result.message || '실패');
  }
}

/**
 * HOST 장소 수정 시 장소 정보를 서버에 전송하는 함수
 *  @param formData - 장소 수정 정보
 *  @returns {Promise<PlaceEditForm>} 장소 수정 정보를 반환하는 Promise
 */
export async function fetchPlaceForm(
  formData: FormData
): Promise<PlaceEditForm> {
  const response = await fetchWithToken(`${config.baseUrl}/place`, {
    method: 'PUT',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('서버 상태 :' + response.status);
  }
  const result: PlaceEditResponse = await response.json();
  if (response.ok && result.success) {
    return result.data;
  } else {
    throw new Error(result.message || '장소 수정이 실패하였습니다.');
  }
}

/**
 * HOST 회원가입 시 장소 등록시 장소 정보를 서버에 전송하는 함수
 *
 */
export async function fetchPlaceRegister(
  formData: FormData
): Promise<ApiUpdateResponse> {
  const response = await fetch(`${config.baseUrl}/place/register`, {
    method: 'POST',
    body: formData,
  });
  const result: ApiUpdateResponse = await response.json();

  // 성공/실패 여부와 관계없이 result를 그대로 반환/throw
  if (!result.success) {
    throw result;
  }

  return result;
}
