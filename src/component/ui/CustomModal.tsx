import { useEffect } from 'react';
import ButtonProps from '@/component/ui/ButtonProps';

interface ModalProps {
  title: string;
  description?: string;
  confirmText: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

/**
 * CustomModal 컴포넌트는 확인 및 취소 버튼을 포함한 모달을 표시하며,
 * ESC 키나 모달 외부 클릭 시 모달을 닫을 수 있음.
 */
function CustomModal({
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel && onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function: 컴포넌트가 사라질 때 이벤트 리스너를 제거
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCancel]);

  // 모달 외부 클릭 시 모달 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel && onCancel();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
      onClick={handleBackdropClick} // 외부 클릭 시 닫기
    >
      <div className="signUpBg w-[500px] h-[300px] p-6 rounded-lg relative">
        <div className="flex flex-col h-full justify-around">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center">{title}</h2>
            {description && (
              <p className="text-gray-300 font-bold text-center">
                {description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 justify-around">
            <button onClick={onConfirm}>
              <ButtonProps title={confirmText} size="check" variant="custom" />
            </button>
            {cancelText && (
              <button onClick={onCancel}>
                <ButtonProps title={cancelText} size="check" variant="custom" />
              </button>
            )}{' '}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
