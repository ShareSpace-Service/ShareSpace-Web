import {
  ApiResponse,
  HistoryDetailResponse,
} from '@/interface/HistoryInterface';
import { fetchWithToken, getRequest } from './Request';

/**
 * 사용자의 History 조회하는 API
 * @returns {Promise<ApiResponse>} 서버로부터의 응답 데이터를 포함한 Promise
 */
export async function fetchHistory(): Promise<ApiResponse> {
  const result: ApiResponse = await getRequest('http://localhost:8080/history');
  if (result.success) {
    console.log('성공했습니다.', result.status);
    return result;
  } else {
    throw new Error(result.message);
  }
}

/**
 * History 상세 조회하는 API
 * @param {number} matchingId - 매칭 ID
 * @returns {Promise<HistoryDetailResponse>} 서버로부터의 응답 데이터를 포함한 Promise
 */
export async function fetchDetailHistory({
  matchingId,
}: {
  matchingId: number;
}) {
  const result: HistoryDetailResponse = await getRequest(
    `http://localhost:8080/history/detail?matchingId=${matchingId}`
  );
  if (result.success) {
    console.log('성공했습니다.', result.status);
    return result;
  } else {
    throw new Error(result.message);
  }
}

/**
 * History 완료 처리하는 API
 * @param {number} matchingId - 매칭 ID
 * @returns {Promise<any>} 서버로부터의 응답 데이터를 포함한 Promise
 */
export async function fetchHistoryComplete({
  matchingId,
}: {
  matchingId: number;
}) {
  const response = await fetchWithToken(
    'http://localhost:8080/matching/completeStorage',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matchingId }),
    }
  );
  const result = await response.json();
  if (response.ok && result.success) {
    console.log('history 완료 버튼 클릭 완료', result.message);
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}
