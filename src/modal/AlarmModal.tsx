import { useEffect } from 'react';
import AlarmList from '@/component/AlarmList';
import { fetchReadAllNotifications } from '@/api/Notification';
import useNotificationStore from '@/store/NotificationStore';

function AlarmModal({ closeModal }: { closeModal: () => void }) {
  const { resetUnreadCount } = useNotificationStore();
  const handleClose = async () => {
    try {
      await fetchReadAllNotifications(); // 모든 알림 읽음 처리
      resetUnreadCount();
      closeModal();
    } catch (error) {
      console.error('알림 읽음 처리 실패:', error);
      closeModal();
    }
  };

  // Esc 버튼을 눌렀을 때 모달을 닫는 기능
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  // 모달 바깥쪽을 클릭했을 때 모달을 닫는 함수
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div className="signUpBg w-[500px] h-auto p-6 rounded-lg relative">
        <button
          onClick={handleClose}
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

export default AlarmModal;
