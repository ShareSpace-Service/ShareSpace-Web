import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useState } from 'react';
import ButtonProps from '@/component/ui/ButtonProps';

function InputValidation() {
  const [otp, setOtp] = useState<string>('');

  const handleChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 6) {
      setOtp(numericValue);
    }
  };

  const handleSubmit = () => {
    if (otp.length === 6) {
      console.log('OTP:', otp);
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
