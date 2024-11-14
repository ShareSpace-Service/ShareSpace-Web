import { Notification } from '@/interface/NotificationInterface';
import { formatTimeElapsed } from '@/lib/Formatter';

interface NotificationItemProps {
  notification: Notification;
  isDeleting: boolean;
  onDelete: (id: number) => Promise<void>;
}

/**
 * 개별 알림 항목을 표시하는 컴포넌트
 * 
 * @component
 * @param {Object} props - 컴포넌트 props
 * @param {Notification} props.notification - 표시할 알림 정보
 * @param {boolean} props.isDeleting - 현재 삭제 중인지 여부
 * @param {Function} props.onDelete - 알림 삭제 핸들러 함수
 */
function NotificationItem({ notification, isDeleting, onDelete }: NotificationItemProps): JSX.Element {
  return (
    <div
      className={`flex justify-between items-center rounded-xl shadow-lg hover:shadow-2xl 
        transition-all duration-300 ease-in-out w-full h-[80px] cursor-pointer mb-4 p-4 
        ${!notification.read ? 'bg-blue-50' : 'bg-white'}
        ${isDeleting ? 'transform translate-x-full opacity-0' : 'transform translate-x-0 opacity-100'}`}
      onClick={() => onDelete(notification.notificationId)}
    >
      <div className="flex items-center w-full">
        <UnreadDot isRead={notification.read} />
        <NotificationContent
          message={notification.message}
          timeElapsed={notification.timeElapsed}
          isRead={notification.read}
        />
      </div>
    </div>
  );
}

/**
 * 읽지 않은 알림을 표시하는 도트 컴포넌트
 */
function UnreadDot({ isRead }: { isRead: boolean }): JSX.Element | null {
  if (isRead) return null;
  
  return (
    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse" />
  );
}

interface NotificationContentProps {
  message: string;
  timeElapsed: number;
  isRead: boolean;
}

/**
 * 알림의 내용을 표시하는 컴포넌트
 */
function NotificationContent({ message, timeElapsed, isRead }: NotificationContentProps): JSX.Element {
  return (
    <div className="flex-1">
      <p className={`font-bold ${!isRead ? 'text-blue-900' : ''}`}>
        {message}
      </p>
      <p className="text-sm text-gray-500">
        {formatTimeElapsed(timeElapsed)}
      </p>
    </div>
  );
}

export default NotificationItem; 