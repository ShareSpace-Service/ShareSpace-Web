import ButtonProps from '@/component/ui/ButtonProps';
import { Link } from 'react-router-dom';

interface ModalProps {
  title: string;
  description?: string;
  confirmText: string;
  cancelText: string;
  confirmLink: string;
  cancelLink: string;
}

function CustomModal({
  title,
  description,
  confirmText,
  cancelText,
  confirmLink,
  cancelLink,
}: ModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="signUpBg w-[500px] h-[300px] p-6 rounded-lg relative">
        <div className="flex flex-col h-full justify-around">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center">{title}</h2>
            {description && (
              <p className="text-gray-300 font-bold text-center">
                {description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 justify-around">
            <Link to={confirmLink}>
              <ButtonProps title={confirmText} size="check" variant="custom" />
            </Link>
            <Link to={cancelLink}>
              <ButtonProps title={cancelText} size="check" variant="custom" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
