import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useState } from 'react';
import ButtonProps from '@/component/ui/ButtonProps';
import { validateEmail } from '@/api/RegisterUser';
import { useNavigate } from 'react-router-dom';

function InputValidation({ userId }: { userId: number }) {
  const [otp, setOtp] = useState<string>('');
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 6) {
      setOtp(numericValue);
    }
  };

  const handleSubmit = async () => {
    if (otp.length === 6) {
      try {
        console.log(userId);
        const result = await validateEmail(userId, parseInt(otp, 10));
        console.log('이메일 인증 성공:', result);

        // 이메일 인증 성공 후 /login 페이지로 리디렉션
        navigate('/login');
      } catch (error) {
        console.error('이메일 인증 실패:', error);
      }
    } else {
      console.log('Invalid OTP');
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center pt-10">
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          onChange={handleChange}
          value={otp}
        >
          <InputOTPGroup>
            <InputOTPSlot
              className="border border-r-0 border-solid"
              index={0}
            />
            <InputOTPSlot
              className="border border-r-0 border-solid"
              index={1}
            />
            <InputOTPSlot
              className="border border-r-0 border-solid"
              index={2}
            />
            <InputOTPSlot
              className="border border-r-0 border-solid"
              index={3}
            />
            <InputOTPSlot
              className="border border-r-0 border-solid"
              index={4}
            />
            <InputOTPSlot className="border border-solid" index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="pt-10 flex justify-center">
        <ButtonProps
          size="lg"
          variant="color"
          title="Confirm"
          onClick={handleSubmit}
        />
      </div>
    </>
  );
}

export default InputValidation;
