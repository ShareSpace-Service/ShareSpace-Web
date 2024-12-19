import { useProfile } from '@/action/put-updateProfile';
import ProfileForm from '../form/ProfileForm';
import TitlesList from '../menu/TitleList';

function ProfileContainer() {
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <>
      {data && <ProfileForm data={data} />}
      <TitlesList />
    </>
  );
}

export default ProfileContainer;
