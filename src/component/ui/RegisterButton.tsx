// 새로운 파일 생성
import { Link } from 'react-router-dom';

function RegisterButton() {
  return (
    <div className="bg-backColor absolute right-[1rem] bottom-[20px] w-[80px] h-[40px] rounded-b-full">
      <Link to="/productregist">
        <button className="absolute bottom-2 right-3 bg-blue-500 w-[56px] h-[56px] rounded-full font-bold text-white text-3xl flex justify-center items-center shadow-lg">
          +
        </button>
      </Link>
    </div>
  );
}

export default RegisterButton;
