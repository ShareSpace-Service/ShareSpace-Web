import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layoutContainer">
      <Header />
      <main className="contentContainer">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
