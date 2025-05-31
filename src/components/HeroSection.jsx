import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ← Tambahkan ini

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section style={styles.hero}>
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome To Cashmate</h1>
        <p style={styles.subtitle}>
          Membantumu dalam segala urusan keuangan
        </p>
        <Link
          to="/login"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            ...styles.button,
            backgroundColor: isHovered ? '#5f59b0' : '#7a73d1',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          Get Started
        </Link>
      </div>
      <img 
        src="/finance-illustration.png" 
        alt="Ilustrasi Keuangan" 
        style={styles.image} 
      />
    </section>
  );
};

const styles = {
  hero: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '60px 40px',
    maxWidth: '1200px',
    margin: '0 auto',
    flexWrap: 'wrap',
    gap: '40px'
  },
  content: {
    flex: 1,
    minWidth: '300px'
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#555',
    marginBottom: '30px',
    lineHeight: 1.6
  },
  button: {
    backgroundColor: '#7a73d1',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  image: {
    flex: 1,
    maxWidth: '500px',
    width: '100%',
    height: 'auto'
  }
};

export default HeroSection;
