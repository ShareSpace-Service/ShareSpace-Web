import { Link, useLocation } from 'react-router-dom';
import FooterIcon from '@/component/ui/FooterIcon';

function Footer() {
  const location = useLocation();
  return (
    <footer className="relative w-full h-[60px] sticky bottom-0 bg-white shadow-lg flex justify-around items-center z-10">
      <FooterIcon />
      {location.pathname !== '/productregist' &&
        location.pathname !== '/profile' &&
        location.pathname !== '/history' &&
        location.pathname !== '/question' && (
          <div className="bg-backColor absolute right-[1rem] bottom-[20px] w-[80px] h-[40px] rounded-b-full">
            <Link to="/productregist">
              <button className="absolute bottom-2 right-3 bg-blue-500 w-[56px] h-[56px] rounded-full font-bold text-white text-3xl flex justify-center items-center shadow-lg">
                +
              </button>
            </Link>
          </div>
        )}
    </footer>
  );
}

export default Footer;
