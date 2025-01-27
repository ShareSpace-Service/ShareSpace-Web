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

/**
 * 회원가입 폼 데이터 인터페이스
 * @property email - 사용자 이메일
 * @property password - 비밀번호 (8-20자, 문자/숫자/특수문자 포함)
 * @property passwordValidate - 비밀번호 확인
 * @property nickname - 사용자 닉네임 (2-50자)
 * @property location - 사용자 지역
 */
export interface SignUpFormData {
  email: string;
  password: string;
  passwordValidate: string;
  nickname: string;
  location: string;
}

/**
 * 회원가입 API 요청 데이터 인터페이스
 * SignUpFormData를 확장하여 role 정보 포함
 * @extends SignUpFormData
 * @property role - 사용자 역할 ('ROLE_HELPER' | 'ROLE_USER')
 */
export interface RegisterUserRequest extends SignUpFormData {
  role: string;
}

/**
 * 회원가입 API 응답 데이터 인터페이스
 * @property message - 응답 메시지
 * @property status - 응답 상태
 * @property data.userId - 생성된 사용자 ID
 * @property success - 요청 성공 여부
 */
export interface RegisterUserResponse {
  message: string;
  status: string;
  data: {
    userId: number;
  };
  success: boolean;
}
