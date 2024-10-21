import { Button } from '@/components/ui/button';

interface ButtonProps {
  size:
    | 'custom'
    | 'login'
    | 'lg'
    | 'sm'
    | 'icon'
    | 'default'
    | 'full'
    | 'check'
    | 'Rental'
    | 'status';
  variant: 'custom' | 'color' | 'gray';
  title: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

function ButtonProps({
  size,
  variant,
  title,
  className,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </Button>
  );
}

export default ButtonProps;
