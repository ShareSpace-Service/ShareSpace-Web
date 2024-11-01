import clsx from 'clsx';

interface ProductStatusProps {
  noPadding?: boolean;
  selectedStatus: string;
  setSelectStatus: (status: string) => void;
  userRole: string | null;
}

export const getMenuTitle = (userRole: string | null) => [
  { title: '전체', status: '전체' },
  { title: '보관중', status: 'STORED' },
  { title: '반려중', status: 'REJECTED' },
  { title: '대기중', status: 'PENDING' },
  { title: userRole === 'HOST' ? '요청옴' : '요청됨', status: 'REQUESTED' }, // role이 'GUEST'면 요청됨 / 'HOST'면 요청옴
  { title: '미배정', status: 'UNASSIGNED' },
];

function ProductMenu({
  noPadding,
  selectedStatus,
  setSelectStatus,
  userRole,
}: ProductStatusProps) {
  const MenuTitle = getMenuTitle(userRole);
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
          onClick={() => setSelectStatus(menu.status)}
          className={clsx('cursor-pointer', {
            'text-yellow-400': selectedStatus === menu.status,
          })}
        >
          {menu.title}
        </h2>
      ))}
    </div>
  );
}

export default ProductMenu;
