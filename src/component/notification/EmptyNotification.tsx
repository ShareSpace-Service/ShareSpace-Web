/**
 * 알림이 없을 때 표시되는 컴포넌트
 * 
 * @component
 */
function EmptyNotification(): JSX.Element {
  return (
    <p className="text-center text-gray-500 py-4">
      알림이 없습니다.
    </p>
  );
}

export default EmptyNotification; 