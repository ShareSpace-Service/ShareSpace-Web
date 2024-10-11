import SignUpForm from '@/component/form/SignUpForm';
import LoginTitle from '@/component/text/LoginTitle';
import ButtonProps from '@/component/ui/ButtonProps';
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
      <div className="pt-8 flex justify-center">
        <Link to="/emailverify">
          <ButtonProps size="login" variant="custom" title="Next" />
        </Link>
      </div>
    </div>
  );
}

export default SignInfo;
