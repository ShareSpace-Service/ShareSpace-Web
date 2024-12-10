import ProfileDetailItem from './ProfileDetailItem';
import ButtonProps from '@/component/ui/ButtonProps';

interface UserDetailsProps {
  email: string;
  role: string;
  location: string | undefined;
  isEdit: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressClick: () => void;
}

function UserDetails({
  email,
  role,
  location,
  isEdit,
  onInputChange,
  onAddressClick,
}: UserDetailsProps) {
  return (
    <div className="flex flex-col w-80 gap-3">
      <ProfileDetailItem
        label="E-Mail"
        value={email}
        disabled={true}
        name="email"
      />
      <ProfileDetailItem
        label="Role"
        value={role}
        disabled={true}
        name="role"
      />
      <ProfileDetailItem
        label="Location"
        value={location || ''}
        disabled={true}
        onChange={onInputChange}
        name="location"
      />
      {isEdit && (
        <ButtonProps
          size="sm"
          variant="custom"
          title="주소 검색"
          onClick={onAddressClick}
        />
      )}
    </div>
  );
}

export default UserDetails;
