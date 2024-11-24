import InputValidation from '@/components/ui/InputValidation';

/**
 * 이메일 인증 입력 박스 컴포넌트
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {number} props.userId - 인증할 사용자 ID
 * @param {Function} props.onVerified - 인증 상태를 전달하는 콜백 함수
 * @returns {JSX.Element} 인증번호 입력 박스 JSX 컴포넌트
 */
export const EmailBox = ({
  userId,
  onVerified,
}: {
  userId: number;
  onVerified: (isVerified: boolean, email: string) => void;
}) => {
  return (
    <div className="flex justify-center pt-16 px-[28px]">
      <div className="flex flex-col border border-solid border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-[350px] cursor-pointer">
        <div className="flex flex-col items-center justify-start gap-2 p-5 w-full">
          <h2 className="font-extrabold text-2xl">
            인증번호 6자리를 입력해주세요
          </h2>
          <p className="font-bold text-base">인증을 위해 아래에 입력해주세요</p>
        </div>
        <InputValidation userId={userId} onVerified={onVerified} />
        {/* userId와 인증 상태 전달 */}
      </div>
    </div>
  );
};
