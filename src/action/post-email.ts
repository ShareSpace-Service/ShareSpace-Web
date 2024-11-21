import { validateEmail } from '@/api/RegisterUser';
import { ApiUpdateResponse } from '@/interface/MyPageInterface';
import { useMutation } from '@tanstack/react-query';

export function useEmailVerification(userId: number) {
  return useMutation<ApiUpdateResponse, ApiUpdateResponse, number>({
    mutationFn: (validationNumber: number) => {
      const request = {
        userId,
        validationNumber,
      };
      return validateEmail(request);
    },
  });
}
