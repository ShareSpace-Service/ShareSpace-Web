import { registerUser } from '@/api/RegisterUser';
import {
  RegisterUserRequest,
  RegisterUserResponse,
  SignUpFormData,
} from '@/interface/AuthInterface';

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface UseRegisterOptions {
  onError?: (message: string) => void;
  role: string;
}

export function useRegister({ role, onError }: UseRegisterOptions) {
  const navigate = useNavigate();

  return useMutation<RegisterUserResponse, Error, SignUpFormData>({
    mutationFn: (userData) => {
      const requestData: RegisterUserRequest = {
        ...userData,
        role,
      };
      return registerUser(requestData);
    },
    onSuccess: (response) => {
      const userId = response.data.userId;
      navigate('/emailVerify', { state: { userId, role } });
    },
    onError: (error: any) => {
      const errorMessage = error.MESSAGE || '알수 없는 오류가 발생했습니다!';
      onError?.(errorMessage);
    },
  });
}
