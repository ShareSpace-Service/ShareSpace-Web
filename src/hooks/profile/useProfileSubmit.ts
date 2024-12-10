import { useProfile } from '@/action/put-updateProfile';
import { useMyPageStore } from '@/store/MyPageState';

// 폼 제출 로직만 담당
export function useProfileSubmit() {
  const { formData, isEdit, image, setIsEdit } = useMyPageStore();
  const { updateProfile } = useProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !isEdit) return;

    const submitData = new FormData();
    submitData.append('nickName', formData.nickName);
    submitData.append('location', formData.location);
    if (image) {
      submitData.append('image', image);
    }

    if (!validateNickname(formData.nickName)) {
      alert('닉네임은 2자 이상 50자 이내로 작성해주세요.');
      return;
    }

    updateProfile.mutate(submitData);
    setIsEdit(false);
  };

  return { handleSubmit };
}

function validateNickname(nickname: string): boolean {
  return nickname.length >= 2 && nickname.length <= 50;
}
