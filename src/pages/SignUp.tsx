import { useNavigate } from 'react-router-dom';
import { RoleCard } from '@/component/card/RoleCard';
import { RoleInfo } from '@/constants/role';

function SignUp() {
  const navigate = useNavigate();

  const handleRoleClick = (roleStatus: string) => {
    navigate('/join', { state: { roleStatus } });
  };

  return (
    <div className="h-full flex flex-col justify-center gap-5 px-8">
      <div>
        <h2 className="font-bold text-3xl">역할을 선택해주세요</h2>
      </div>
      <div className="flex flex-col justify-center gap-7">
        {RoleInfo.map((role) => (
          <div key={role.role} onClick={() => handleRoleClick(role.roleStatus)}>
            <RoleCard role={role} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SignUp;
