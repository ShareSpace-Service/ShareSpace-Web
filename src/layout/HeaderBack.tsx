import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function HeaderBack() {
  const navigate: NavigateFunction = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  return (
    <div className="h-[60px] w-full bg-blue flex items-center">
      <AiOutlineArrowLeft
        className="ml-2 text-2xl font-bold cursor-pointer hover:text-gray-500 transition-colors duration-200"
        onClick={handleClick}
      />
    </div>
  );
}

export default HeaderBack;
