// API 요청 타입
export interface EmailValidationRequest {
  userId: number;
  validationNumber: number;
}

// 이메일 응답 타입 정의
export interface EmailResponse {
  message: string;
  status: string;
  data: {
    email: string;
  };
  success: boolean;
}
