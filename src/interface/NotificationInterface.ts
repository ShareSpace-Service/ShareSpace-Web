export interface Notification {
  notificationId: number;
  message: string;
  timeElapsed: number;
  read: boolean;
}

export interface AlarmBoxProps {
  onClick: () => void;
}

export interface AlarmModalProps {
  closeModal: () => void;
} 