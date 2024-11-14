import HistoryList from '@/component/HistoryList';

function History({ title }: { title: string }) {
  return (
    <>
      <div className="w-full pb-5">
        <h2 className="font-bold text-lg">{title}</h2>
      </div>
      <HistoryList />
    </>
  );
}

export default History;
