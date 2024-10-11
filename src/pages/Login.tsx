import HeaderBack from '@/layout/HeaderBack';
import logo from '@/assets/space_logo.svg';
import LoginForm from '@/component/form/LoginForm';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="flex flex-col h-full px-8">
      <HeaderBack />
      <div className="pt-10 flex flex-col items-start">
        <img src={logo} alt="logo" />
        <h2 className="pt-5 font-extrabold text-4xl">로그인/회원가입</h2>
      </div>
      <LoginForm />
      <h3 className="underline underline-offset-4 text-lg pt-10 inline-flex items-center justify-center">
        <Link to="/signup">Sign Up</Link>
      </h3>
    </div>
  );
}

export default Login;
