import { useLayout } from '@/layout/Layout';
import { useProductStore } from '@/store/ProductState';
import { useRoleStore } from '@/store/Role';
import clsx from 'clsx';

export const getMenuTitle = (role: string | null) => [
  { title: '전체', status: '전체' },
  { title: '보관중', status: 'STORED' },
  { title: '반려중', status: 'REJECTED' },
  { title: '대기중', status: 'PENDING' },
  { title: role === 'HOST' ? '요청옴' : '요청됨', status: 'REQUESTED' }, // role이 'GUEST'면 요청됨 / 'HOST'면 요청옴
  { title: '미배정', status: 'UNASSIGNED' },
];

function ProductMenu() {
  const { role } = useRoleStore();
  const { selectedMenu, setSelectedMenu } = useProductStore();
  const { noPadding } = useLayout();

  const MenuTitle = getMenuTitle(role);
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
          className={clsx('cursor-pointer', {
            'text-yellow-400': selectedMenu === menu.status,
          })}
        >
          {menu.title}
        </h2>
      ))}
    </div>
  );
}

export default ProductMenu;
