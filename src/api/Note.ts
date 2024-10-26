import {
  ApiNoteDetailResponse,
  ApiNoteResponse,
} from '@/interface/NoteInterface';
import { getRequest } from './Request';

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
