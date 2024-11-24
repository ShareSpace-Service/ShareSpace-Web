import { useEffect, useState } from 'react';
import AlarmList from '@/component/notification/AlarmList';
import {
  fetchReadAllNotifications,
  fetchDeleteAllNotifications,
} from '@/api/Notification';
import useNotificationStore from '@/store/NotificationStore';

function AlarmModal({ closeModal }: { closeModal: () => void }) {
  const { resetUnreadCount } = useNotificationStore();
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  const handleClose = async () => {
    try {
      await fetchReadAllNotifications();
      resetUnreadCount();
      closeModal();
    } catch (error) {
      // console.error('알림 읽음 처리 실패:', error);
      closeModal();
    }
  };

  const handleDeleteAll = async () => {
    try {
      setIsDeletingAll(true); // 삭제 애니메이션 시작

      // 애니메이션을 위한 지연
      setTimeout(async () => {
        await fetchDeleteAllNotifications();
        resetUnreadCount();
        setIsDeletingAll(false);
      }, 500); // 애니메이션 시간과 맞춤
    } catch (error) {
      // console.error('알림 전체 삭제 실패:', error);
      setIsDeletingAll(false);
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">알림</h2>
          <div className="flex gap-2">
            <button
              onClick={handleDeleteAll}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              disabled={isDeletingAll}
            >
              모두 삭제
            </button>
            <button
              onClick={handleClose}
              className="text-xl font-bold text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
          </div>
        </div>
        <div>
          <AlarmList isDeletingAll={isDeletingAll} />
        </div>
      </div>
    </div>
  );
}

export default AlarmModal;
