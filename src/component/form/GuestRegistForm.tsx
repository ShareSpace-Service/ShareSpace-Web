import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ButtonProps from '../ui/ButtonProps';
import SelectProps from '../ui/SelectProps';

function FormGroup({
  children,
  label,
  htmlFor,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid w-full items-center gap-2">
      <Label htmlFor={htmlFor} className="text-start font-bold text-base">
        {label}
      </Label>
      {children}
    </div>
  );
}

function GuestRegistForm() {
  return (
    <div className="flex flex-col h-full">
      <form className="space-y-6">
        {/* 파일 선택 */}
        <div>
          <Input type="file" multiple />
        </div>

        {/* 제목 */}
        <FormGroup label="제목" htmlFor="title">
          <Input type="text" id="title" placeholder="제목" />
        </FormGroup>

        {/* 카테고리 */}
        <FormGroup label="카테고리" htmlFor="category">
          <SelectProps />
        </FormGroup>

        {/* 대여기간 */}
        <FormGroup label="대여기간" htmlFor="rental-period">
          <Input
            type="number"
            id="rental-period"
            placeholder="대여기간을 입력해주세요"
          />
        </FormGroup>

        {/* 요청사항 */}
        <FormGroup label="요청사항" htmlFor="request">
          <Textarea id="request" placeholder="요청사항을 입력해주세요" />
        </FormGroup>

        {/* onSubmit */}
        <div className="mt-6 pt-4">
          <ButtonProps size="full" variant="custom" title="등록하기" />
        </div>
      </form>
    </div>
  );
}

export default GuestRegistForm;
