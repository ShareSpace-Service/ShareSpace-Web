// 인증 관련 응답 인터페이스
export interface AuthResponse {
  success: boolean;
  status: string;
  message: string;
  data: null;
}

// 로그아웃 응답 인터페이스
export interface LogoutResponse extends AuthResponse {
  data: null;
} 