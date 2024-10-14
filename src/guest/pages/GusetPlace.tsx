import PlaceList from '@/component/PlaceList';
import Address from '@/component/ui/Address';
import { useParams } from 'react-router-dom';

function GusetPlace() {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const productId = Number(id);
  console.log('productId', productId);
  // URL 파라미터로 전달받은 값을 productId로 사용
  // number 타입으로 변환

  return (
    <div>
      <Address />
      <PlaceList productId={productId} />
    </div>
  );
}

export default GusetPlace;
