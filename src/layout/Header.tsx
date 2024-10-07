import HomeLogo from '@/assets/HomeLogo.svg';
import Alarm from '@/assets/Alarm.svg';
import Message from '@/assets/Message.svg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="h-[60px] w-full">
      <div className="flex items-center justify-between h-full px-4">
        <div>
          <Link to="/home">
            <img src={HomeLogo} alt="HomeLogo" />
          </Link>
        </div>
        <div className="flex gap-2">
          <img src={Alarm} alt="Alarm" width={28} height={28} />
          <img src={Message} alt="Message" width={28} height={28} />
        </div>
      </div>
    </header>
  );
}

export default Header;
