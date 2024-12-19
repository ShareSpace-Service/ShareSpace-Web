import ButtonProps from '@/component/ui/ButtonProps';
import { useMatchingIdStore } from '@/store/MatchingId';
import { useModalStore } from '@/store/ModalState';
import { useProductRegisterStore } from '@/store/ProductRegister';
import { useNavigate } from 'react-router-dom';

/**
 * '네'를 클릭한 경우 장소 선택 페이지로 이동
 * '아니오'를 클릭한 경우 /home으로 이동 매칭 ID 초기화
 */

function GuestPlaceChoice() {
  const navigate = useNavigate();
  const { clearMatchingId } = useMatchingIdStore();
  const { title, clearForm } = useProductRegisterStore();
  const { closeModal } = useModalStore();

  const handleClick = (isYes: boolean) => {
    closeModal();
    clearForm();
    if (isYes) {
      navigate('/placelist');
    } else {
      clearMatchingId();
      navigate('/home');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="signUpBg w-[500px] h-[300px] p-6 rounded-lg relative">
        <div className="flex flex-col h-full justify-around">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center">
              장소 선택을 지금 하시겠습니까?
            </h2>
            <p className="text-gray-300 font-bold text-center">{title}</p>
          </div>
          <div className="flex items-center gap-3 justify-around">
            <ButtonProps
              title="네"
              size="check"
              variant="custom"
              onClick={() => handleClick(true)}
            />
            <ButtonProps
              title="아니요"
              size="check"
              variant="custom"
              onClick={() => handleClick(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestPlaceChoice;
