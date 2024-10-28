import SignUpForm from '@/component/form/SignUpForm';
import LoginTitle from '@/component/text/LoginTitle';
import ButtonProps from '@/component/ui/ButtonProps';
import HeaderBack from '@/layout/HeaderBack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@/api/RegisterUser';
import CustomModal from '@/component/ui/CustomModal';

/**
 * 회원 정보 입력 페이지 컴포넌트
 *
 * @returns {JSX.Element} 회원 정보 입력 페이지 JSX 컴포넌트
 */
function SignInfo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValidate, setPasswordValidate] = useState('');
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('ROLE_GUEST'); // 기본값 설정

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(''); // 모달에 표시할 오류 메시지

  const navigate = useNavigate();

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

   /**
   * 'Next' 버튼 클릭 시 호출되는 함수
   * 유효성 검사 실패 시 모달로 오류 메시지 출력, 성공 시 회원가입 API 호출 후 이메일 인증 페이지로 이동
   */
  const handleNextClick = async () => {
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

    try {
      const userData = {
        email,
        role,
        password,
        passwordValidate,
        location,
        nickname,
      };
      const response = await registerUser(userData);
      const userId = response.data.userId;
      navigate('/emailverify', { state: { userId } });
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
    <div className="h-full flex flex-col">
      <HeaderBack />
      <LoginTitle
        title="회원 정보 입력"
        subTitle="회원 가입에 필요한 정보를 입력해주세요"
      />
      <SignUpForm
        setEmail={setEmail}
        setPassword={setPassword}
        setPasswordValidate={setPasswordValidate}
        setNickname={setNickname}
        setLocation={setLocation}
        password={password}
        passwordValidate={passwordValidate}
        isPasswordValid={isPasswordValid}
      />
      <div className="pt-8 flex justify-center">
        <ButtonProps
          size="login"
          variant="custom"
          title="Next"
          onClick={handleNextClick}
        />
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
