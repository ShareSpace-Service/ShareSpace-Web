import NoteSendForm from '@/component/form/NoteSendForm';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function NoteSendModal({ closeModal }: { closeModal: () => void }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-20">
      <div className="signUpBg w-full h-full px-4 flex flex-col">
        <div className="h-[60px] w-full bg-blue flex items-center gap-3">
          <AiOutlineArrowLeft
            className="ml-2 text-2xl font-extrabold cursor-pointer hover:text-gray-500 transition-colors duration-200"
            onClick={closeModal}
          />
          <p className="font-bold">쪽지 보내기</p>
        </div>
        <NoteSendForm />
      </div>
    </div>
  );
}

export default NoteSendModal;
