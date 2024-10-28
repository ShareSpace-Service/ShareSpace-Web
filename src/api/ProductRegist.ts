import { RegistResponse } from '@/interface/ProductRegistInterface';
import { fetchWithToken } from './Request';

export async function RegistProduct(
  formData: FormData
): Promise<RegistResponse> {
  const response = await fetchWithToken(
    'http://localhost:8080/product/register',
    {
      method: 'POST',
      body: formData,
    }
  );
  const result: RegistResponse = await response.json();
  if (response.ok && result.success) {
    console.log('등록 성공', result.message);
    return result;
  } else {
    throw new Error(result.message || '등록 실패');
  }
}

// return responseData as RegisterResponse;
