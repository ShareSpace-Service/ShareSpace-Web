import { fetchProfile, fetchProfileUpdate } from '@/api/UserProfile';
import { ApiResponse, ApiUpdateResponse } from '@/interface/MyPageInterface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useProfile() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  const updateProfile = useMutation<ApiUpdateResponse, Error, FormData>({
    mutationFn: (formData: FormData) => fetchProfileUpdate(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['address'] });
      alert('프로필 수정이 완료되었습니다!');
    },
    onError: () => {
      alert('프로필 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
  });

  return {
    data,
    isLoading,
    updateProfile,
  };
}
