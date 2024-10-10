import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function SelectProps({
  value,
  onChange,
}: {
  value: string;
  onChange: (newValue: string) => void;
}) {
  return (
    <>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-full h-14">
          <SelectValue placeholder="카테고리를 선택해 주세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="LARGE">Large</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="SMALL">Small</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectProps;
