import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import clsx from 'clsx';
import { useRoleStore } from '@/store/Role';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '@/api/UserProfile';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';

// LayoutContext 타입 정의
interface LayoutContext {
  nickname?: string;
  noPadding: boolean;
}

// useOutletContext를 위한 커스텀 훅
export function useLayout() {
  return useOutletContext<LayoutContext>();
}

function Layout() {
  const setRole = useRoleStore((state) => state.setRole);
  const { pathname } = useLocation();

  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    select: (data) => ({
      role: data.data.role,
      nickName: data.data.nickName,
    }),
  });
  useEffect(() => {
    if (data?.role) {
      setRole(data.role.toUpperCase());
    }
  }, [data?.role, setRole]);

  const noPadding = pathname === '/product';

  return (
    <div className="layoutContainer">
      <Header />
      <main className={clsx('contentContainer', { 'no-padding': noPadding })}>
        <Outlet context={{ nickname: data?.nickName, noPadding }} />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
