import { ImageOff } from 'lucide-react'; // 이미지 없음을 나타내는 아이콘

interface DefaultImageProps {
  className?: string;
}

function DefaultImage({ className = '' }: DefaultImageProps) {
  return (
    <div
      className={`
      flex items-center justify-center rounded-lg
      bg-gray-100
      aspect-square min-w-[100px] min-h-[100px]
      ${className}
    `}
    >
      <ImageOff className="w-1/2 h-1/2 text-gray-400" strokeWidth={1.5} />
    </div>
  );
}

export default DefaultImage;
