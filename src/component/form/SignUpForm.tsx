import { useState } from 'react';
import DaumPost from '@/api/DaumPost';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/**
 * 회원가입 폼 컴포넌트
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {Function} props.setEmail - 이메일을 설정하는 함수
 * @param {Function} props.setPassword - 비밀번호를 설정하는 함수
 * @param {Function} props.setPasswordValidate - 비밀번호 확인을 설정하는 함수
 * @param {Function} props.setNickname - 닉네임을 설정하는 함수
 * @param {Function} props.setLocation - 위치 정보를 설정하는 함수
 * @param {string} props.password - 입력된 비밀번호 값
 * @param {string} props.passwordValidate - 비밀번호 확인 값
 * @param {Function} props.isPasswordValid - 비밀번호 유효성 검사 함수
 * @returns {JSX.Element} 회원가입 폼 JSX 컴포넌트
 */
function SignUpForm({
  setEmail,
  setPassword,
  setPasswordValidate,
  setNickname,
  setLocation,
  password,
  passwordValidate,
  isPasswordValid,
}: {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setPasswordValidate: (passwordValidate: string) => void;
  setNickname: (nickname: string) => void;
  setLocation: (location: string) => void;
  password: string;
  passwordValidate: string;
  isPasswordValid: (password: string) => boolean;
}) {
  const [zoneCode, setZoneCode] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <form className="flex flex-col items-center gap-5 pt-8 px-4 max-w-lg mx-auto">
      <div className="w-full space-y-4">
        {/* 이메일 입력 */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="email" className="text-start font-bold text-base">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="password" className="text-start font-bold text-base">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
          {!isPasswordValid(password) && password && (
            <p className="text-red-500 text-sm">
              비밀번호는 문자, 숫자, 특수문자를 포함한 8-20자여야 합니다.
            </p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="grid w-full items-center gap-2">
          <Label
            htmlFor="passwordValidate"
            className="text-start font-bold text-base"
          >
            Password-Validation
          </Label>
          <Input
            type="password"
            id="passwordValidate"
            placeholder="Password-Validation"
            onChange={(e) => setPasswordValidate(e.target.value)}
            className="w-full"
          />
          {passwordValidate && password !== passwordValidate && (
            <p className="text-red-500 text-sm">비밀번호가 일치하지 않습니다.</p>
          )}
        </div>

        {/* 닉네임 입력 */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="NickName" className="text-start font-bold text-base">
            NickName
          </Label>
          <Input
            type="text"
            id="NickName"
            placeholder="NickName"
            onChange={(e) => setNickname(e.target.value)}
            className="w-full"
          />
        </div>

        {/* 주소 입력 (DaumPost API 연동) */}
        <DaumPost
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          zoneCode={zoneCode}
          setZoneCode={setZoneCode}
          address={address}
          setAddress={(newAddress) => {
            setAddress(newAddress);
            setLocation(newAddress);
          }}
        />
      </div>
    </form>
  );
}

export default SignUpForm;
