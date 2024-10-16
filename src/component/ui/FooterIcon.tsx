import Product from '@/assets/Product.svg';
import Home from '@/assets/Home.svg';
import Profile from '@/assets/ProfileLogo.svg';
import { Link } from 'react-router-dom';

interface FooterIconProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  Link: string;
}

const icon: FooterIconProps[] = [
  {
    src: Product,
    alt: 'Product',
    width: 28,
    height: 28,
    Link: '/product',
  },
  {
    src: Home,
    alt: 'Home',
    width: 28,
    height: 28,
    Link: '/home',
  },
  {
    src: Profile,
    alt: 'Profile',
    width: 28,
    height: 28,
    Link: '/profile',
  },
];

function FooterIcon() {
  return (
    <div className="flex justify-center gap-10 h-full items-center">
      {icon.map((item) => {
        return (
          <Link to={item.Link} key={item.src}>
            <img
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="cursor-pointer hover:filter hover:invert transition-transform duration-300"
            />
          </Link>
        );
      })}
    </div>
  );
}

export default FooterIcon;
