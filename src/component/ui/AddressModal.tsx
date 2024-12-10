import { useModalStore } from '@/store/ModalState';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';

interface AddressModalProps {
  onComplete: (address: string) => void;
}

function AddressModal({ onComplete }: AddressModalProps) {
  const { closeModal } = useModalStore();

  // DaumPost에서 주소를 선택했을 때의 처리
  const handleAddressSelect = (addressData: Address) => {
    const fullAddress = addressData.address;
    onComplete(fullAddress);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-5 rounded-lg shadow-lg">
        <button
          onClick={closeModal}
          className="absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>
        <DaumPostcodeEmbed onComplete={handleAddressSelect} />
      </div>
    </div>
  );
}

export default AddressModal;
