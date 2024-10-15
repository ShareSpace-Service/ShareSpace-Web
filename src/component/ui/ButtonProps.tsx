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
    | 'Rental';
  variant: 'custom' | 'color';
  title: string;
  className?: string;
  onClick?: () => void;
}

function ButtonProps({
  size,
  variant,
  title,
  className,
  onClick,
}: ButtonProps) {
  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}

export default ButtonProps;
