import HostImage from '@/assets/HostImage.svg';
import GuestImage from '@/assets/GuestImage.svg';
import { Link } from 'react-router-dom';
import ButtonProps from '@/component/ui/ButtonProps';
import { useState } from 'react';

interface RoleType {
  role: string;
  description: string;
  image: string;
}

const RoleInfo: RoleType[] = [
  {
    role: '호스트',
    description: '호스트에 대한 설명이 들어갑니다.',
    image: HostImage,
  },
  {
    role: '게스트',
    description: '게스트에 대한 설명이 들어갑니다.',
    image: GuestImage,
  },
];

const RoleCard = ({ role }: { role: RoleType }) => (
  <div
    className="flex justify-between items-center rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-[250px] cursor-pointer"
    key={role.role}
  >
    {/* 좌측 설명 */}
    <div className="flex flex-col items-start pl-3 gap-3">
      <h2 className="font-extrabold text-2xl">{role.role}</h2>
      <p className="text-gray-400 font-bold">{role.description}</p>
    </div>
    {/* 우측 이미지 */}
    <div className="flex flex-col justify-end pr-3 h-full">
      <img
        src={role.image}
        alt={role.role}
        className="w-[150px] h-[150px] object-contain"
      />
    </div>
  </div>
);

function SignUp() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="h-full flex flex-col justify-center gap-5">
      <div>
        <h2 className="font-bold text-3xl">역할을 선택해주세요</h2>
      </div>
      <div className="flex flex-col justify-center gap-7">
        {RoleInfo.map((role) => (
          <Link to="/createaccount" key={role.role}>
            <RoleCard role={role} />
          </Link>
        ))}
      </div>
      <div className="pt-5">
        <ButtonProps
          size="login"
          variant="custom"
          title="Next"
          className="w-full"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default SignUp;
