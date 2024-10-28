import { ApiResponse, Place } from '@/interface/PlaceInterface';
import { getRequest } from './Request';

// API 요청 함수 추후에 API 디렉토리로 이동 예정
export async function fetchPlaceList(productId: number): Promise<Place[]> {
  try {
    const result: ApiResponse = await getRequest(
      `http://localhost:8080/place/searchByProduct?productId=${productId}`
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
