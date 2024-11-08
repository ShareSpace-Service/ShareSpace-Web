import {
  ApiKeepModalResponse,
  ApiRequestModalResponse,
  Matching,
  MatchingApiResponse,
  MatchingData,
  MatchingPlaceResponse,
  MatchingRequestResult,
} from '@/interface/MatchingInterface';
import { fetchWithToken, getRequest } from './Request';

/**
 * 서버에서 Matching에 연결된 Product 데이터를 GET 요청으로 불러오는 함수
 *
 * @returns {Promise<MatchingData[]>} 서버로부터 Prouduct 리스트 데이터를 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchMatchingProducts(): Promise<Matching> {
  try {
    const result: MatchingApiResponse = await getRequest(
      'http://localhost:8080/matching'
    );
    console.log('Fetch result:', result);

    // result.data가 존재하는지 확인하고 products가 배열인지 확인
    if (result.data && Array.isArray(result.data.products)) {
      // 조건에 맞으면 return
      return result.data;
    } else {
      // 예상 못하면 에러 발생
      console.error('Unexpected response format:', result);
      throw new Error('Invalid response format');
    }
  } catch (error) {
    // 네트워크나 서버 문제로 인한 에러 발생
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
  placeId,
  matchingId,
}: {
  placeId: number;
  matchingId: number;
}): Promise<MatchingRequestResult> {
  const response = await fetchWithToken('http://localhost:8080/matching/keep', {
    method: 'PUT',
    body: JSON.stringify({ placeId, matchingId }),
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
    if (result.data && Array.isArray(result.data.products)) {
      return result.data.products;
    } else {
      console.error('예상치 못한 응답 형식:', result);
      throw new Error('잘못된 응답 형식');
    }
  } catch (error) {
    console.error(':', error);
    throw new Error('Failed to fetch matching products');
  }
}

/**
 * RequestModal 디테일 데이터를 불러오는 함수
 * @param {number} matchingId - 매칭 ID
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchRequestModal({
  matchingId,
}: {
  matchingId: number;
}) {
  const result: ApiRequestModalResponse = await getRequest(
    `http://localhost:8080/matching/requestDetail?matchingId=${matchingId}`
  );
  if (result.success) {
    console.log('Request Detail 요청 성공', result.message);
    return result.data;
  } else {
    throw new Error(result.message || '요청 실패');
  }
}

/**
 * KeepModal, Waiting 디테일 데이터를 불러오는 함수
 * @param {number} matchingId - 매칭 ID
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 * @returns {Promise<ApiKeepModalResponse>} KeepModal, Waiting 디테일 데이터를 반환하는 Promise
 */
export async function fetchKeepModal({ matchingId }: { matchingId: number }) {
  const result: ApiKeepModalResponse = await getRequest(
    `http://localhost:8080/matching/keepDetail?matchingId=${matchingId}`
  );
  if (result.success) {
    console.log('Keep, Waiting 요청 성공', result.message);
    return result.data;
  } else {
    throw new Error(result.message || '요청 실패');
  }
}

/**
 * 물품 보관 요청 수락 API
 * @param {number} matchingId - 매칭 ID
 * @returns {Promise<MatchingRequestResult>} 물품 보관 요청 수락 결과를 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchKeepAccept({ matchingId }: { matchingId: number }) {
  const response = await fetchWithToken(
    'http://localhost:8080/matching/confirmStorage/guest',
    {
      method: 'PATCH',
      body: JSON.stringify({ matchingId }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    throw new Error('서버 상태가 불안합니다!' + response.status);
  }
  const result: MatchingRequestResult = await response.json();
  if (response.ok && result.success) {
    console.log('성공', result.message);
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}

/**
 * 물품 보관 요청 취소 API
 * @param {number} matchingId - 매칭 ID
 * @returns {Promise<MatchingRequestResult>} 물품 보관 요청 취소 결과를 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchCancelRequest({
  matchingId,
}: {
  matchingId: number;
}) {
  const response = await fetchWithToken(
    `http://localhost:8080/matching/cancelRequest?matchingId=${matchingId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    throw new Error('서버 상태가 불안합니다!' + response.status);
  }
  const result: MatchingRequestResult = await response.json();
  if (response.ok && result.success) {
    console.log('취소 성공', result.message);
    return result;
  } else {
    throw new Error(result.message || '취소 실패');
  }
}

/**
 * 내 물품 현황 조회 (특정 장소 조회시)
 * @param {number} placeId - 장소 ID
 * @returns {Promise<MatchingPlaceResponse>} 내 물품 현황 조회 결과를 반환하는 Promise
 */
export async function fetchMatchingPlace({
  placeId,
}: {
  placeId: number;
}): Promise<MatchingPlaceResponse> {
  const result: MatchingPlaceResponse = await getRequest(
    `http://localhost:8080/matching/by-place?placeId=${placeId}`
  );
  if (result.success) {
    console.log(result.message);
    return result;
  } else {
    console.log(result.status);
    throw new Error(result.message);
  }
}

/**
 * 물품 보관 요청(미배정 상태로 남겨진 물품을 요청) API
 * @param {number} matchingId - 매칭 ID
 * @returns {Promise<MatchingRequestResult>} 물품 보관 요청 결과를 반환하는 Promise
 */
export async function fetchKeepRequest({
  placeId,
  matchingId,
}: {
  placeId: number;
  matchingId: number;
}): Promise<MatchingRequestResult> {
  const response = await fetchWithToken(
    `http://localhost:8080/matching/${matchingId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ placeId }),
    }
  );
  if (!response.ok) {
    throw new Error('서버 상태 :' + response.status);
  }
  const result: MatchingRequestResult = await response.json();
  if (response.ok && result.success) {
    console.log('성공', result.message);
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}

/**
 *  HOST가 물품 보관 요청 수락/거절
 * @param {number} matchingId - 매칭 ID
 * @param {boolean} isAccepted - 수락 여부
 * @returns {Promise<MatchingRequestResult>} 물품 보관 요청 수락/거절 결과를 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchMatchingAccept({
  matchingId,
  isAccepted,
}: {
  matchingId: number;
  isAccepted: boolean;
}): Promise<MatchingRequestResult> {
  const response = await fetchWithToken(
    'http://localhost:8080/matching/acceptRequest/host',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matchingId, isAccepted }),
    }
  );
  if (!response.ok) {
    throw new Error('서버 상태 :' + response.status);
  }
  const result: MatchingRequestResult = await response.json();
  if (result.success && response.ok) {
    console.log('성공', result.message);
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}

/**
 * HOST가 물품 보관 대기중일 때 이미지 업로드
 * @param {number} matchingId - 매칭 ID
 * @param {string} imageUrl - 이미지 URL
 * @returns {Promise<MatchingRequestResult>} 이미지 업로드 결과를 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchMatchingUploadImage({
  matchingId,
  imageUrl,
}: {
  matchingId: number;
  imageUrl: string;
}): Promise<MatchingRequestResult> {
  const response = await fetchWithToken(
    'http://localhost:8080/matching/uploadImage/host',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matchingId, imageUrl }),
    }
  );
  if (!response.ok) {
    throw new Error('서버 상태 :' + response.status);
  }
  const result: MatchingRequestResult = await response.json();
  if (result.success && response.ok) {
    console.log('성공', result.message);
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}
