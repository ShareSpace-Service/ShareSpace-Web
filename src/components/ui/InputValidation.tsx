import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useState } from 'react';
import ButtonProps from '@/component/ui/ButtonProps';
import { validateEmail } from '@/api/RegisterUser';
import CustomModal from '@/component/ui/CustomModal';
/**
 * 인증번호 입력 및 확인 컴포넌트
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {number} props.userId - 인증할 사용자 ID
 * @param {Function} props.onVerified - 인증 상태를 전달하는 콜백 함수
 * @returns {JSX.Element} 인증번호 입력 및 확인 JSX 컴포넌트
 */

function InputValidation({
  userId,
  onVerified,
}: {
  userId: number;
  onVerified: (isVerified: boolean) => void;
}) {
  const [otp, setOtp] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const handleChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 6) {
      setOtp(numericValue);
    }
  };

  const handleConfirm = async () => {
    if (!otp) {
      setModalMessage('인증번호를 입력해주세요.');
      setShowModal(true);
      return;
    }

    if (otp.length !== 6) {
      setModalMessage('인증번호는 6자리여야 합니다.');
      setShowModal(true);
      return;
    }

    try {
      const validationNumber = parseInt(otp, 10);
      await validateEmail(userId, validationNumber);
      onVerified(true); // 인증 성공 시 상태 전달
      setModalMessage('인증이 완료되었습니다.');
      setShowModal(true);
    } catch (error: any) {
      onVerified(false); // 인증 실패 시 상태 전달
      setModalMessage(error.MESSAGE || '알 수 없는 오류가 발생했습니다.');
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
          onClick={handleConfirm}
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
    </>
  );
}

export default InputValidation;
