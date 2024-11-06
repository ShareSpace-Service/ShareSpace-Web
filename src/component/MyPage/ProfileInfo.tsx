import { Input } from '@/components/ui/input';
import { useMyPageStore } from '@/store/MyPageState';
import React from 'react';
import ButtonProps from '../ui/ButtonProps';
import { UserData } from '@/interface/MyPageInterface';
import { useModalStore } from '@/store/ModalState';

interface ProfileEditProps {
  data?: UserData;
}

function ProfileInfo(
  { data }: ProfileEditProps,
  setIsOpen: (isOpen: boolean) => void
) {
  const { isEdit, formData, setFormData, setImage } = useMyPageStore();
  const { openModal } = useModalStore();

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openModal();
  };
  return (
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
            value={data?.email}
            disabled={true}
            name="email"
          />
          <ProfileDetailItem
            label="Role"
            value={data?.role}
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
  );
}

export default ProfileInfo;

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
