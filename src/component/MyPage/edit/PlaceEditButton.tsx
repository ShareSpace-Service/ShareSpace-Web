import ButtonProps from '@/component/ui/ButtonProps';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEditHandler } from '@/hooks/place/usePlaceForm';
import { useImageHandler } from '@/hooks/place/usePlaceImage';

function PlaceEditButton() {
  const { isEdit, handleEditClick, handleCancelClick } = useEditHandler();
  const { handleImageAdd } = useImageHandler();
  return (
    <div className="flex items-center justify-end gap-3">
      {isEdit && (
        <>
          <Label className="font-bold text-lg bg-baseColor hover:bg-baseColor/90 px-3 py-1 rounded-md text-white cursor-pointer transition-colors">
            <Input
              type="file"
              accept=".jpeg, .png"
              multiple
              className="hidden"
              onChange={handleImageAdd}
            />
            이미지 추가
          </Label>
          <ButtonProps
            size="sm"
            variant="custom"
            title="취소"
            type="button"
            onClick={handleCancelClick}
          />
        </>
      )}
      {!isEdit && (
        <ButtonProps
          size="sm"
          variant="custom"
          title="수정"
          type="button"
          onClick={handleEditClick}
        />
      )}
    </div>
  );
}

export default PlaceEditButton;
