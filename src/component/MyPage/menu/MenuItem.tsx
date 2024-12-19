import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

function MenuItem({ label, onClick }: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group flex items-center justify-between',
        'px-6 py-5 w-full',
        'bg-white rounded-xl',
        'border border-gray-100',
        'shadow-md hover:shadow-lg',
        'transition-all duration-300',
        'cursor-pointer',
        'hover:border-primary/20'
      )}
    >
      <h2 className="font-extrabold text-xl text-gray-800 group-hover:text-primary">
        {label}
      </h2>
      <div
        className={cn(
          'w-8 h-8 rounded-full',
          'bg-gray-100 group-hover:bg-primary/10',
          'flex items-center justify-center',
          'transition-colors duration-300'
        )}
      >
        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-primary" />
      </div>
    </div>
  );
}

export default MenuItem;
