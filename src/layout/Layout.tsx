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
  const { setRole } = useRoleStore();
  const { pathname } = useLocation();

  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });
  useEffect(() => {
    if (data?.data.role) {
      setRole(data.data.role.toUpperCase());
    }
  }, [data, setRole]);

  const noPadding = pathname === '/product';

  return (
    <div className="layoutContainer">
      <Header />
      <main className={clsx('contentContainer', { 'no-padding': noPadding })}>
        <Outlet context={{ nickname: data?.data.nickName, noPadding }} />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
