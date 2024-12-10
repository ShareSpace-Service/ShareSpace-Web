import { userLogout } from '@/api/Login';
import { LogoutResponse } from '@/interface/AuthInterface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<LogoutResponse, Error>({
    mutationFn: () => userLogout(),
    onSuccess: async (result) => {
      if (result.success) {
        queryClient.clear();
        localStorage.clear();
        sessionStorage.clear();
        navigate('/login', { replace: true });
      } else {
        alert(result.message);
      }
    },
    onError: (error) => {
      alert(error);
    },
  });
};
