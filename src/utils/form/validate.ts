import { FormState } from '@/store/ProductRegister';

type ProductValidation = Pick<
  FormState,
  'title' | 'category' | 'period' | 'description'
>;

export const validateProduct = ({
  title,
  category,
  period,
  description,
}: ProductValidation): string | null => {
  if (!title || !category || !period) {
    return '항목을 입력해주세요.';
  }

  if (title.length > 50) {
    return '제목은 50자 이내로 작성해주세요.';
  }

  if (description.length > 100) {
    return '요청사항은 100자 이내로 작성해주세요';
  }

  return null;
};
