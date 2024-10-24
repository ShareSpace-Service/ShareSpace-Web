import LoginTitle from '@/component/text/LoginTitle';
import ButtonProps from '@/component/ui/ButtonProps';
import InputValidation from '@/components/ui/InputValidation';
import HeaderBack from '@/layout/HeaderBack';
import { useLocation } from 'react-router-dom';

const EmailBox = ({ userId }: { userId: number }) => {
  return (
    <div className="flex justify-center pt-16 px-[28px]">
      <div className="flex flex-col border border-solid border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-[350px] cursor-pointer">
        <div className="flex flex-col items-start justify-start gap-2 p-5 w-full">
          <h2 className="font-extrabold text-2xl">
            인증번호 6자리를 입력해주세요
          </h2>
          <p className="font-bold text-base">인증을 위해 아래에 입력해주세요</p>
        </div>
        <InputValidation userId={userId} /> {/* userId 전달 */}
      </div>
    </div>
  );
};

function EmailVerify() {
  const location = useLocation();
  const { userId } = location.state; // 회원가입 페이지에서 넘겨준 userId
  console.log(userId);

  return (
    <div className="h-full flex flex-col">
      <HeaderBack />
      <LoginTitle
        title="이메일 인증"
        subTitle="회원 가입에 필요한 이메일을 인증해주세요"
      />
      <EmailBox userId={userId} /> {/* userId 전달 */}
      <div className="flex justify-center pt-20">
        <ButtonProps size="login" variant="custom" title="완료" />
      </div>
    </div>
  );
}

export default EmailVerify;
