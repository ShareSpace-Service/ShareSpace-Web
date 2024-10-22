import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ButtonProps from '../ui/ButtonProps';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import DaumPost from '@/api/DaumPost';

interface ApiResponse {
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

interface Title {
  label: string;
  path: string;
}

const titles: Title[] = [
  { label: 'History', path: '/history' },
  { label: 'Question', path: '/question' },
  { label: 'Logout', path: '/logout' },
];

async function fetchProfile() {
  const response = await fetch(`http://localhost:8080/user/detail`);
  if (!response.ok) {
    throw new Error('서버 상태가 그냥 미누그앗!' + response.status);
  }
  const result: ApiResponse = await response.json();
  console.log('성공했습니다.', result);
  if (response.ok && result.success) {
    console.log('성공', result.message);
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}

function MyPageCard() {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchProfile(),
  });

  const [disabled, setDisabled] = useState<boolean>(true);
  const [formData, setFormData] = useState<UserData | null>(null);
  const [image, setImage] = useState<File | null>(null);

  // location 선택
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [zoneCode, setZoneCode] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  // API가 호출 성공이 되면 데이터를 formData에 저장
  useEffect(() => {
    if (data && data.success) {
      setFormData(data.data);
    }
  }, [data]);

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
      setImage(file);

      const reader = new FileReader();
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
  const handleAddressSelect = (selectedAddress: string) => {
    setAddress(selectedAddress);
    if (formData) {
      setFormData({ ...formData, location: selectedAddress });
    }
    setIsOpen(false);
  };

  // 저장 버튼 클릭 시 API 호출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      const formDataSubmit = new FormData();
      formDataSubmit.append('nickName', formData.nickName);
      if (image) {
        formDataSubmit.append('image', image);
      }
    }
  };
  console.log('formData', formData);

  return (
    <>
      {/* 수정 버튼 */}
      <div className="flex items-center justify-end pb-4">
        <ButtonProps
          size="sm"
          variant="custom"
          title={disabled ? '수정' : '저장'}
          onClick={() => setDisabled(!disabled)}
        />
      </div>
      <form className="flex flex-col gap-10">
        <div className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-80 cursor-pointer ">
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
                  disabled={disabled}
                  className="hidden"
                />
              </label>
              {/* 닉네임 */}
              <Input
                name="nickName"
                value={formData?.nickName || ''}
                onChange={handleInputChange}
                disabled={disabled}
                className={`font-extrabold text-xl border-none p-0 flex-1 text-center ${disabled ? 'text-gray-300' : 'text-black'} `}
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
                value={data?.data.location}
                disabled={disabled}
                onChange={handleInputChange}
                name="location"
              />
              {!disabled && (
                <ButtonProps
                  size="sm"
                  variant="custom"
                  title="주소 검색"
                  onClick={() => setIsOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
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
          disabled ? 'text-gray-300' : 'text-black'
        } border-none p-0`}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}
