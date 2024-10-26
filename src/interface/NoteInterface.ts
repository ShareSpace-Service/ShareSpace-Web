// 쪽지 조회
export interface Note {
  noteId: number;
  title: string;
  content: string;
  sender: string;
}
// 쪽지 조회 응답
export interface ApiNoteResponse {
  message: string;
  status: string;
  data: Note[];
  success: boolean;
}

export interface NoteDetail {
  noteId: number;
  title: string;
  content: string;
  sender: string;
  senderTime: string;
}

export interface ApiNoteDetailResponse {
  message: string;
  status: string;
  data: NoteDetail;
  success: boolean;
}

export interface ApiNoteDeleteResponse {
  status: string;
  message: string;
}
