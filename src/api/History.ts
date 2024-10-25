import {
  ApiResponse,
  HistoryDetailResponse,
} from '@/interface/HistoryInterface';
import { getRequest } from './Request';

export async function fetchHistory() {
  const result: ApiResponse = await getRequest('http://localhost:8080/history');
  if (result.success) {
    console.log('성공했습니다.', result.status);
    return result;
  } else {
    throw new Error(result.message);
  }
}

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
