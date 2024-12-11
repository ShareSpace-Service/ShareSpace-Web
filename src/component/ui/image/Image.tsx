import { useState } from 'react';
import DefaultImage from './DefaultImage';

interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | null | undefined;
  alt: string;
}

function Image({ src, alt, className = '', ...props }: ImageProps) {
  const [hasError, setHasError] = useState(false);

  const baseClasses = 'w-[100px] h-[100px] object-cover';

  if (!src || hasError) {
    return <DefaultImage className={`${baseClasses} ${className}`} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={baseClasses}
      {...props}
    />
  );
}

export default Image;
