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

// 문의하기 모달창 닫기
export interface QuestionFormProps {
  title?: string | null;
  setView: (view: React.ReactNode | null) => void;
}
