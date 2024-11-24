import QuestionForm from '@/component/form/QuestionForm';
import { QuestionFormProps } from '@/interface/QuestionInterface';

function Question({ title, setView }: QuestionFormProps) {
  return (
    <>
      <div className="w-full pb-5">
        <h2 className="font-bold text-lg">{title}</h2>
      </div>
      <QuestionForm setView={setView} />
    </>
  );
}

export default Question;
