import AlarmList from '@/component/AlarmList';

// 모달 컴포넌트를 만들기 위한 TSX 파일
function Modal({ closeModal }: { closeModal: () => void }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="signUpBg w-[500px] h-auto p-6 rounded-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">알림</h2>
        <div>
          <AlarmList />
        </div>
      </div>
    </div>
  );
}

export default Modal;
