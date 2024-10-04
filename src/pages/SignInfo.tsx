import SignUpForm from '@/component/SignUpForm';
import { Button } from '@/components/ui/button';
import HeaderBack from '@/layout/HeaderBack';

function SignInfo() {
  return (
    <div className="h-full flex flex-col">
      <HeaderBack />
      <div className="flex flex-col gap-3 items-start pt-10 pl-[28px]">
        <h1 className="font-extrabold text-5xl tracking-wider text-fontColor">
          회원 정보 입력
        </h1>
        <p className="font-bold text-base">가입에 필요한 정보를 입력해주세요</p>
      </div>
      <SignUpForm />
      <div className="pt-10">
        <Button size="login" variant="custom">
          Next
        </Button>
      </div>
    </div>
  );
}

export default SignInfo;
