import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const NavbarAfterLogin = ({ onToggleSidebar }) => {
  const [user, setUser] = useState({ fullName: '', avatar: '' });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('DATA USER DARI BACKEND:', res.data); // Debug log
        setUser(res.data);
      } catch (error) {
        console.error('Gagal mengambil data user:', error.response?.data || error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleAvatarClick = () => {
    navigate('/profile');
  };

  const getTitle = (path) => {
    switch (path) {
      case '/dashboard':
        return 'Dashboard';
      case '/laporan':
        return 'Laporan Keuangan';
      case '/literasi':
        return 'Literasi Keuangan';
      case '/kalkulator':
        return 'Kalkulator';
      case '/profile':
        return 'Profil Pengguna';
      default:
        return 'CashMate';
    }
  };

  return (
    <div style={styles.navbar}>
      <button onClick={onToggleSidebar} style={styles.menuButton}>
        <FaBars />
      </button>
      <h2 style={styles.title}>{getTitle(location.pathname)}</h2>
      <div style={styles.user}>
        <span style={styles.name}>{user?.fullName || 'User'}</span>
        <img
          src={user?.avatar ? `http://localhost:3000${user.avatar}` : '/uploads/avatar.png'}
          alt="User Avatar"
          style={styles.avatar}
          onClick={handleAvatarClick}
        />

      </div>
    </div>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#241f74',
    color: 'white',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  name: {
    fontWeight: '500',
  },
  avatar: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
};

export default NavbarAfterLogin;
