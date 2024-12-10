import { useState } from 'react';
import { useRoleStore } from '@/store/Role';
import History from '@/pages/History';
import Question from '@/pages/Question';
import PlaceEdit from '@/pages/PlaceEdit';
import MenuItem from './MenuItem';
import CustomModal from '@/component/ui/CustomModal';
import { useLogout } from '@/action/logout';
import Modal from '@/modal/ProfileModal';

interface Title {
  label: 'History' | 'Question' | '장소 수정' | 'Logout';
  component?: (props: {
    label: string;
    setView?: (view: React.ReactNode) => void;
  }) => React.ReactNode;
}

function TitlesList() {
  const [view, setView] = useState<React.ReactNode | null>(null);
  const { role } = useRoleStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { mutate: logout } = useLogout();

  const titles: Title[] = [
    { label: 'History', component: ({ label }) => <History title={label} /> },
    {
      label: 'Question',
      component: ({ label }) => <Question title={label} setView={setView} />,
    },
    {
      label: '장소 수정',
      component: ({ label }) => <PlaceEdit title={label} />,
    },
    { label: 'Logout' },
  ];

  const handleClick = (title: Title) => {
    if (title.component) {
      setView(title.component({ label: title.label }));
    }
  };

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <div className="flex flex-col gap-4 pt-5">
      {titles
        .filter((title) => title.label !== '장소 수정' || role === 'HOST')
        .map((title) => (
          <MenuItem
            key={title.label}
            label={title.label}
            onClick={() =>
              title.label === 'Logout'
                ? setShowLogoutModal(true)
                : handleClick(title)
            }
          />
        ))}

      {showLogoutModal && (
        <CustomModal
          title="정말로 로그아웃하시겠습니까?"
          confirmText="예"
          cancelText="아니오"
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      {view && <Modal onClose={() => setView(null)}>{view}</Modal>}
    </div>
  );
}

export default TitlesList;
