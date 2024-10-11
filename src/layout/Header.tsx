import HomeLogo from '@/assets/HomeLogo.svg';
import Alarm from '@/assets/Alarm.svg';
import Message from '@/assets/Message.svg';
import { Link } from 'react-router-dom';
import { ModalPortal } from '@/lib/ModalPortal';
import { useState } from 'react';
import Modal from '@/modal/Modal';
import HeaderIcon from '@/component/ui/HeaderIcon';

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
          <HeaderIcon src={Alarm} alt="Alarm" onClick={openModal} />
          <HeaderIcon src={Message} alt="Message" />
        </div>
      </div>
      {isOpen && (
        <ModalPortal>
          <Modal closeModal={closeModal} />
        </ModalPortal>
      )}
    </header>
  );
}

export default Header;
