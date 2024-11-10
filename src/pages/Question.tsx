import QuestionForm from '@/component/form/QuestionForm';

function Question({ title }: { title: string }) {
  return (
    <>
      <div className="w-full pb-5">
        <h2 className="font-bold text-lg">{title}</h2>
      </div>
      <QuestionForm />
    </>
  );
}

export default Question;
