import PlaceList from '@/component/PlaceList';
import Address from '@/component/ui/Address';
import { useLocation } from 'react-router-dom';

function GuestPlace() {
  // URL 파라미터로 전달받은 값을 productId로 사용
  // number 타입으로 변환

  const location = useLocation();
  const matchingId = location.state?.matchingId;

  console.log('matchingId', matchingId);

  return (
    <div>
      <Address />
      <PlaceList matchingId={matchingId} />
    </div>
  );
}

export default GuestPlace;
