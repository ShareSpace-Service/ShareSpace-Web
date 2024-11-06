import { useMyPageStore } from '@/store/MyPageState';
import ButtonProps from '../ui/ButtonProps';

function ProfileEdit() {
  const { isEdit, setIsEdit } = useMyPageStore();

  const handleEditClick = () => {
    setIsEdit(true);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
  };

  return (
    <div className="flex items-center justify-end">
      {!isEdit && (
        <ButtonProps
          size="sm"
          variant="custom"
          title="수정"
          type="button"
          onClick={handleEditClick}
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
            onClick={handleCancelEdit}
          />
          <ButtonProps size="sm" variant="custom" title="저장" type="submit" />
        </div>
      )}
    </div>
  );
}

export default ProfileEdit;
