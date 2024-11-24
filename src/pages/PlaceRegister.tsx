import HostRegisterForm from '@/component/form/HostRegisterForm';
import LoginTitle from '@/component/text/LoginTitle';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PlaceRegister() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate('/signup'); // 컴포넌트 마운트 후 호출
    }
  }, [location.state, navigate]);

  // location.state가 null이면 아무것도 렌더링하지 않음
  if (!location.state) {
    return null;
  }

  const email = location.state.email as string;
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 max-w-2xl">
          <LoginTitle
            title="장소 등록"
            subTitle="대여해 주실 장소 정보를 입력해주세요"
          />
          <HostRegisterForm email={email} />
        </div>
      </div>
    </div>
  );
}

export default PlaceRegister;
