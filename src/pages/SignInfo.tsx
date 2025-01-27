import SignUpForm from '@/component/form/SignUpForm';
import LoginTitle from '@/component/text/LoginTitle';
import ButtonProps from '@/component/ui/ButtonProps';
import HeaderBack from '@/layout/HeaderBack';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomModal from '@/component/ui/CustomModal';
import { useRegister } from '@/action/post-registerUser';
import {
  validateEmail,
  validateForm,
  validatePassword,
} from '@/utils/registerValidation';
import { SignUpFormData } from '@/interface/AuthInterface';

function SignInfo() {
  const { state } = useLocation();

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

  // roleStatus가 없으면 리다이렉트
  if (!state.roleStatus) {
    navigate('/signup');
    return null;
  }

  // useRegister에 직접 state.roleStatus 전달
  const { mutate: register } = useRegister({
    role: state.roleStatus,
    onError: (message) => {
      setModalMessage(message);
      setShowModal(true);
    },
  });

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
    const { isValid, message } = validateForm(formRef.current);

    if (!isValid) {
      setModalMessage(message);
      setShowModal(true);
      return;
    }

    register(formRef.current);
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
            isPasswordValid={validatePassword}
            isEmailValid={validateEmail}
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
