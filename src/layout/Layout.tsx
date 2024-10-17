import React from 'react';
import Header from './Header';
import Footer from './Footer';
import clsx from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

function Layout({ children, noPadding }: LayoutProps) {
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
