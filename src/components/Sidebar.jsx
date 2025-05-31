import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBook, FaChartBar, FaCalculator, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import ModalConfirm from './ModalConfirm'; // Pastikan path-nya sesuai

const Sidebar = ({ activePage }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:3000/logout', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Gagal logout:', error.response?.data || error.message);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>CashMate</h2>
      <nav style={styles.nav}>
        <Link to="/dashboard" style={{ ...styles.link, ...(activePage === 'dashboard' ? styles.active : {}) }}>
          <FaHome /> Dashboard
        </Link>
        <Link to="/literasi" style={{ ...styles.link, ...(activePage === 'literasi' ? styles.active : {}) }}>
          <FaBook /> Literasi
        </Link>
        <Link to="/kalkulator" style={{ ...styles.link, ...(activePage === 'kalkulator' ? styles.active : {}) }}>
          <FaCalculator /> Kalkulator
        </Link>
        <Link to="/laporan" style={{ ...styles.link, ...(activePage === 'laporan' ? styles.active : {}) }}>
          <FaChartBar /> Laporan
        </Link>
      </nav>
      <button onClick={() => setShowModal(true)} style={{ ...styles.logout, background: 'none', border: 'none' }}>
        <FaSignOutAlt /> Keluar
      </button>

      {showModal && (
        <ModalConfirm
          title="Konfirmasi Logout"
          message="Apakah kamu yakin ingin keluar dari akun ini?"
          onConfirm={handleLogout}
          onCancel={handleCancel}
          confirmLabel="🚪 Keluar"
          titleColor="#ff5555"
          messageColor="#666"
          cancelLabel="❌ Batal"
        />
      )}
    </div>
  );
};

const styles = {
  sidebar: {
    width: '220px',
    background: '#7a73d1',
    color: '#fff',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '24px',
    marginBottom: '40px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px',
    borderRadius: '8px',
  },
  active: {
    backgroundColor: '#615bc9',
  },
  logout: {
    textDecoration: 'none',
    color: '#fff',
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: 'bold',
  },
};

export default Sidebar;
