import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `input::placeholder { color: white; opacity: 1; }`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok!');
      return;
    }

    try {
      await axios.post('http://localhost:3000/register', {
        email: formData.email,
        password: formData.password,
        fullname: formData.fullname,
      });
      alert('Registrasi berhasil!');
      navigate('/login'); // Arahkan ke halaman login
    } catch (err) {
      console.error(err);
      setError('Registrasi gagal. Coba lagi!');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>REGISTRASI</h1>
      <div style={styles.card}>
        <h2 style={styles.brand}>CashMate</h2>
        <p style={styles.desc}>Bergabunglah dan kelola keuanganmu dengan lebih mudah!</p>

        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label}>Daftar</label>

          <input
            type="text"
            name="fullname"
            placeholder="Nama Lengkap"
            value={formData.fullname}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Alamat Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Konfirmasi Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />

          {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}

          <Link to="/login" style={styles.loginLink}>Sudah memiliki akun? Masuk</Link>

          <p style={styles.terms}>
            Dengan mendaftar / masuk berarti Anda mematuhi <a href="#" style={styles.link}>Syarat dan Ketentuan</a> yang berlaku.
          </p>

          <button type="submit" style={styles.button}>Daftar</button>
        </form>
      </div>
    </div>
  );
};


// (styles tetap sama seperti sebelumnya)
const styles = {
  container: {
    minHeight: '100vh',
    background: '#f9f9f9',
    padding: '40px 0',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  card: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#7a73d1',
    borderRadius: '16px',
    color: 'white',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '20px',
    marginBottom: '4px',
  },
  desc: {
    fontSize: '13px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  label: {
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: '6px',
  },
  input: {
    border: 'none',
    borderBottom: '2px solid white',
    background: 'transparent',
    color: 'white',
    outline: 'none',
    fontSize: '14px',
  },
  passwordContainer: {
    position: 'relative',
  },
  loginLink: {
    textAlign: 'left',
    fontSize: '13px',
    textDecoration: 'underline',
    cursor: 'pointer',
    color: 'black',
    marginTop: '5px',
  },
  terms: {
    fontSize: '11px',
    marginTop: '10px',
    color: 'white',
  },
  link: {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: 'black',
  },
  button: {
    backgroundColor: 'white',
    color: '#8378f9',
    padding: '10px',
    fontWeight: 'bold',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '14px',
  }
};

export default RegisterPage;
