import {
  ApiNoteDetailResponse,
  ApiNoteResponse,
} from '@/interface/NoteInterface';
import { fetchWithToken, getRequest } from './Request';

/**
 * 노트 리스트를 불러오는 함수
 * @returns {Promise<ApiNoteResponse>} 노트 리스트를 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러 발생
 */
export async function fetchNoteList() {
  const result: ApiNoteResponse = await getRequest(
    'http://localhost:8080/note'
  );
  if (result.success) {
    console.log('성공', result.message);
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
    `http://localhost:8080/note/noteDetail?noteId=${noteId}`
  );
  if (result.success) {
    console.log('쪽지 디테일 불러오기 성공', result.message);
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}

export async function fetchNoteDelete(noteId: number) {
  const response = await fetchWithToken(
    `http://localhost:8080/note?noteId=${noteId}`,
    {
      method: 'DELETE',
      body: JSON.stringify({ noteId }),
    }
  );
  const result = await response.json();
  if (response.ok && result.success) {
    console.log('삭제 성공', result.message);
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}
