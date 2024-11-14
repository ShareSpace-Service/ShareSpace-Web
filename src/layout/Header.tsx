import HomeLogo from '@/assets/HomeLogo.svg';
import { Link } from 'react-router-dom';
import { ModalPortal } from '@/lib/ModalPortal';
import { useState } from 'react';
import AlarmModal from '@/modal/AlarmModal';
import AlarmBox from '@/component/notification/AlarmBox';
import NoteIcon from '@/component/note/NoteIcon';

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
          <AlarmBox onClick={openModal} />
          <NoteIcon />
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
