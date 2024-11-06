import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import { fetchProfile, fetchProfileUpdate } from '@/api/UserProfile';
import { userLogout } from '@/api/Login';
import CustomModal from '@/component/ui/CustomModal';
import ProfileEdit from '../MyPage/ProfileEdit';
import { useMyPageStore } from '@/store/MyPageState';
import { ApiUpdateResponse } from '@/interface/MyPageInterface';
import ProfileInfo from '../MyPage/ProfileInfo';
import { useModalStore } from '@/store/ModalState';

interface Title {
  label: string;
  path: string;
}

const titles: Title[] = [
  { label: 'History', path: '/history' },
  { label: 'Question', path: '/question' },
  { label: 'Logout', path: '/logout' },
];

function MyPageCard() {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  const { isEdit, setIsEdit, formData, setFormData, image } = useMyPageStore();
  const { isOpen, closeModal } = useModalStore();
  const [zoneCode, setZoneCode] = useState<string>(''); // location 선택

  // 로그아웃 모달 상태
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleLogoutClick = () => {
    setShowLogoutModal(true); // 모달 열기
  };

  // 로그아웃 처리 함수
  const handleLogoutConfirm = async () => {
    try {
      const response = await userLogout();
      if (response.success) {
        window.location.replace('/login');
      } else {
        console.error('Logout failed:', response.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setShowLogoutModal(false); // 모달 닫기
    }
  };

  // 로그아웃 취소 처리 함수
  const handleLogoutCancel = () => {
    setShowLogoutModal(false); // 모달 닫기
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
    setZoneCode(addressData.zonecode);
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
      mutation.mutate(formDataSubmit);
    }
  };

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
        {titles.map((title) =>
          title.label === 'Logout' ? (
            <div key={title.label} onClick={handleLogoutClick}>
              {' '}
              {/* 로그아웃 클릭 시 모달 표시 */}
              <div className="flex flex-col items-start justify-center bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-20 cursor-pointer">
                <div className="flex items-start m-4 gap-10">
                  <h2 className="font-extrabold text-xl">{title.label}</h2>
                </div>
              </div>
            </div>
          ) : (
            <Link to={title.path} key={title.label}>
              <div className="flex flex-col items-start justify-center bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-20 cursor-pointer">
                <div className="flex items-start m-4 gap-10">
                  <h2 className="font-extrabold text-xl">{title.label}</h2>
                </div>
              </div>
            </Link>
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
    </>
  );
}

export default MyPageCard;
