import { fetchNoteList } from '@/api/Note';
import { ApiNoteResponse } from '@/interface/NoteInterface';
import { ModalPortal } from '@/lib/ModalPortal';
import NoteDetailModal from '@/modal/NoteDetailModal';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

function NoteList() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [noteId, setNoteId] = useState<number | null>(null);

  const { data } = useQuery<ApiNoteResponse>({
    queryKey: ['notes'],
    queryFn: fetchNoteList,
  });
  console.log('data', data);

  const handleOpen = (noteId: number) => {
    setIsOpen(true);
    setNoteId(noteId);
  };
  const handleClose = () => {
    setIsOpen(false);
    setNoteId(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {data?.data.map((note) => (
        <div
          key={note.noteId}
          className="flex flex-col rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-[180px] cursor-pointer"
          onClick={() => handleOpen(note.noteId)}
        >
          <div className="signUpBg w-full h-auto relative">
            <button className="absolute top-3 right-3 text-3xl font-bold text-gray-600 hover:text-gray-800">
              &times;
            </button>
          </div>
          <div className="flex flex-col justify-center gap-3 h-full pl-4">
            <h2 className="font-extrabold text-xl">{note.title}</h2>
            <p className="font-bold">발신자 : {note.sender}</p>
            <div>
              <p>내용 : {note.content}</p>
            </div>
          </div>
        </div>
      ))}
      {isOpen && (
        <ModalPortal>
          {noteId !== null && (
            <NoteDetailModal handleClose={handleClose} noteId={noteId} />
          )}
        </ModalPortal>
      )}
    </div>
  );
}
export default NoteList;
