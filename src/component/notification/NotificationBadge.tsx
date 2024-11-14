/**
 * 읽지 않은 알림 개수를 표시하는 배지 컴포넌트
 * 
 * @component
 * @param {Object} props - 컴포넌트 props
 * @param {number} props.count - 표시할 알림 개수
 */
function NotificationBadge({ count }: { count: number }): JSX.Element | null {
  if (count <= 0) return null;

  return (
    <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
      {count > 99 ? '99+' : count}
    </div>
  );
}

export default NotificationBadge; 