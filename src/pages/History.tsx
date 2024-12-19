import HistoryList from '@/component/HistoryList';
import PageTitle from '@/component/text/PageTitle';

function History({ title }: { title: string }) {
  return (
    <>
      <PageTitle title={title} />
      <HistoryList />
    </>
  );
}

export default History;
