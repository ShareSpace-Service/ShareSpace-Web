import { Input } from '@/components/ui/input';
import { FormGroup } from './GuestRegistForm';
import { Textarea } from '@/components/ui/textarea';
import NoteSelect from '../ui/NoteSelect';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  ApiNoteReceiverResponse,
  NoteSendRequest,
} from '@/interface/NoteInterface';
import { fetchNoteReceiver, fetchNoteSend } from '@/api/Note';
import { useState } from 'react';
import ButtonProps from '../ui/ButtonProps';

function NoteSendForm() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [receiverId, setReceiverId] = useState<number | null>(null);

  const { data } = useQuery<ApiNoteReceiverResponse>({
    queryKey: ['noteReceiver'],
    queryFn: fetchNoteReceiver,
  });
  console.log('receiver', data);

  const mutation = useMutation<NoteSendRequest, Error, NoteSendRequest>({
    mutationFn: (noteData: NoteSendRequest) => fetchNoteSend(noteData),
    onSuccess: (data) => {
      console.log('Note sent successfully:', data);
      setReceiverId(null);
      setTitle('');
      setContent('');
    },
    onError: (error) => {
      console.error('Error sending note:', error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!receiverId) {
      alert('받는 사람을 선택해 주세요.');
      return;
    }
    if (!title || !content) {
      alert('제목과 내용을 입력해 주세요.');
      return;
    }

    if (title.length > 50) {
      alert('제목은 50자 이내로 작성해주세요');
      return;
    }

    const payload: NoteSendRequest = {
      receiverId: receiverId!,
      title: title,
      content: content,
    };

    mutation.mutate(payload);

    setTitle('');
    setContent('');
  };

  return (
    <div>
      <form className="space-y-6 h-full" onSubmit={handleSubmit}>
        {/* 받는 사람 */}
        <FormGroup label="받는 사람" htmlFor="receiver">
          <NoteSelect
            data={data?.data || []}
            onChange={setReceiverId}
            value={receiverId}
          />
        </FormGroup>
        {/* 제목 */}
        <FormGroup label="제목" htmlFor="title">
          <Input
            type="text"
            id="title"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        {/* 내용 */}
        <FormGroup label="내용" htmlFor="content">
          <Textarea
            id="content"
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="whitespace-pre-wrap"
          />
        </FormGroup>
        <ButtonProps type="submit" size="full" variant="custom" title="전송" />
      </form>
    </div>
  );
}

export default NoteSendForm;
