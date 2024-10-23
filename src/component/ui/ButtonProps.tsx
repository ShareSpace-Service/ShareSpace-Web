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
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

function ButtonProps({
  size,
  variant,
  title,
  className,
  onClick,
  disabled,
  type = 'button',
}: ButtonProps) {
  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {title}
    </Button>
  );
}

export default ButtonProps;
