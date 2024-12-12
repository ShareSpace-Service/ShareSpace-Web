import { usePlaceEdit } from '@/action/get-editPlace';
import HostEditForm from '@/component/form/HostEditForm';
import PageTitle from '@/component/text/PageTitle';

function PlaceEdit({ title }: { title: string }) {
  const { data } = usePlaceEdit(); // 1. 장소 정보 조회

  return (
    <>
      <PageTitle title={title} />
      {data && <HostEditForm data={data} />}
    </>
  );
}

export default PlaceEdit;
