import { fetchMatchingProducts } from '@/api/Matching';
import { Matching } from '@/interface/MatchingInterface';
import { useQuery } from '@tanstack/react-query';

export function useHostMatching() {
  const {
    data: allData,
    isLoading,
    error,
  } = useQuery<Matching, Error>({
    queryKey: ['matching'],
    queryFn: fetchMatchingProducts,
  });
  return {
    data: allData,
    isLoading,
    error,
  };
}
