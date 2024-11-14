import { BellIcon } from '@/component/notification/NotificationIcons';

interface NotificationToastProps {
  isVisible: boolean;
  hasNewNotification: boolean;
  message: string;
}

/**
 * 새로운 알림을 토스트 형태로 표시하는 컴포넌트
 * 
 * @component
 * @param {Object} props - 컴포넌트 props
 * @param {boolean} props.isVisible - 토스트의 표시 여부
 * @param {boolean} props.hasNewNotification - 새로운 알림 존재 여부
 * @param {string} props.message - 표시할 알림 메시지
 */
function NotificationToast({ isVisible, hasNewNotification, message }: NotificationToastProps): JSX.Element {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center pointer-events-none overflow-hidden">
      <div
        className={`bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
          border border-blue-600 shadow-lg rounded-b-lg px-6 py-4 mt-0 max-w-md 
          transform transition-all duration-700 ease-in-out`}
        style={{
          transform: `translateY(${isVisible ? '0' : '-100%'})`,
          opacity: hasNewNotification ? '1' : '0',
          pointerEvents: 'none',
          position: 'relative',
          top: 0,
        }}
      >
        <div className="flex items-center space-x-3">
          <BellIcon />
          <div className="flex-1">
            <p className="text-sm font-bold tracking-wide">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationToast; 