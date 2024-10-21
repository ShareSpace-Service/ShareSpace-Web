import { AiOutlineArrowLeft } from 'react-icons/ai';

function ModalHeader({
  onClose,
  title,
}: {
  onClose: () => void;
  title: string;
}) {
  return (
    <div className="h-[60px] w-full bg-blue flex items-center gap-3">
      <AiOutlineArrowLeft
        className="ml-2 text-2xl font-extrabold cursor-pointer hover:text-gray-500 transition-colors duration-200"
        onClick={onClose}
      />
      <p className="font-bold">{title}</p>
    </div>
  );
}

export default ModalHeader;
