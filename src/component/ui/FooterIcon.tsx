import Product from '@/assets/Product.svg';
import Home from '@/assets/Home.svg';
import Profile from '@/assets/ProfileLogo.svg';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

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
  const { pathname } = useLocation();

  return (
    <div className="flex justify-center gap-10 h-full items-center">
      {icon.map((item) => {
        return (
          <Link
            to={item.Link}
            key={item.src}
            className="relative flex flex-col items-center"
          >
            <div
              className={clsx(
                'p-2 rounded-full transition-all duration-300',
                pathname === item.Link ? 'bg-gray-100' : 'hover:bg-gray-50'
              )}
            >
              <img
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className={clsx(
                  'cursor-pointer transition-transform duration-300',
                  {
                    'filter invert': pathname === item.Link,
                    'hover:filter hover:invert': pathname !== item.Link,
                  }
                )}
              />
            </div>
            {pathname === item.Link && (
              <div className="absolute -bottom-1 w-1.5 h-1.5 bg-black rounded-full" />
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default FooterIcon;
