import { FormGroup } from '@/component/form/GuestRegistForm';
import { Input } from '@/components/ui/input';

import SelectProps from '../SelectProps';
import { Textarea } from '@/components/ui/textarea';
import { useProductRegisterStore } from '@/store/ProductRegister';

function FormField() {
  const {
    title,
    setTitle,
    category,
    setCategory,
    period,
    setPeriod,
    description,
    setDescription,
  } = useProductRegisterStore();
  return (
    <>
      {/* 제목 */}
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

      {/* 카테고리 */}
      <FormGroup label="카테고리" htmlFor="category">
        <SelectProps value={category} onChange={setCategory} />
      </FormGroup>

      {/* 대여기간 */}
      <FormGroup label="최대 보관 일수" htmlFor="rental-period">
        <Input
          type="number"
          id="rental-period"
          placeholder="최대 보관 일수를 입력해주세요"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        />
      </FormGroup>

      {/* 요청사항 */}
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

export default FormField;
