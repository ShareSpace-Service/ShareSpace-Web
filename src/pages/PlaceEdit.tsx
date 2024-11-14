import { fetchPlaceEdit } from '@/api/Place';
import HostEditForm from '@/component/form/HostEditForm';
import { PlaceEditData } from '@/interface/PlaceInterface';
import { usePlaceEditStore } from '@/store/PlaceEdit';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

function PlaceEdit({ title }: { title: string }) {
  const { setFormData, setCurrentImage, setOriginalData, setOriginalImage } =
    usePlaceEditStore();

  // 1. 장소 수정 정보를 불러오는 API를 호출한다.
  const { data } = useQuery<PlaceEditData>({
    queryKey: ['placeEdit'],
    queryFn: fetchPlaceEdit,
  });

  // 2. 불러온 장소 정보를 formData에 저장한다.
  useEffect(() => {
    if (data) {
      const formattedData = {
        title: data.title,
        location: data.location,
        category: data.category,
        period: data.period,
        description: data.description,
        deleteImageUrl: [],
        newImageUrl: [],
      };
      setFormData(formattedData);
      setOriginalData(formattedData);
      setCurrentImage(data.imageUrl);
      setOriginalImage(data.imageUrl);
    }
  }, [data, setFormData, setOriginalData, setOriginalImage, setOriginalImage]);
  return (
    <>
      <div className="w-full pb-5">
        <h2 className="font-bold text-lg">{title}</h2>
      </div>
      <HostEditForm />
    </>
  );
}

export default PlaceEdit;
