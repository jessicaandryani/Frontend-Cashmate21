import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState({ fullName: '', email: '', avatar: '' });
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState('');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setNewName(res.data.fullName);
        setPreviewAvatar(
          res.data.avatar
            ? `http://localhost:3000/uploads/${res.data.avatar}`
            : '/images/avatar.png'
        );
      } catch (error) {
        console.error('Gagal mengambil data profil:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setNewAvatar(file);
    if (file) setPreviewAvatar(URL.createObjectURL(file));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('fullName', newName);
    if (newAvatar) formData.append('avatar', newAvatar);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/profile/update', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('✅ Profil berhasil diperbarui!');
    } catch (error) {
      alert(error?.response?.data?.message || '❌ Gagal memperbarui profil.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    if (newPassword !== confirmPassword) {
      return alert('⚠️ Konfirmasi password tidak cocok!');
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/profile/change-password',
        { oldPassword: currentPassword, newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('🔒 Password berhasil diubah!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      alert(error?.response?.data?.message || '❌ Gagal mengubah password.');
    }
  };

  return (
    <div style={{ padding: '30px 40px' }}>
      <div style={styles.card}>
        <img
          src={previewAvatar}
          alt="Avatar"
          style={styles.avatar}
          onError={(e) => (e.target.src = '/images/avatar.png')}
        />
        <h2 style={styles.name}>{user.fullName}</h2>
        <p style={styles.email}>{user.email}</p>

        <hr style={styles.separator} />
        <h3 style={styles.sectionTitle}>✏️ Ubah Profil</h3>

        <form onSubmit={handleProfileUpdate} style={styles.form}>
          <label style={styles.label}>Nama Lengkap</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={styles.input}
            required
          />

          <label style={styles.label}>Ganti Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={styles.inputFile}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Menyimpan...' : '💾 Simpan Perubahan'}
          </button>
        </form>

        <hr style={styles.separator} />
        <h3 style={styles.sectionTitle}>🔒 Ganti Password</h3>

        <form onSubmit={handlePasswordUpdate} style={styles.form}>
          <label style={styles.label}>Password Saat Ini</label>
          <input
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, currentPassword: e.target.value })
            }
            style={styles.input}
            required
          />

          <label style={styles.label}>Password Baru</label>
          <input
            type="password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
            style={styles.input}
            required
          />

          <label style={styles.label}>Konfirmasi Password Baru</label>
          <input
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, confirmPassword: e.target.value })
            }
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            🔄 Ganti Password
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: '#fff',
    borderRadius: '20px',
    padding: '35px',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  name: { fontSize: '22px', fontWeight: 'bold', margin: '10px 0' },
  email: { color: '#666', marginBottom: '20px' },
  separator: { margin: '30px 0' },
  sectionTitle: { textAlign: 'left', fontWeight: 'bold', marginBottom: '10px' },
  form: { textAlign: 'left' },
  label: { display: 'block', fontWeight: 'bold', marginTop: '10px' },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  inputFile: { marginTop: '5px', marginBottom: '20px' },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#3b3fcf',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default ProfilePage;
