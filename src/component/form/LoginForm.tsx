import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ButtonProps from '../ui/ButtonProps';
import { login } from '@/api/Login';
import { connectSSE } from '@/api/Sse';
import { useNavigate } from 'react-router-dom';

/**
 * LoginForm 컴포넌트는 사용자의 이메일과 비밀번호를 입력받고, 로그인 요청을 처리함
 * 로그인 성공 후, userId를 받아 SSE 연결을 설정
 */
function LoginForm(): JSX.Element {
  // email과 password 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 페이지 이동 처리
  const navigate = useNavigate();

  /**
   * 폼 제출 시 로그인 요청을 서버로 보내는 함수
   * 로그인 성공 시, SSE 연결에 userId를 포함하여 연결
   *
   * @param {React.FormEvent} e - 폼 제출 이벤트
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 서버에 로그인 요청
      const result = await login(email, password);

      if (result.ok) {
        const data = await result.json();
        const userId = data.userId; // 로그인 성공 시 반환된 사용자 ID

        // SSE 연결
        const eventSource = connectSSE(userId, (event) => {
        });

        // 홈 페이지로 이동
        navigate('/home');
      }

      // TODO: Email이 validated되지 않았을 때의 처리 추가 필요
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-5 pt-20"
    >
      {/* 이메일 입력 필드 */}
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

      {/* 비밀번호 입력 필드 */}
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

      {/* 로그인 버튼 */}
      <div className="pt-10">
        <ButtonProps size="login" variant="custom" title="Login" onClick={handleSubmit} />
      </div>
    </form>
  );
}

export default LoginForm;
