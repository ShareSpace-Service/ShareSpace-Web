import { fetchNoteDetail } from '@/api/Note';
import { ApiNoteDetailResponse } from '@/interface/NoteInterface';
import { formatDateTime } from '@/lib/DateFormat';
import { useQuery } from '@tanstack/react-query';

function NoteDetailModal({
  handleClose,
  noteId,
}: {
  handleClose: () => void;
  noteId: number;
}) {
  const { data } = useQuery<ApiNoteDetailResponse>({
    queryKey: ['noteDetail'],
    queryFn: () => fetchNoteDetail(noteId),
  });
  console.log('detail', data);
  const noteDetail = data?.data;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="signUpBg w-[500px] h-auto rounded-lg relative">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-2xl font-bold text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <div className="border-b border-solid border-gray-300 px-6 pt-6">
          <h2 className="text-2xl font-bold mb-3">{noteDetail?.title}</h2>
          <div className="flex gap-8 items-center pb-2">
            <p className="font-bold">보낸 사람</p>
            <p className="blueBg text-white font-bold px-2 py-1 rounded-full">
              {noteDetail?.sender}
            </p>
          </div>
          <p className="text-gray-600 text-sm font-bold mb-4">
            {noteDetail?.senderTime
              ? formatDateTime(noteDetail?.senderTime)
              : 'N/A'}
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-md">
          <p className="font-bold">{noteDetail?.content}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteDetailModal;
