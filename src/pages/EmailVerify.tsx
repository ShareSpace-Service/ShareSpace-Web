import LoginTitle from '@/component/text/LoginTitle';
import ButtonProps from '@/component/ui/ButtonProps';
import HeaderBack from '@/layout/HeaderBack';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CustomModal from '@/component/ui/CustomModal';
import { EmailBox } from '@/component/email/EmailVerifyBox';

/**
 * 이메일 인증 완료 페이지 컴포넌트
 *
 * @returns {JSX.Element} 이메일 인증 완료 페이지 JSX 컴포넌트
 */
function EmailVerify() {
  const location = useLocation();
  const { userId, role } = location.state; // 회원가입 페이지에서 넘겨준 userId, role
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [verifiedEmail, setVerifiedEmail] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const navigate = useNavigate();

  /**
   * 인증 상태를 업데이트하는 함수
   *
   * @param {boolean} status - 인증 성공 여부
   */
  const handleVerified = (status: boolean, email: string) => {
    setIsVerified(status);
    if (email) setVerifiedEmail(email);
  };

  /**
   * 인증 완료 버튼 클릭 시 호출되는 함수
   * 인증이 완료되지 않았을 경우 모달로 알림,
   * 완료된 경우 로그인 페이지로 이동
   */
  const handleComplete = () => {
    if (!isVerified) {
      setModalMessage('인증이 완료되지 않았습니다.');
      setShowModal(true);
      return;
    }

    if (role === 'ROLE_HOST') {
      navigate('/place-register', { state: { email: verifiedEmail } });
    } else {
      navigate('/login');
    }
  };

  /**
   * 모달을 닫는 함수
   */
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="h-full flex flex-col">
      <HeaderBack />
      <LoginTitle
        title="이메일 인증"
        subTitle="회원 가입에 필요한 이메일을 인증해주세요"
      />
      <EmailBox userId={userId} onVerified={handleVerified} />
      <div className="flex justify-center pt-20">
        <ButtonProps
          size="login"
          variant="custom"
          title="완료"
          onClick={handleComplete}
        />
      </div>
      {showModal && (
        <CustomModal
          title="알림"
          description={modalMessage}
          confirmText="확인"
          onConfirm={handleCloseModal}
        />
      )}
    </div>
  );
}

export default EmailVerify;
