import { fetchHistory } from '@/api/History';
import { ApiResponse } from '@/interface/HistoryInterface';
import { useQuery } from '@tanstack/react-query';

export const useHistory = () =>
  useQuery<ApiResponse>({
    queryKey: ['history'],
    queryFn: fetchHistory,
  });
