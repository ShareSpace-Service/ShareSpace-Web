// 쪽지 조회
export interface Note {
  noteId: number;
  title: string;
  content: string;
  sender: string;
  read: boolean;
}
// 쪽지 조회 응답
export interface ApiNoteResponse {
  message: string;
  status: string;
  data: Note[];
  success: boolean;
}

// 쪽지 상세 조회
export interface NoteDetail {
  noteId: number;
  title: string;
  content: string;
  sender: string;
  senderTime: string;
}

// 쪽지 상세 조회 응답
export interface ApiNoteDetailResponse {
  message: string;
  status: string;
  data: NoteDetail;
  success: boolean;
}
// 쪽지 삭제 응답
export interface ApiNoteDeleteResponse {
  status: string;
  message: string;
}

// 쪽지 전송
export interface Receiver {
  receiverId: number;
  nickname: string;
}

// 쪽지 전송 응답
export interface ApiNoteReceiverResponse {
  message: string;
  status: string;
  data: Receiver[];
  success: boolean;
}

// 쪽지 전송 요청
export interface NoteSendRequest {
  receiverId: number;
  title: string;
  content: string;
}

// 쪽지 읽음 처리
export interface NoteIsReadRequestResult {
  success: boolean;
  status: string;
  data: null;
  message: string;
}

// 읽지 않은 쪽지 개수 응답
export interface UnreadNoteCountResponse {
  message: string;
  status: string;
  data: {
    unreadCount: number;
  };
  success: boolean;
}