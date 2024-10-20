import ButtonProps from '@/component/ui/ButtonProps';
import { Link } from 'react-router-dom';

function GuestPlaceChoice({
  title,
  productId,
}: {
  title: string;
  productId: number | null;
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="signUpBg w-[500px] h-[300px] p-6 rounded-lg relative">
        <div className="flex flex-col h-full justify-around">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center">
              장소 선택을 지금 하시겠습니까?
            </h2>
            <p className="text-gray-300 font-bold text-center">{title}</p>
          </div>
          <div className="flex items-center gap-3 justify-around">
            <Link to={`/place/${productId}`}>
              <ButtonProps title="네" size="check" variant="custom" />
            </Link>
            <Link to="/home">
              <ButtonProps title="아니요" size="check" variant="custom" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestPlaceChoice;
