import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ButtonProps from '../ui/ButtonProps';
import { login } from '@/api/Login';
import { useNavigate } from 'react-router-dom';
import CustomModal from '@/component/ui/CustomModal';

/**
 * LoginForm 컴포넌트는 사용자의 이메일과 비밀번호를 입력받고,
 * 로그인 요청을 처리하는 폼을 제공합니다.
 * 로그인 실패 시 오류 메시지를 모달로 표시합니다.
 *
 * @returns {JSX.Element} 로그인 폼 UI를 렌더링하는 JSX 요소
 */
function LoginForm(): JSX.Element {
  /** 사용자의 이메일을 저장하는 상태 */
  const [email, setEmail] = useState('');

  /** 사용자의 비밀번호를 저장하는 상태 */
  const [password, setPassword] = useState('');

  /** 모달을 표시할지 여부를 저장하는 상태 */
  const [showModal, setShowModal] = useState(false);

  /** 모달에 표시할 오류 메시지를 저장하는 상태 */
  const [modalMessage, setModalMessage] = useState('');

  /** 페이지 네비게이션을 위한 훅 */
  const navigate = useNavigate();

  /**
   * 폼 제출 시 호출되는 함수로, 로그인 요청을 서버로 보냅니다.
   * 로그인 성공 시 홈 페이지로 이동하며, 실패 시 모달을 띄웁니다.
   *
   * @param {React.FormEvent} e - 폼 제출 이벤트
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await login(email, password);

      if (result.ok) {
        navigate('/home'); // 로그인 성공 시 홈 페이지로 이동
      } else {
        const errorData = await result.json();
        setModalMessage(errorData.MESSAGE || '로그인 실패'); // 서버에서 받은 오류 메시지를 설정
        setShowModal(true); // 모달 표시
        setPassword(''); // 비밀번호 필드 초기화
      }
    } catch (error) {
      setShowModal(true); // 예외 발생 시 모달 표시
      setPassword(''); // 비밀번호 필드 초기화
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5 pt-20"
      >
        <div className="grid w-full max-w-lg items-center gap-2">
          <Label htmlFor="email" className="text-start font-bold text-base">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-lg items-center gap-2">
          <Label htmlFor="password" className="text-start font-bold text-base">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="pt-10">
          <ButtonProps
            size="login"
            variant="custom"
            title="Login"
            type="submit" // 2024-10-25: 엔터 키로도 로그인 가능하도록 type="submit" 추가
          />
        </div>
      </form>

      {/* 로그인 실패 시 모달 표시 */}
      {showModal && (
        <CustomModal
          title="로그인 실패"
          description={modalMessage}
          confirmText="확인"
          onConfirm={handleCloseModal} // 모달 닫기 처리
        />
      )}
    </>
  );
}

export default LoginForm;
