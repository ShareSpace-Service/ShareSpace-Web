import HomeLogo from '@/assets/HomeLogo.svg';
import Message from '@/assets/Message.svg';
import { Link } from 'react-router-dom';
import { ModalPortal } from '@/lib/ModalPortal';
import { useState } from 'react';
import AlarmModal from '@/modal/AlarmModal';
import HeaderIcon from '@/component/ui/HeaderIcon';
import AlarmBox from '@/components/ui/alarmbox';

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <header className="h-[60px] shadow-lg w-full bg-white">
      <div className="flex items-center justify-between h-full px-8">
        <div>
          <Link to="/home">
            <img src={HomeLogo} alt="HomeLogo" />
          </Link>
        </div>
        <div className="flex gap-2">
          {/* NotificationBell 사용 */}
          <AlarmBox onClick={openModal} />
          <Link to="/message">
            <HeaderIcon src={Message} alt="Message" />
          </Link>
        </div>
      </div>
      {isOpen && (
        <ModalPortal>
          <AlarmModal closeModal={closeModal} />
        </ModalPortal>
      )}
    </header>
  );
}

export default Header;
