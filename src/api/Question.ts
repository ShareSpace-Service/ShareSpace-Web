import { QuestionPost } from '@/interface/QuestionInterface';
import { fetchWithToken } from './Request';
import config from '@/config/config';

export async function fetchQuestionPost(payload: QuestionPost) {
  const response = await fetchWithToken(`${config.baseUrl}/contact`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  if (response.ok && result.success) {
    console.log('문의하기 성공', result.message);
    return result;
  } else {
    throw new Error(result.message || '실패');
  }
}
