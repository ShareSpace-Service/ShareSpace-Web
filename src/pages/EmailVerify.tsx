import LoginTitle from '@/component/text/LoginTitle';
import ButtonProps from '@/component/ui/ButtonProps';
import HeaderBack from '@/layout/HeaderBack';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CustomModal from '@/component/ui/CustomModal';
import InputValidation from '@/components/ui/InputValidation';
/**
 * 이메일 인증 입력 박스 컴포넌트
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {number} props.userId - 인증할 사용자 ID
 * @param {Function} props.onVerified - 인증 상태를 전달하는 콜백 함수
 * @returns {JSX.Element} 인증번호 입력 박스 JSX 컴포넌트
 */
const EmailBox = ({
  userId,
  onVerified,
}: {
  userId: number;
  onVerified: (isVerified: boolean) => void;
}) => {
  return (
    <div className="flex justify-center pt-16 px-[28px]">
      <div className="flex flex-col border border-solid border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-[350px] cursor-pointer">
        <div className="flex flex-col items-start justify-start gap-2 p-5 w-full">
          <h2 className="font-extrabold text-2xl">
            인증번호 6자리를 입력해주세요
          </h2>
          <p className="font-bold text-base">인증을 위해 아래에 입력해주세요</p>
        </div>
        <InputValidation userId={userId} onVerified={onVerified} />{' '}
        {/* userId와 인증 상태 전달 */}
      </div>
    </div>
  );
};

/**
 * 이메일 인증 완료 페이지 컴포넌트
 *
 * @returns {JSX.Element} 이메일 인증 완료 페이지 JSX 컴포넌트
 */
function EmailVerify() {
  const location = useLocation();
  const { userId } = location.state; // 회원가입 페이지에서 넘겨준 userId
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  /**
   * 인증 상태를 업데이트하는 함수
   *
   * @param {boolean} status - 인증 성공 여부
   */
  const handleVerified = (status: boolean) => {
    setIsVerified(status);
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
