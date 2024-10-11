interface HeaderIconProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

function HeaderIcon({
  src,
  alt,
  width = 28,
  height = 28,
  onClick,
}: HeaderIconProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      onClick={onClick}
      className="cursor-pointer hover:filter hover:invert transition-transform duration-300"
    />
  );
}

export default HeaderIcon;
