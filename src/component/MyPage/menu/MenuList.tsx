import History from '@/pages/History';
import Question from '@/pages/Question';
import PlaceEdit from '@/pages/PlaceEdit';
import { MenuItem } from '@/constants/menu';

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'History',
    component: ({ label }) => <History title={label} />,
  },
  {
    label: 'Question',
    component: ({ label, setModalContent }) => {
      if (setModalContent) {
        return <Question title={label} setView={setModalContent} />;
      }
      return null; // 또는 다른 적절한 대체 UI
    },
  },
  {
    label: '장소 수정',
    component: ({ label }) => <PlaceEdit title={label} />,
  },
  {
    label: 'Logout',
  },
];
