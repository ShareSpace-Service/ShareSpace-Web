import { useState } from 'react';
import { useRoleStore } from '@/store/Role';
import MenuItem from './MenuItem';
import { useLogout } from '@/action/logout';
import Modal from '@/modal/ProfileModal';
import { MenuItem as MenuItemType } from '@/constants/menu';
import { LogoutModal } from './LogoutModal';
import { MENU_ITEMS } from './MenuList';

function TitlesList() {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const { role } = useRoleStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { mutate: logout } = useLogout();

  const handleMenuClick = (MenuList: MenuItemType) => {
    if (MenuList.component) {
      setModalContent(
        MenuList.component({
          label: MenuList.label,
          setModalContent,
        })
      );
    }
  };

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <div className="flex flex-col gap-4 pt-5">
      {MENU_ITEMS.filter(
        (title) => title.label !== '장소 수정' || role === 'HOST'
      ).map((title) => (
        <MenuItem
          key={title.label}
          label={title.label}
          onClick={() =>
            title.label === 'Logout'
              ? setShowLogoutModal(true)
              : handleMenuClick(title)
          }
        />
      ))}

      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      {modalContent && (
        <Modal onClose={() => setModalContent(null)}>{modalContent}</Modal>
      )}
    </div>
  );
}

export default TitlesList;
