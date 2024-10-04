import DaumPost from '@/api/DaumPost';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

function SignUpForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [zoneCode, setZoneCode] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  return (
    <>
      <form className="flex flex-col items-center gap-5 pt-14">
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
          <Input type="password" id="password" placeholder="Password" />
        </div>
        <div className="grid w-full max-w-lg items-center gap-2">
          <Label
            htmlFor="Password-Validation"
            className="text-start font-bold text-base"
          >
            Password-Validation
          </Label>
          <Input
            type="password"
            id="Password-Validation"
            placeholder="Password-Validation"
          />
        </div>
        <div className="grid w-full max-w-lg items-center gap-2">
          <Label htmlFor="NickName" className="text-start font-bold text-base">
            NickName
          </Label>
          <Input type="text" id="NickName" placeholder="NickName" />
        </div>
        <DaumPost
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          zoneCode={zoneCode}
          setZoneCode={setZoneCode}
          address={address}
          setAddress={setAddress}
        />
      </form>
    </>
  );
}

export default SignUpForm;
