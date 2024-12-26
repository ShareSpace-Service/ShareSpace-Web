import { RoleType } from '@/pages/SignUp';

export const RoleCard = ({ role }: { role: RoleType }) => (
  <div
    className="flex justify-between items-center rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-[250px] cursor-pointer"
    key={role.role}
  >
    {/* 좌측 설명 */}
    <div className="flex flex-col items-start pl-5 gap-3">
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
