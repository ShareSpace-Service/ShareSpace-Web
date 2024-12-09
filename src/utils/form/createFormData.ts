import { FormState } from '@/store/ProductRegister';

type CreateFormDataParams = Pick<
  FormState,
  'title' | 'category' | 'period' | 'description'
> & {
  files: File[];
};

export const createProductFormData = ({
  title,
  category,
  period,
  description,
  files,
}: CreateFormDataParams): FormData => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('category', category);
  formData.append('period', period);
  description && formData.append('description', description);
  files.forEach((file) => formData.append('imageUrl', file));

  return formData;
};
