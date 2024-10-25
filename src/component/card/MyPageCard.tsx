import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ButtonProps from '../ui/ButtonProps';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import { fetchProfile, fetchProfileUpdate } from '@/api/UserProfile';

export interface ApiResponse {
  message: string;
  status: string;
  data: UserData;
  success: boolean;
}

interface UserData {
  nickName: string;
  email: string;
  image: string | null;
  role: string;
  location: string;
}

export interface ApiUpdateResponse {
  message: string;
  status: string;
  data: null;
  success: boolean;
}

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

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserData | null>(null);
  const [originalData, setOriginalData] = useState<UserData | null>(null);
  const [image, setImage] = useState<File | null>(null);

  // location 선택
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [zoneCode, setZoneCode] = useState<string>('');

  const mutation = useMutation<ApiUpdateResponse, Error, FormData>({
    mutationFn: (formData: FormData) => fetchProfileUpdate(formData),
    onSuccess: (data: any) => {
      console.log('Profile updated successfully:', data);
      setOriginalData(formData); // 수정 후 데이터를 originalData에 저장 (수정 취소 시 사용)
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
      setFormData(data.data); // 데이터를 formData에 저장
      setOriginalData(data.data); // 데이터를 originalData에 저장
    }
  }, [data]);

  if (mutation.isError) {
    return <p>Error: {mutation.error.message}</p>;
  }

  // input 값이 변경될 때마다 formData 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // 이미지 변경
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      setImage(file);

      reader.onload = (event) => {
        if (event.target) {
          setFormData((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              image: event.target?.result as string,
            };
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // DaumPost에서 주소를 선택했을 때의 처리
  const handleAddressSelect = (addressData: Address) => {
    const fullAddress = addressData.address;
    if (formData) {
      setFormData({ ...formData, location: fullAddress });
    }
    setZoneCode(addressData.zonecode);
    setIsOpen(false);
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

  // 주소 검색 버튼 클릭 시 DaumPostCode 모달 열기
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleEditClick = () => {
    setIsEdit(true);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    setFormData(originalData);
  };

  return (
    <>
      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
        {/* 수정 버튼 */}
        <div className="flex items-center justify-end">
          {!isEdit && (
            <ButtonProps
              size="sm"
              variant="custom"
              title="수정"
              type="button"
              onClick={handleEditClick}
            />
          )}
          {/* 수정 버튼 클릭시 저장 , 취소 버튼 등장 */}
          {isEdit && (
            <div className="flex gap-3">
              <ButtonProps
                size="sm"
                variant="custom"
                title="취소"
                type="button"
                onClick={handleCancelEdit}
              />
              <ButtonProps
                size="sm"
                variant="custom"
                title="저장"
                type="submit"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-70 cursor-pointer ">
          {/* 유저 정보 카드 */}
          <div className="flex items-start m-4 gap-10 pb-2">
            {/* 좌측 이미지 및 닉네임 */}
            <div className="flex flex-col items-center gap-4">
              {/* 이미지 */}
              <label>
                <img
                  id="input-file"
                  src={formData?.image || ''}
                  className="w-[150px] h-[150px] rounded-full object-cover border border-solid border-gray-200 bg-gray-200"
                />
                <Input
                  type="file"
                  id="input-file"
                  accept=".jpeg, .png"
                  onChange={handleImageChange}
                  disabled={!isEdit}
                  className="hidden"
                />
              </label>
              {/* 닉네임 */}
              <Input
                name="nickName"
                value={formData?.nickName || ''}
                onChange={handleInputChange}
                disabled={!isEdit}
                className={`font-extrabold text-xl border-none p-0 flex-1 text-center ${isEdit ? 'text-gray-300' : 'text-black'} `}
              />
            </div>
            {/* 우측 회원 정보 */}
            <div className="flex flex-col w-80 gap-3">
              <ProfileDetailItem
                label="E-Mail"
                value={data?.data.email}
                disabled={true}
                name="email"
              />
              <ProfileDetailItem
                label="Role"
                value={data?.data.role}
                disabled={true}
                name="role"
              />
              <ProfileDetailItem
                label="Location"
                value={formData?.location || ''}
                disabled={true}
                onChange={handleInputChange}
                name="location"
              />
              {isEdit && (
                <ButtonProps
                  size="sm"
                  variant="custom"
                  title="주소 검색"
                  onClick={handleClick}
                />
              )}
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <DaumPostcode onComplete={handleAddressSelect} />
            </div>
          </div>
        )}
        {/* 히스토리, Question, 로그아웃 */}

        {titles.map((title) => (
          <div
            key={title.label}
            className="flex flex-col items-start justify-center bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-20 cursor-pointer"
          >
            <div className="flex items-start m-4 gap-10">
              <Link
                key={title.label}
                to={title.path}
                className="font-extrabold text-xl"
              >
                {title.label}
              </Link>
            </div>
          </div>
        ))}
      </form>
    </>
  );
}

export default MyPageCard;

function ProfileDetailItem({
  label,
  value,
  disabled,
  onChange,
  name,
}: {
  label: string;
  value: string | undefined;
  disabled: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}) {
  return (
    <div className="flex flex-col items-start">
      <h2 className="font-extrabold text-lg flex-1">{label}</h2>
      <Input
        value={value || ''}
        name={name}
        className={`font-extrabold text-lg flex-1 ${
          disabled ? 'text-black' : 'text-gray-300'
        } border-none p-0`}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}
