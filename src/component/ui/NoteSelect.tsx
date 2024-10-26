import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Receiver } from '@/interface/NoteInterface';

interface NoteSelectProps {
  data: Receiver[];
  onChange: (value: number) => void;
  value: number | null;
}

function NoteSelect({ data, onChange, value }: NoteSelectProps) {
  // onValueChange={onChange} value={value}
  return (
    <>
      <Select
        onValueChange={(value) => onChange(Number(value))}
        value={value?.toString() || ''}
      >
        <SelectTrigger id="category" className="w-full h-14">
          <SelectValue placeholder="카테고리를 선택해 주세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data.map((receiver) => (
              <SelectItem
                key={receiver.receiverId}
                value={receiver.receiverId.toLocaleString()}
              >
                {receiver.nickname}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default NoteSelect;
