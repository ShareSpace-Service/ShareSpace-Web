interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-10 w-full h-full max-w-4xl overflow-auto relative">
        <button
          onClick={onClose}
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
