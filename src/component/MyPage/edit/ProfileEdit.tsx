import ButtonProps from '@/component/ui/ButtonProps';

interface ProfileEditProps {
  isEdit: boolean;
  onEditClick: () => void;
  onCancelClick: () => void;
}

function ProfileEdit({ isEdit, onEditClick, onCancelClick }: ProfileEditProps) {
  return (
    <div className="flex items-center justify-end">
      {!isEdit && (
        <ButtonProps
          size="sm"
          variant="custom"
          title="수정"
          type="button"
          onClick={onEditClick}
        />
      )}
      {/* 수정 버튼 클릭시 저장 , 취소 버튼 등장 */}
      {isEdit && (
        <div className="flex gap-3">
          <ButtonProps
            size="sm"
            variant="custom"
            title="취소"
            type="button"
            onClick={onCancelClick}
          />
          <ButtonProps size="sm" variant="custom" title="저장" type="submit" />
        </div>
      )}
    </div>
  );
}

export default ProfileEdit;
