import { validateEmail } from '@/api/RegisterUser';
import { EmailResponse } from '@/interface/Email';
import { ApiUpdateResponse } from '@/interface/MyPageInterface';
import { useMutation } from '@tanstack/react-query';

export function useEmailVerification(userId: number) {
  return useMutation<EmailResponse, ApiUpdateResponse, number>({
    mutationFn: (validationNumber: number) => {
      const request = {
        userId,
        validationNumber,
      };
      return validateEmail(request);
    },
  });
}
