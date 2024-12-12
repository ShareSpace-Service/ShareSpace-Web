import AddressModal from '@/component/ui/AddressModal';
import { useModalStore } from '@/store/ModalState';
import { usePlaceEditStore } from '@/store/PlaceEdit';

function PlaceAddressModal() {
  const { formData, setFormData } = usePlaceEditStore();
  const { isOpen } = useModalStore();

  // location 값 변경 시
  const handleAddress = (address: string) => {
    if (formData) {
      setFormData({ ...formData, location: address });
    }
  };

  if (!isOpen) return null;

  return <AddressModal onComplete={handleAddress} />;
}

export default PlaceAddressModal;
