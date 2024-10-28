import QuestionForm from '@/component/form/QuestionForm';

function Question() {
  return (
    <>
      <div className="w-full pb-5">
        <h2 className="font-bold text-base">문의하기</h2>
      </div>
      <QuestionForm />
    </>
  );
}

export default Question;