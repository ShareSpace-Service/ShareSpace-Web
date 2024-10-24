import { getRequest } from './Request';
import { ApiResponse, MatchingData } from '@/pages/Product';
/**
 * 서버에서 Matching에 연결된 Product 데이터를 GET 요청으로 불러오는 함수
 *
 * @returns {Promise<any>} 서버로부터 Prouduct 리스트 데이터를 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchMatchingProducts(): Promise<MatchingData[]> {
  try {
    const result: ApiResponse = await getRequest(
      'http://localhost:8080/matching'
    );
    console.log('Fetch result:', result);
    return result.data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Failed to fetch matching products');
  }
}
