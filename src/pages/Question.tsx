import QuestionForm from '@/component/form/QuestionForm';
import PageTitle from '@/component/text/PageTitle';
import { QuestionFormProps } from '@/interface/QuestionInterface';

function Question({ title, setView }: QuestionFormProps) {
  return (
    <>
      {title && <PageTitle title={title} />}
      <QuestionForm setView={setView} />
    </>
  );
}

export default Question;
