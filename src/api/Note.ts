import {
  ApiNoteDetailResponse,
  ApiNoteReceiverResponse,
  ApiNoteResponse,
  NoteIsReadRequestResult,
  NoteSendRequest,
  UnreadNoteCountResponse,
} from '@/interface/NoteInterface';
import { fetchWithToken, getRequest } from './Request';
import config from '@/config/config';

/**
 * 노트 리스트를 불러오는 함수
 * @returns {Promise<ApiNoteResponse>} 노트 리스트를 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchNoteList() {
  const result: ApiNoteResponse = await getRequest(`${config.baseUrl}/note`);
  if (result.success) {
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}

/**
 * 노트 디테일을 불러오는 함수
 * @param {number} noteId - 노트 ID
 * @returns {Promise<ApiNoteDetailResponse>} 노트 디테일을 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchNoteDetail(noteId: number) {
  const result: ApiNoteDetailResponse = await getRequest(
    `${config.baseUrl}/note/noteDetail?noteId=${noteId}`
  );
  if (result.success) {
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}

/**
 * 노트 삭제를 요청하는 함수
 * @param {number} noteId - 노트 ID
 * @returns {Promise<ApiResponse>} 노트 삭제 요청 결과를 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchNoteDelete(noteId: number) {
  const response = await fetchWithToken(
    `${config.baseUrl}/note?noteId=${noteId}`,
    {
      method: 'DELETE',
      body: JSON.stringify({ noteId }),
    }
  );
  const result = await response.json();
  if (response.ok && result.success) {
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}

/**
 * 노트 수신자 목록을 불러오는 함수
 * @returns {Promise<ApiNoteReceiverResponse>} 노트 수신자 목록을 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchNoteReceiver() {
  const result: ApiNoteReceiverResponse = await getRequest(
    `${config.baseUrl}/note/available`
  );
  if (result.success) {
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}

export async function fetchNoteSend(
  noteData: NoteSendRequest
): Promise<NoteSendRequest> {
  const response = await fetchWithToken(`${config.baseUrl}/note`, {
    method: 'POST',
    body: JSON.stringify(noteData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  if (response.ok && result.success) {
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}

/**
 * 쪽지를 읽었을 경우(쪽지를 클릭하여 디테일 모달을 열었을 경우) 쪽지 읽음 처리 요청 함수
 * 받은 쪽지 전체 리스트 중에서 read를 비교하여 false일 경우 true로 변경하며,
 * 기존에 읽은 쪽지의 경우 API 호출을 하지 않음
 *
 * @param noteId 쪽지 고유 ID 값
 * @returns {Promise<NoteIsReadRequestResult>} 쪽지 읽음 처리 성공 여부
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchNoteIsReadRequest(noteId: number) {
  const response = await fetchWithToken(
    `${config.baseUrl}/note/${noteId}/read`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const result: NoteIsReadRequestResult = await response.json();
  if (response.ok && result.success) {
    return result;
  } else {
    throw new Error(result.message || '요청 실패');
  }
}

/**
 * 읽지 않은 쪽지 개수를 조회하는 함수
 * @returns {Promise<UnreadNoteCountResponse>} 읽지 않은 쪽지 개수 응답을 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchUnreadNoteCount() {
  const result: UnreadNoteCountResponse = await getRequest(
    `${config.baseUrl}/note/unreadNote`
  );
  if (result.success) {
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}
