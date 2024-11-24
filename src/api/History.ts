import {
  ApiResponse,
  HistoryDetailResponse,
} from '@/interface/HistoryInterface';
import { getRequest } from './Request';
import config from '@/config/config';

/**
 * 사용자의 History 조회하는 API
 * @returns {Promise<ApiResponse>} 서버로부터의 응답 데이터를 포함한 Promise
 */
export async function fetchHistory(): Promise<ApiResponse> {
  const result: ApiResponse = await getRequest(`${config.baseUrl}/history`);
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
    `${config.baseUrl}/history/detail?matchingId=${matchingId}`
  );
  if (result.success) {
    console.log('성공했습니다.', result.status);
    return result;
  } else {
    throw new Error(result.message);
  }
}
