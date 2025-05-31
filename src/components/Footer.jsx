import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer} aria-label="Footer utama CashMate">
      <div style={styles.container}>
        {/* Kolom CashMate */}
        <section style={styles.column} aria-label="Tentang CashMate">
          <h3 style={styles.title}>CashMate</h3>
          <p style={styles.text}>
            CashMate hadir sebagai solusi finansial yang membantu pengguna belajar, mengelola, dan merencanakan keuangan dengan lebih baik untuk keputusan finansial yang lebih cerdas dan terarah.
          </p>
        </section>

        {/* Kolom Produk */}
        <nav style={styles.column} aria-label="Produk CashMate">
          <h4 style={styles.subtitle}>Product</h4>
          <ul style={styles.list}>
            <li>Literasi Keuangan</li>
            <li>Manajemen Keuangan</li>
            <li>Kalkulator Keuangan</li>
          </ul>
        </nav>

        {/* Kolom Kelompok */}
        <section style={styles.column} aria-label="Anggota Kelompok 5 API">
          <h4 style={styles.subtitle}>Kelompok 5 API</h4>
          <ul style={styles.list}>
            <li>Jewa</li>
            <li>Jesica</li>
            <li>Alif</li>
            <li>Horas</li>
            <li>Teguh</li>
          </ul>
        </section>
      </div>
      <p style={styles.copyright}>
        &copy; {new Date().getFullYear()} CashMate. All rights reserved.
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2f2694',
    color: 'white',
    padding: '50px 20px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  text: {
    lineHeight: '1.6',
    fontSize: '14px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    fontSize: '14px',
    lineHeight: '1.8',
  },
  copyright: {
    marginTop: '40px',
    fontSize: '12px',
    color: '#ccc',
    textAlign: 'center',
  },
};

export default Footer;
