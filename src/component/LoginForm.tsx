import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ButtonProps from './ui/ButtonProps';

function LoginForm() {
  return (
    <>
      <form className="flex flex-col items-center gap-5 pt-20">
        <div className="grid w-full max-w-lg items-center gap-2">
          <Label htmlFor="email" className="text-start font-bold text-base">
            Email
          </Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        <div className="grid w-full max-w-lg items-center gap-2">
          <Label htmlFor="password" className="text-start font-bold text-base">
            Password
          </Label>
          <Input type="password" id="password" placeholder="password" />
        </div>
        <div className="pt-10">
          <ButtonProps size="login" variant="custom" title="Sign Up" />
        </div>
      </form>
    </>
  );
}

export default LoginForm;
