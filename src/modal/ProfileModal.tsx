import { usePlaceEditStore } from '@/store/PlaceEdit';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  const { setIsEdit } = usePlaceEditStore();

  const handleClose = () => {
    setIsEdit(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-white p-10 w-[600px] h-screen max-w-4xl mx-auto relative overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-gray-200 w-[24px] h-[24px] p-4 rounded-full hover:bg-gray-300 font-bold flex items-center justify-center"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
