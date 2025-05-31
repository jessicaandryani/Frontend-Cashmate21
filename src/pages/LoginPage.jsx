import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      input::placeholder {
        color: white;
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });

      const token = response.data.data.access_token;
      localStorage.setItem('token', token);

      // Arahkan ke dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Login gagal. Periksa email dan password kamu!');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>LOGIN</h1>
      <div style={styles.card}>
        <h2 style={styles.brand}>CashMate</h2>
        <p style={styles.desc}>Login untuk bergabung bersama kami</p>

        <form style={styles.form} onSubmit={handleLogin}>
          <label style={styles.label}>Masuk</label>

          <input
            type="email"
            placeholder="Alamat Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <a href="#" style={styles.forgot}>Lupa Password</a>

          <button type="submit" style={styles.button}>Masuk</button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </form>

        <div style={styles.divider}></div>
        <p style={styles.orText}>Atau masuk melalui</p>

        <div style={styles.google}>
          <img src="icons/google1.png" alt="Google" style={styles.icon} />
          <span>Google</span>
        </div>

        <p style={styles.register}>
          Belum Punya Akun? <Link to="/register" style={styles.link}>Daftar</Link>
        </p>
      </div>
    </div>
  );
};

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
    borderRadius: '12px',
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
    marginBottom: '30px',
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
    padding: '10px',
    border: 'none',
    borderBottom: '2px solid white',
    background: 'transparent',
    color: 'white',
    outline: 'none',
  },
  forgot: {
    textAlign: 'right',
    fontSize: '12px',
    color: 'white',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  button: {
    backgroundColor: 'white',
    color: '#7e73e6',
    padding: '10px',
    fontWeight: 'bold',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
  },
  divider: {
    height: '1px',
    backgroundColor: 'white',
    margin: '20px 0 10px',
  },
  orText: {
    fontSize: '13px',
    marginBottom: '10px',
  },
  google: {
    color: '#000000',
    padding: '12px 12px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    cursor: 'pointer',
    fontWeight: '500',
    maxWidth: '200px',
    margin: '0 auto 20px',
    backgroundColor: 'white',
  },
  icon: {
    width: '40px',
    height: '40px',
  },
  register: {
    fontSize: '13px',
  },
  link: {
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'underline',
    cursor: 'pointer',
  }
};

export default LoginPage;
