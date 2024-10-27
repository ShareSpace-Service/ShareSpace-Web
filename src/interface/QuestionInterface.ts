// 호소하기 등록
export interface QuestionPost {
  title: string;
  content: string;
}

// 호소하기 Response
export interface QuestionResponse {
  message: string;
  status: string;
  data: null;
  success: boolean;
}
