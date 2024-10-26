import { fetchNoteDelete, fetchNoteList } from '@/api/Note';
import { ApiNoteResponse } from '@/interface/NoteInterface';
import { ModalPortal } from '@/lib/ModalPortal';
import NoteDetailModal from '@/modal/NoteDetailModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

function NoteList() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [noteId, setNoteId] = useState<number | null>(null);
  const [noteList, setNoteList] = useState<ApiNoteResponse['data']>([]);

  const { data } = useQuery<ApiNoteResponse>({
    queryKey: ['notes'],
    queryFn: fetchNoteList,
  });

  useEffect(() => {
    if (data) {
      setNoteList(data.data);
    }
  }, [data]);
  console.log('data', data);

  const mutation = useMutation<{ noteId: number }, unknown, { noteId: number }>(
    {
      mutationFn: ({ noteId }) => fetchNoteDelete(noteId),
      onSuccess: (_, { noteId }) => {
        setNoteList((prev) => prev.filter((note) => note.noteId !== noteId));
      },
    }
  );

  const handleOpen = (noteId: number) => {
    setIsOpen(true);
    setNoteId(noteId);
  };
  const handleClose = () => {
    setIsOpen(false);
    setNoteId(null);
  };

  const handleDelete = (noteId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    mutation.mutate({ noteId });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {noteList.map((note) => (
        <div
          key={note.noteId}
          className="flex flex-col rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-[180px] cursor-pointer"
          onClick={() => handleOpen(note.noteId)}
        >
          <div className="signUpBg w-full h-auto relative">
            <button
              onClick={(event) => handleDelete(note.noteId, event)}
              className="absolute top-3 right-3 text-3xl font-bold text-gray-600 hover:text-gray-800"
            >
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
