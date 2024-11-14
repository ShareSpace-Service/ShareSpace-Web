import { useNotificationSSE } from '@/hooks/notification/useNotificationSSE';
import { AlarmBoxProps } from '@/interface/NotificationInterface';
import Alarm from '@/assets/Alarm.svg';
import HeaderIcon from '@/component/ui/HeaderIcon';
import NotificationBadge from '@/component/notification/NotificationBadge';
import NotificationToast from '@/component/notification/NotificationToast';

/**
 * 알림 아이콘과 실시간 알림 토스트를 표시하는 컴포넌트
 * 
 * @component
 * @param {Object} props - 컴포넌트 props
 * @param {Function} props.onClick - 알림 아이콘 클릭 시 실행될 콜백 함수
 */
function AlarmBox({ onClick }: AlarmBoxProps): JSX.Element {
  const { hasNewNotification, latestNotification, isVisible, unreadCount } =
    useNotificationSSE();

  return (
    <div className="relative">
      <div className="relative">
        <HeaderIcon src={Alarm} alt="Alarm" onClick={onClick} />
        <NotificationBadge count={unreadCount} />
      </div>
      <NotificationToast
        isVisible={isVisible}
        hasNewNotification={hasNewNotification}
        message={latestNotification}
      />
    </div>
  );
}

export default AlarmBox;
