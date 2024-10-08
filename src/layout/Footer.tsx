import Product from '@/assets/Product.svg';
import Home from '@/assets/Home.svg';
import Profile from '@/assets/ProfileLogo.svg';
import { Link, useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  return (
    <footer className="relative w-full h-[60px] sticky bottom-0 bg-white shadow-lg flex justify-around items-center rounded-t-xl z-10">
      <div className="flex justify-center gap-10 h-full items-center">
        <img src={Product} alt="Product" width={28} height={28} />
        <img src={Home} alt="Home" width={28} height={28} />
        <img src={Profile} alt="Profile" width={28} height={28} />
      </div>
      {location.pathname !== '/productregist' && (
        <div className="bg-backColor fixed right-[37rem] bottom-[20px] w-[80px] h-[40px] rounded-b-full">
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
