import {
  MatchingApiResponse,
  MatchingData,
  MatchingRequestResult,
} from '@/interface/MatchingInterface';
import { fetchWithToken, getRequest } from './Request';

/**
 * 서버에서 Matching에 연결된 Product 데이터를 GET 요청으로 불러오는 함수
 *
 * @returns {Promise<MatchingData[]>} 서버로부터 Prouduct 리스트 데이터를 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchMatchingProducts(): Promise<MatchingData[]> {
  try {
    const result: MatchingApiResponse = await getRequest(
      'http://localhost:8080/matching'
    );
    console.log('Fetch result:', result);
    return result.data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Failed to fetch matching products');
  }
}

/**
 *  서버에 대여 요청을 보내는 함수입니다.
 * @param {number} productId - 대여 요청할 상품 ID
 * @param {number} placeId - 대여 요청할 장소 ID
 * @param {number} matchingId - 대여 요청할 매칭 ID
 * @returns {Promise<MatchingRequestResult>} 대여 요청 결과를 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchMatchingRentalRequest({
  productId,
  placeId,
  matchingId,
}: {
  productId: number;
  placeId: number;
  matchingId: number;
}): Promise<MatchingRequestResult> {
  const response = await fetchWithToken('http://localhost:8080/matching/keep', {
    method: 'PUT',
    body: JSON.stringify({ productId, placeId, matchingId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result: MatchingRequestResult = await response.json();
  if (response.ok && result.success) {
    console.log('요청 성공', result.message);
    return result;
  } else {
    throw new Error(result.message || '요청 실패');
  }
}

/**
 * 서버에서 필터링된 Matching 데이터를 GET 요청으로 불러오는 함수
 * @param {string} status - 필터링할 상태
 * @returns {Promise<MatchingData[]>} 서버로부터 필터링된 Matching 리스트 데이터를 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 *
 */
export async function fetchFilterMatchingProducts(
  status: string
): Promise<MatchingData[]> {
  try {
    const result: MatchingApiResponse = await getRequest(
      `http://localhost:8080/matching?status=${status}`
    );
    console.log('필터링되고 있습니다.:', result);
    return result.data;
  } catch (error) {
    console.error(':', error);
    throw new Error('Failed to fetch matching products');
  }
}
