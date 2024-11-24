import { useState } from 'react';
import DaumPost from '@/api/DaumPost';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SignUpFormData } from '@/pages/SignInfo';

interface SignUpFormProps {
  formData: SignUpFormData;
  onFormChange: (name: keyof SignUpFormData, value: string) => void;
  isPasswordValid: (password: string) => boolean;
  isEmailValid: (email: string) => boolean;
}
function SignUpForm({
  formData,
  onFormChange,
  isPasswordValid,
  isEmailValid,
}: SignUpFormProps) {
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
            defaultValue={formData.email}
            onChange={(e) => onFormChange('email', e.target.value)}
            className="w-full"
          />
          {!isEmailValid(formData.email) && formData.email && (
            <p className="text-red-500 text-sm">
              올바른 이메일 형식이 아닙니다.
            </p>
          )}
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
            defaultValue={formData.password}
            onChange={(e) => onFormChange('password', e.target.value)}
            className="w-full"
          />
          {!isPasswordValid(formData.password) && formData.password && (
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
            defaultValue={formData.passwordValidate}
            onChange={(e) => onFormChange('passwordValidate', e.target.value)}
            className="w-full"
          />
          {formData.passwordValidate &&
            formData.password !== formData.passwordValidate && (
              <p className="text-red-500 text-sm">
                비밀번호가 일치하지 않습니다.
              </p>
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
            defaultValue={formData.nickname}
            onChange={(e) => onFormChange('nickname', e.target.value)}
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
            onFormChange('location', newAddress);
          }}
        />
      </div>
    </form>
  );
}

export default SignUpForm;
