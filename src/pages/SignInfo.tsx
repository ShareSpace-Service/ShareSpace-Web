import SignUpForm from '@/component/form/SignUpForm';
import LoginTitle from '@/component/text/LoginTitle';
import ButtonProps from '@/component/ui/ButtonProps';
import HeaderBack from '@/layout/HeaderBack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@/api/RegisterUser'; // 회원가입 API

function SignInfo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValidate, setPasswordValidate] = useState('');
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('ROLE_GUEST'); // 기본값 설정

  const navigate = useNavigate();

  const handleNextClick = async () => {
    try {
      // 회원가입 요청 데이터
      const userData = {
        email,
        role, // 역할 (호스트/게스트)
        password,
        passwordValidate,
        location,
        nickname,
      };

      // 회원가입 요청 및 이메일 인증번호 발송
      const response = await registerUser(userData);
      // userId 추출
      const userId = response.data.userId; // 응답에서 userId 가져옴

      // 회원가입 성공 시 이메일 인증 페이지로 이동 (userId 함께 전달)
      navigate('/emailverify', { state: { userId } });
    } catch (error) {
      console.error('회원가입 요청 중 오류 발생:', error);
    }
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
      />
      <div className="pt-8 flex justify-center">
        <ButtonProps
          size="login"
          variant="custom"
          title="Next"
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
}

export default SignInfo;
