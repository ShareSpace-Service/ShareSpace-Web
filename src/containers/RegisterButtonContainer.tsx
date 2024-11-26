import { useLocation } from 'react-router-dom';
import { useRoleStore } from '@/store/Role';
import { HIDE_BUTTON_PATHS, PathType } from '@/constants/path';
import RegisterButton from '@/component/ui/RegisterButton';

function RegisterButtonContainer() {
  const { pathname } = useLocation();
  const { role } = useRoleStore();

  // 타입 가드 함수 추가
  const isHiddenPath = (path: string): path is PathType => {
    return HIDE_BUTTON_PATHS.includes(path as PathType);
  };

  const shouldShowButton = !isHiddenPath(pathname) && role === 'HOST';

  if (!shouldShowButton) return null;

  return <RegisterButton />;
}

export default RegisterButtonContainer;
