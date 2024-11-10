import {
  ApiDetailResponse,
  ApiEditResponse,
  ApiResponse,
  Place,
  PlaceData,
  PlaceEditData,
} from '@/interface/PlaceInterface';
import { getRequest } from './Request';

/**
 * 서버에서 Place 데이터를 GET 요청으로 불러오는 함수
 *
 * @returns {Promise<Place[]>} 서버로부터 Place 리스트 데이터를 반환하는 Promise
 */
export async function fetchProductList() {
  const result: ApiResponse = await getRequest('http://localhost:8080/place');
  if (result.success && result.data) {
    console.log('요청 성공', result.message);
    return result.data;
  } else {
    console.error('API 요청 실패', result);
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
      `http://localhost:8080/place/searchByProduct?matchingId=${matchingId}`
    );
    if (result.success && result.data) {
      return result.data;
    } else {
      console.error('API 요청 실패', result);
      return [];
    }
  } catch (error) {
    console.log('error fetch', error);
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
    `http://localhost:8080/place/placeDetail?placeId=${placeId}`
  );
  if (result.success) {
    console.log('성공', result.message);
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
    'http://localhost:8080/place/edit'
  );
  if (result.success) {
    console.log('성공', result.message);
    return result.data;
  } else {
    throw new Error(result.message || '실패');
  }
}
