import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';

interface ProfileDetailItemProps {
  label: string;
  value: string | undefined;
  disabled: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

function ProfileDetailItem({
  label,
  value,
  disabled,
  onChange,
  name,
}: ProfileDetailItemProps) {
  return (
    <div className="flex flex-col items-start">
      <h2 className="font-extrabold text-lg flex-1">{label}</h2>
      <Input
        value={value || ''}
        name={name}
        className={`font-extrabold text-lg flex-1 border-none p-0 ${
          disabled
            ? 'text-gray-900 bg-transparent'
            : 'text-primary border-b border-dashed border-primary/30 focus:border-primary'
        }`}
        disabled={disabled}
        onChange={onChange}
      />
      {!disabled && (
        <Pencil className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-primary/50" />
      )}
    </div>
  );
}

export default ProfileDetailItem;
