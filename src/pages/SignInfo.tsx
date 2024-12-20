import SignUpForm from '@/component/form/SignUpForm';
import LoginTitle from '@/component/text/LoginTitle';
import ButtonProps from '@/component/ui/ButtonProps';
import HeaderBack from '@/layout/HeaderBack';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { registerUser } from '@/api/RegisterUser';
import CustomModal from '@/component/ui/CustomModal';

export interface SignUpFormData {
  email: string;
  password: string;
  passwordValidate: string;
  nickname: string;
  location: string;
}

// API 요청 데이터 인터페이스
export interface RegisterUserRequest extends SignUpFormData {
  role: string;
}

// API 응답 데이터 인터페이스
export interface RegisterUserResponse {
  message: string;
  status: string;
  data: {
    userId: number;
  };
  success: boolean;
}

/**
 * 회원 정보 입력 페이지 컴포넌트
 *
 * @returns {JSX.Element} 회원 정보 입력 페이지 JSX 컴포넌트
 */
function SignInfo() {
  const { state } = useLocation();
  const [role] = useState(state.roleStatus); // 기본값 설정

  const formRef = useRef<SignUpFormData>({
    email: '',
    password: '',
    passwordValidate: '',
    nickname: '',
    location: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(''); // 모달에 표시할 오류 메시지

  const navigate = useNavigate();

  if (!state.roleStatus) {
    navigate('/signup');
    return null;
  }

  /**
   * 비밀번호 유효성 검사 함수
   *
   * @param {string} password - 검사할 비밀번호 문자열
   * @returns {boolean} 비밀번호가 유효한지 여부를 반환
   */
  const isPasswordValid = (password: string) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return regex.test(password);
  };

  // 이메일 유효성 검사 함수 추가
  const isEmailValid = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleFormChange = (name: keyof SignUpFormData, value: string) => {
    formRef.current = {
      ...formRef.current,
      [name]: value,
    };
  };

  /**
   * 'Next' 버튼 클릭 시 호출되는 함수
   * 유효성 검사 실패 시 모달로 오류 메시지 출력, 성공 시 회원가입 API 호출 후 이메일 인증 페이지로 이동
   */
  const handleNextClick = async () => {
    const { email, password, passwordValidate, nickname, location } =
      formRef.current;
    if (!email || !password || !passwordValidate || !nickname || !location) {
      setModalMessage('필수 입력 항목을 확인해주세요.');
      setShowModal(true);
      return;
    }

    if (!isPasswordValid(password)) {
      setModalMessage(
        '비밀번호는 문자, 숫자, 특수문자를 포함한 8-20자로 설정해야 합니다.'
      );
      setShowModal(true);
      return;
    }

    if (password !== passwordValidate) {
      setModalMessage('비밀번호가 일치하지 않습니다.');
      setShowModal(true);
      return;
    }

    if (nickname.length > 50 || nickname.length < 2) {
      setModalMessage('닉네임은 2자 이상 50자 이내로 작성해주세요.');
      setShowModal(true);
      return;
    }

    try {
      const userData: RegisterUserRequest = {
        email,
        role,
        password,
        passwordValidate,
        location,
        nickname,
      };
      const response: RegisterUserResponse = await registerUser(userData);
      const userId = response.data.userId;
      navigate('/emailverify', { state: { userId, role } });
    } catch (err: any) {
      setModalMessage(err.MESSAGE || '알 수 없는 오류가 발생했습니다.');
      setShowModal(true);
    }
  };

  /**
   * 모달 닫기 함수
   */
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <HeaderBack />
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 max-w-2xl">
          <LoginTitle
            title="회원 정보 입력"
            subTitle="회원 가입에 필요한 정보를 입력해주세요"
          />
          <SignUpForm
            formData={formRef.current}
            onFormChange={handleFormChange}
            isPasswordValid={isPasswordValid}
            isEmailValid={isEmailValid}
          />
          <div className="flex justify-center my-8">
            <ButtonProps
              size="login"
              variant="custom"
              title="Next"
              onClick={handleNextClick}
            />
          </div>
        </div>
      </div>
      {showModal && (
        <CustomModal
          title="회원가입 오류"
          description={modalMessage}
          confirmText="확인"
          onConfirm={handleCloseModal}
        />
      )}
    </div>
  );
}

export default SignInfo;
