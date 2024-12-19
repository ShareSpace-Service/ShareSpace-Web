export interface MenuItem {
  label: '이용내역' | '문의하기' | '장소수정' | 'Logout';
  component?: (props: MenuItemProps) => React.ReactNode;
}

export interface MenuItemProps {
  label: string;
  setModalContent?: (view: React.ReactNode) => void;
}
