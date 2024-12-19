import CustomModal from '@/component/ui/CustomModal';

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const LogoutModal = ({ onConfirm, onCancel }: LogoutModalProps) => (
  <CustomModal
    title="정말로 로그아웃하시겠습니까?"
    confirmText="예"
    cancelText="아니오"
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
);
