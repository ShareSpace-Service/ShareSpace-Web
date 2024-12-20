import { fetchMatchingCheck, fetchMatchingDashBoard } from '@/api/Matching';
import {
  MatchingCheck,
  MatchingListResponse,
} from '@/interface/MatchingInterface';
import { useRoleStore } from '@/store/Role';
import { useQuery } from '@tanstack/react-query';

// 호스트 대시보드 항목별 개수 조회
export function useMatchingCount() {
  const { role } = useRoleStore();

  return useQuery<MatchingCheck>({
    queryKey: ['matchingCheck'],
    queryFn: fetchMatchingCheck,
    refetchInterval: 30000, // 30초마다 갱신
    staleTime: 10000, // 10초 동안은 캐시된 데이터 사용
    enabled: role === 'HOST',
  });
}

// 호스트 대시보드 반납 예정 물품 조회
export function useMatchingDashboard() {
  const { role } = useRoleStore();

  return useQuery<MatchingListResponse>({
    queryKey: ['matchingsList'],
    queryFn: fetchMatchingDashBoard,
    enabled: role === 'HOST',
  });
}
