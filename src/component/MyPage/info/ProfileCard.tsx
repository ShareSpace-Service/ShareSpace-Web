interface ProfileInfoProps {
  leftSection: React.ReactNode; // UserProfile
  rightSection: React.ReactNode; // UserDetails
}

function ProfileCard({ leftSection, rightSection }: ProfileInfoProps) {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-80">
      <div className="flex items-start m-4 mt-10 gap-10 pb-2">
        {leftSection}
        {rightSection}
      </div>
    </div>
  );
}

export default ProfileCard;
