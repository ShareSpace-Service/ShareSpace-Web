import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function SelectProps() {
  return (
    <>
      <Select>
        <SelectTrigger className="w-full h-14">
          <SelectValue placeholder="카테고리를 선택해 주세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Large">Large</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Small">Small</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectProps;
