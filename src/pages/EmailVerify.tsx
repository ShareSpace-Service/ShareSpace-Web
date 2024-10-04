import LoginTitle from '@/component/text/LoginTitle';
import { Button } from '@/components/ui/button';
import InputValidation from '@/components/ui/InputValidation';
import HeaderBack from '@/layout/HeaderBack';

const EmailBox = () => {
  return (
    <div className="flex justify-center pt-16 px-[28px]">
      <div className="flex flex-col border border-solid border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-[350px] cursor-pointer">
        <div className="flex flex-col items-start justify-start gap-2 p-5 w-full">
          <h2 className="font-extrabold text-2xl">
            인증번호 6자리를 입력해주세요
          </h2>
          <p className="font-bold text-base">인증을 위해 아래에 입력해주세요</p>
        </div>
        <InputValidation />
      </div>
    </div>
  );
};

function EmailVerify() {
  return (
    <div className="h-full flex flex-col">
      <HeaderBack />
      <LoginTitle
        title="이메일 인증"
        subTitle="회원 가입에 필요한 이메일을 인증해주세요"
      />
      <EmailBox />
      <div className="flex justify-center pt-20">
        <Button size="login" variant="custom">
          접수
        </Button>
      </div>
    </div>
  );
}

export default EmailVerify;
