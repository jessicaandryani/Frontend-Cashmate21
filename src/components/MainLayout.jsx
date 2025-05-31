import React, { useState } from 'react';
import Sidebar from './Sidebar';
import NavbarAfterLogin from './NavbarAfterLogin';
import Footer from './Footer';

const MainLayout = ({ children, activePage }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true); // default: terlihat

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar muncul jika sidebarVisible true */}
      {sidebarVisible && <Sidebar activePage={activePage} />}

      {/* Bagian kanan: Navbar + Konten + Footer */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <NavbarAfterLogin onToggleSidebar={toggleSidebar} />
        <main style={{ flex: 1, padding: '20px' }}>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
