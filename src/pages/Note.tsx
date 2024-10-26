import NoteList from '@/component/NoteList';
import ButtonProps from '@/component/ui/ButtonProps';
import NoteSendModal from '@/modal/NoteSendModal';
import { useState } from 'react';

function Note() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col gap-3">
      <ButtonProps
        size="sm"
        variant="custom"
        title="쪽지 쓰기"
        onClick={handleClick}
      />
      <NoteList />
      {isOpen && <NoteSendModal closeModal={handleCloseModal} />}
    </div>
  );
}

export default Note;
