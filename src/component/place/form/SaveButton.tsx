import ButtonProps from '@/component/ui/ButtonProps';
import { useEditHandler } from '@/hooks/place/usePlaceForm';

function SaveButton() {
  const { isEdit } = useEditHandler();

  return (
    <>
      {isEdit && (
        <ButtonProps
          size="full"
          variant="custom"
          title="저장하기"
          type="submit"
        />
      )}
    </>
  );
}

export default SaveButton;
