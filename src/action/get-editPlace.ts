import { fetchPlaceEdit } from '@/api/Place';
import { PlaceEditData } from '@/interface/PlaceInterface';
import { useQuery } from '@tanstack/react-query';

export function usePlaceEdit() {
  const { data } = useQuery<PlaceEditData>({
    queryKey: ['placeEdit'],
    queryFn: fetchPlaceEdit,
  });

  return {
    data,
  };
}
