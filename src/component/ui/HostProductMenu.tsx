import { useRoleStore } from '@/store/Role';
import clsx from 'clsx';
import { useLayout } from '@/layout/Layout';

interface HostProductMenuProps {
  selectedMenu: string;
  setSelectedMenu: (status: string) => void;
}

export const hostMenuTitle = (role: string | null) => [
  { title: '전체', status: '전체' },
  { title: '보관중', status: 'STORED' },
  { title: '대기중', status: 'PENDING' },
  { title: role === 'HOST' ? '요청옴' : '요청됨', status: 'REQUESTED' },
];

function HostProductMenu({
  selectedMenu,
  setSelectedMenu,
}: HostProductMenuProps) {
  const role = useRoleStore((state) => state.role);

  const { noPadding } = useLayout();
  const MenuTitle = hostMenuTitle(role);

  return (
    <div
      className={clsx(
        { 'no-padding': noPadding },
        'signBg h-16 w-full blueBg flex items-center justify-around text-white font-bold text-lg cursor-pointer'
      )}
    >
      {MenuTitle.map((menu, index) => (
        <h2
          key={index}
          onClick={() => setSelectedMenu(menu.status)}
          className={clsx(
            { 'text-yellow-400': selectedMenu === menu.status },
            'cursor-pointer'
          )}
        >
          {menu.title}
        </h2>
      ))}
    </div>
  );
}

export default HostProductMenu;
