import { useState } from 'react';
import DaumPost from '@/api/DaumPost';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function SignUpForm({
  setEmail,
  setPassword,
  setPasswordValidate,
  setNickname,
  setLocation,
}: {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setPasswordValidate: (passwordValidate: string) => void;
  setNickname: (nickname: string) => void;
  setLocation: (location: string) => void;
}) {
  const [zoneCode, setZoneCode] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <form className="flex flex-col items-center gap-5 pt-12">
        <div className="grid w-full max-w-lg items-center gap-2">
          <Label htmlFor="email" className="text-start font-bold text-base">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-lg items-center gap-2">
          <Label htmlFor="password" className="text-start font-bold text-base">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-lg items-center gap-2">
          <Label
            htmlFor="passwordValidate"
            className="text-start font-bold text-base"
          >
            Password-Validation
          </Label>
          <Input
            type="password"
            id="passwordValidate"
            placeholder="Password-Validation"
            onChange={(e) => setPasswordValidate(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-lg items-center gap-2">
          <Label htmlFor="NickName" className="text-start font-bold text-base">
            NickName
          </Label>
          <Input
            type="text"
            id="NickName"
            placeholder="NickName"
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <DaumPost
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          zoneCode={zoneCode}
          setZoneCode={setZoneCode}
          address={address}
          setAddress={(newAddress) => {
            setAddress(newAddress);
            setLocation(newAddress);
          }}
        />
      </form>
    </>
  );
}

export default SignUpForm;
