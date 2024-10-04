import SignUpForm from '@/component/SignUpForm';
import LoginTitle from '@/component/text/LoginTitle';
import { Button } from '@/components/ui/button';
import HeaderBack from '@/layout/HeaderBack';
import { Link } from 'react-router-dom';

function SignInfo() {
  return (
    <div className="h-full flex flex-col">
      <HeaderBack />
      <LoginTitle
        title="회원 정보 입력"
        subTitle="회원 가입에 필요한 정보를 입력해주세요"
      />
      <SignUpForm />
      <div className="pt-10">
        <Link to="/emailverify">
          <Button size="login" variant="custom">
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default SignInfo;
