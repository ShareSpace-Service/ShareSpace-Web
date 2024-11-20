import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import { fetchProfile, fetchProfileUpdate } from '@/api/UserProfile';
import { userLogout } from '@/api/Login';
import CustomModal from '@/component/ui/CustomModal';
import ProfileEdit from '../MyPage/ProfileEdit';
import { useMyPageStore } from '@/store/MyPageState';
import { ApiResponse, ApiUpdateResponse } from '@/interface/MyPageInterface';
import ProfileInfo from '../MyPage/ProfileInfo';
import { useModalStore } from '@/store/ModalState';
import History from '@/pages/History';
import Question from '@/pages/Question';
import PlaceEdit from '@/pages/PlaceEdit';
import { useRoleStore } from '@/store/Role';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { LogoutResponse } from '@/interface/AuthInterface';

interface Title {
  label: 'History' | 'Question' | '장소 수정' | 'Logout'; // 가능한 label 값을 명시적으로 정의
  component?: (props: { label: string }) => React.ReactNode;
}

function MyPageCard() {
  const { data } = useQuery<ApiResponse>({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  const { isEdit, setIsEdit, formData, setFormData, image } = useMyPageStore();
  const { isOpen, closeModal } = useModalStore();
  // const [zoneCode, setZoneCode] = useState<string>('');
  const [view, setView] = useState<React.ReactNode | null>(null);
  const { role, setRole } = useRoleStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data?.data?.role) {
      setRole(data.data.role);
      console.log('Role set:', data.data.role);
    }
  }, [data, setRole]);

  const titles: Title[] = [
    { label: 'History', component: ({ label }) => <History title={label} /> },
    {
      label: 'Question',
      component: ({ label }) => <Question title={label} setView={setView} />,
    },
    {
      label: '장소 수정',
      component: ({ label }) => <PlaceEdit title={label} />,
    },
    { label: 'Logout' },
  ];

  const handleClick = (title: Title) => {
    if (title.component) {
      setView(title.component({ label: title.label }));
    }
  };

  // 로그아웃 모달 상태
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleLogoutClick = () => {
    setShowLogoutModal(true); // 모달 열기
  };

  const { mutate: logout } = useMutation<LogoutResponse, Error>({
    mutationFn: () => userLogout(),
    onSuccess: async (result) => {
      if (result.success) {
        // 1. React Query 캐시 초기화
        queryClient.clear();

        // 2. 로컬 스토리지/세션 스토리지 정리
        localStorage.clear();
        sessionStorage.clear();

        // 3. 프로그래매틱 네비게이션
        navigate('/login', { replace: true });
      } else {
        console.error('로그아웃 실패:', result.message);
      }
    },
    onError: (error) => {
      console.error('로그아웃 오류:', error);
    },
  });

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const mutation = useMutation<ApiUpdateResponse, Error, FormData>({
    mutationFn: (formData: FormData) => fetchProfileUpdate(formData),
    onSuccess: (data: any) => {
      console.log('Profile updated successfully:', data);
      setIsEdit(false);
    },
    onError: (error: any) => {
      console.error('Error updating profile:', error);
    },
  });

  // API가 호출 성공이 되면 데이터를 formData에 저장
  useEffect(() => {
    if (data && data.success) {
      console.log('fetching data', data);
      setFormData(data.data);
    }
  }, [data]);

  if (mutation.isError) {
    return <p>Error: {mutation.error.message}</p>;
  }

  // DaumPost에서 주소를 선택했을 때의 처리
  const handleAddressSelect = (addressData: Address) => {
    const fullAddress = addressData.address;
    if (formData) {
      setFormData({ ...formData, location: fullAddress });
    }
    // setZoneCode(addressData.zonecode);
    closeModal();
  };

  // 저장 버튼 클릭 시 API 호출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted!');
    if (formData && isEdit) {
      const formDataSubmit = new FormData();
      formDataSubmit.append('nickName', formData.nickName);
      formDataSubmit.append('location', formData.location);
      if (image) {
        formDataSubmit.append('image', image);
      }

      if (formData.nickName.length > 50 || formData.nickName.length < 2) {
        alert('닉네임은 2자 이상 50자 이내로 작성해주세요.');
        return;
      }

      mutation.mutate(formDataSubmit);
    }
  };

  useEffect(() => {
    if (view) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [view]);

  return (
    <>
      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
        {/* 수정 버튼 */}
        <ProfileEdit />
        <ProfileInfo data={data?.data} />
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <DaumPostcode onComplete={handleAddressSelect} />
            </div>
          </div>
        )}
        {/* 히스토리, Question, 로그아웃 */}
        {titles
          .filter((title) => title.label !== '장소 수정' || role === 'Host')
          .map((title) =>
            title.label === 'Logout' ? (
              <div key={title.label} onClick={handleLogoutClick}>
                <div className="flex flex-col items-start justify-center bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-20 cursor-pointer">
                  <div className="flex items-start m-4 gap-10">
                    <h2 className="font-extrabold text-xl">{title.label}</h2>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={title.label}
                onClick={() => handleClick(title)}
                className="flex flex-col items-start justify-center bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-20 cursor-pointer"
              >
                <div className="flex items-start m-4 gap-10">
                  <h2 className="font-extrabold text-xl">{title.label}</h2>
                </div>
              </div>
            )
          )}
        {showLogoutModal && (
          <CustomModal
            title="정말로 로그아웃하시겠습니까?"
            confirmText="예"
            cancelText="아니오"
            onConfirm={handleLogoutConfirm}
            onCancel={handleLogoutCancel}
          />
        )}
      </form>
      {view && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-10 w-full h-full max-w-4xl overflow-auto">
            <button
              onClick={() => setView(null)}
              className="absolute top-4 right-4 bg-gray-200 w-[24px] h-[24px] p-4 rounded-full hover:bg-gray-300 font-bold flex items-center justify-center"
            >
              &times;
            </button>
            {view}
          </div>
        </div>
      )}
    </>
  );
}

export default MyPageCard;
