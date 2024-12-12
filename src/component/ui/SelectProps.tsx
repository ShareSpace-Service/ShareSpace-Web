import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectProps {
  value: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
  className: string;
}

function SelectProps({ value, onChange, disabled, className }: SelectProps) {
  return (
    <>
      <Select onValueChange={onChange} value={value} disabled={disabled}>
        <SelectTrigger
          id="category"
          className={`w-full h-14 ${className || ''}`}
        >
          <SelectValue placeholder="카테고리를 선택해 주세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="LARGE">LARGE</SelectItem>
            <SelectItem value="MEDIUM">MEDIUM</SelectItem>
            <SelectItem value="SMALL">SMALL</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectProps;
