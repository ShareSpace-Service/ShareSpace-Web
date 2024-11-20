import { useState } from 'react';
import { FormGroup } from './GuestRegistForm';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { QuestionPost } from '@/interface/QuestionInterface';
import { useMutation } from '@tanstack/react-query';
import { fetchQuestionPost } from '@/api/Question';
import ButtonProps from '../ui/ButtonProps';

function QuestionForm() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const mutation = useMutation<QuestionPost, Error, QuestionPost>({
    mutationKey: ['question'],
    mutationFn: (payload: QuestionPost) => fetchQuestionPost(payload),
    onSuccess: (data) => {
      console.log('문의하기 성공:', data);
    },
    onError: (error) => {
      console.error('문의하기 실패:', error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 기본 이벤트 방지

    if (!title || !content) {
      // 제목과 내용이 빈 값인 경우
      alert('제목과 내용을 입력해주세요');
      return;
    }

    if (title.length > 50) {
      alert('제목은 50자 이내로 작성해주세요');
      return;
    }

    if (content.length > 200) {
      alert('내용은 최대 200자 이내로 작성해주세요');
      return;
    }

    const payload: QuestionPost = {
      // QuestionPost 타입의 payload 객체 생성
      title: title,
      content: content,
    };

    mutation.mutate(payload); // mutate 호출로 문의하기 요청

    setTitle('');
    setContent('');
    // 제출 후 제목과 내용 초기화
  };

  return (
    <>
      <div className="w-full pt-5 flex justify-center">
        <h2 className="font-bold text-3xl">문의하기</h2>
      </div>
      <div className="flex flex-col h-full">
        <form className="space-y-6 h-full" onSubmit={handleSubmit}>
          <FormGroup label="제목" htmlFor="title">
            <Input
              type="text"
              id="title"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup label="내용" htmlFor="content">
            <Textarea
              id="content"
              placeholder="내용을 입력해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="h-96"
              maxLength={200}
            />
          </FormGroup>
          <ButtonProps
            type="submit"
            size="full"
            variant="custom"
            title="등록하기"
          />
        </form>
      </div>
    </>
  );
}

export default QuestionForm;
