import PlaceList from '@/component/PlaceList';
import Address from '@/component/ui/Address';
import { useLocation, useParams } from 'react-router-dom';

function GuestPlace() {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const productId = Number(id);
  // URL 파라미터로 전달받은 값을 productId로 사용
  // number 타입으로 변환

  const location = useLocation();
  const matchingId = location.state?.matchingId;

  console.log('productId', productId);
  console.log('matchingId', matchingId);

  return (
    <div>
      <Address />
      <PlaceList productId={productId} matchingId={matchingId} />
    </div>
  );
}

export default GuestPlace;
