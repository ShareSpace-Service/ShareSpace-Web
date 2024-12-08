import { RegistResponse } from '@/interface/ProductRegistInterface';
import { fetchWithToken } from './Request';
import config from '@/config/config';

export async function RegistProduct(
  formData: FormData
): Promise<RegistResponse> {
  const response = await fetchWithToken(`${config.baseUrl}/product/register`, {
    method: 'POST',
    body: formData,
  });
  const result: RegistResponse = await response.json();
  if (response.ok && result.success) {
    return result;
  } else {
    throw new Error(result.message || '등록 실패');
  }
}
