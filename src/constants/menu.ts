export interface MenuItem {
  label: 'History' | 'Question' | '장소 수정' | 'Logout';
  component?: (props: MenuItemProps) => React.ReactNode;
}

export interface MenuItemProps {
  label: string;
  setModalContent?: (view: React.ReactNode) => void;
}
