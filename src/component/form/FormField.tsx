import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormState } from '@/store/ProductRegister';
import SelectProps from '../ui/SelectProps';
import { FormGroup } from './FormGroup';

type ProductFormFieldsProps = Pick<
  FormState,
  | 'title'
  | 'setTitle'
  | 'category'
  | 'setCategory'
  | 'period'
  | 'setPeriod'
  | 'description'
  | 'setDescription'
>;

export function FormField({
  title,
  setTitle,
  category,
  setCategory,
  period,
  setPeriod,
  description,
  setDescription,
}: ProductFormFieldsProps) {
  return (
    <>
      <FormGroup label="제목" htmlFor="title">
        <Input
          type="text"
          id="title"
          placeholder="제목"
          value={title}
          maxLength={50}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormGroup>

      <FormGroup label="카테고리" htmlFor="category">
        <SelectProps value={category} onChange={setCategory} />
      </FormGroup>

      <FormGroup label="대여기간" htmlFor="rental-period">
        <Input
          type="number"
          id="rental-period"
          placeholder="대여기간을 입력해주세요"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        />
      </FormGroup>

      <FormGroup label="요청사항" htmlFor="request">
        <Textarea
          id="request"
          placeholder="요청사항을 입력해주세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={100}
          rows={5}
        />
      </FormGroup>
      <div className="flex justify-end -space-y-0 -translate-y-5">
        <span className="text-gray-400 text-sm">
          {description.length} / 100
        </span>
      </div>
    </>
  );
}
