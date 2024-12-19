import { Input } from '@/components/ui/input';

interface UserProfileProps {
  image?: string | null;
  nickName?: string;
  isEdit: boolean;
  isLoading: boolean;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function UserProfile({
  image,
  nickName,
  isEdit,
  isLoading,
  onImageChange,
  onInputChange,
}: UserProfileProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <label className="relative">
        <img
          src={image || ''}
          alt="Profile"
          className={`w-[150px] h-[150px] rounded-full object-cover border border-solid border-gray-200 bg-gray-200 
              ${isLoading ? 'opacity-50' : ''}`}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )}
        <Input
          type="file"
          accept=".jpeg, .png"
          onChange={onImageChange}
          disabled={!isEdit || isLoading}
          className="hidden"
        />
      </label>
      <Input
        name="nickName"
        value={nickName || ''}
        onChange={onInputChange}
        disabled={!isEdit}
        className={`font-extrabold text-xl border-none p-0 flex-1 text-center ${
          isEdit ? 'text-gray-300' : 'text-black'
        }`}
      />
    </div>
  );
}

export default UserProfile;
