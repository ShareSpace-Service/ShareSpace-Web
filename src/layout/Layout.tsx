import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import clsx from 'clsx';
import { useRoleStore } from '@/store/Role';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '@/api/UserProfile';

interface LayoutProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

function Layout({ children, noPadding }: LayoutProps) {
  const { setRole } = useRoleStore();

  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });
  useEffect(() => {
    if (data?.data.role) {
      setRole(data.data.role.toUpperCase());
    }
  }, [data, setRole]);

  return (
    <div className="layoutContainer">
      <Header />
      <main className={clsx('contentContainer', { 'no-padding': noPadding })}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
