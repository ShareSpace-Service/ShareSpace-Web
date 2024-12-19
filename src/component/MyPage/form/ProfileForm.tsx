import ProfileCard from '../info/ProfileCard';
import UserProfile from '../info/UserProfile';
import UserDetail from '../info/UserDetail';
import { useProfileForm } from '@/hooks/profile/useProfileForm';
import { useProfileSubmit } from '@/hooks/profile/useProfileSubmit';
import { useProfileImage } from '@/hooks/profile/useProfileImage';
import { UserData } from '@/interface/MyPageInterface';
import { useModalStore } from '@/store/ModalState';
import AddressModal from '@/component/ui/AddressModal';
import ProfileEdit from '../edit/ProfileEdit';

export interface ProfileFormProps {
  data: UserData;
}

function ProfileForm({ data }: { data: ProfileFormProps }) {
  const {
    isEdit,
    startEdit,
    cancelEdit,
    formData,
    handleInputChange,
    handleImageLoad,
    handleAddressSelect,
  } = useProfileForm(data);
  const { handleSubmit } = useProfileSubmit();
  const { handleImageChange, isLoading: imageLoading } = useProfileImage();
  const { isOpen, openModal } = useModalStore();

  // 구조 분해 할당을 사용하여 data의 속성에 직접 접근
  const { email, role } = data?.data;

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <ProfileEdit
        isEdit={isEdit}
        onEditClick={startEdit}
        onCancelClick={cancelEdit}
      />
      <ProfileCard
        leftSection={
          <UserProfile
            image={formData?.image}
            nickName={formData?.nickName}
            isEdit={isEdit}
            onImageChange={(e) => handleImageChange(e, handleImageLoad)}
            onInputChange={handleInputChange}
            isLoading={imageLoading}
          />
        }
        rightSection={
          <UserDetail
            email={email}
            role={role}
            location={formData?.location}
            isEdit={isEdit}
            onInputChange={handleInputChange}
            onAddressClick={openModal}
          />
        }
      />
      {isOpen && <AddressModal onComplete={handleAddressSelect} />}
    </form>
  );
}

export default ProfileForm;
