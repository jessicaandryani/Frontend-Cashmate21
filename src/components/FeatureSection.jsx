import React from 'react';

const features = [
  {
    title: 'Literasi Keuangan',
    description: 'Edukasi dan informasi terkait pengelolaan keuangan, investasi, serta strategi keuangan yang dapat membantu pengguna memahami dunia finansial.',
    icon: '/icons/note.png', 
  },
  {
    title: 'Manajemen Keuangan',
    description: 'Membantu pengguna dalam mencatat, mengelola, dan menganalisis kondisi keuangan pribadi.',
    icon: '/icons/chart.png',
  },
  {
    title: 'Kalkulator Keuangan',
    description: 'Melakukan berbagai perhitungan finansial guna membantu dalam perencanaan keuangan.',
    icon: '/icons/report.png',
  }
];

const FeatureSection = () => {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Fitur Unggulan</h2>
      <div style={styles.featureContainer}>
        {features.map((feature, index) => (
          <div key={index} style={styles.card}>
            <h3 style={styles.title}>{feature.title}</h3>
            <img src={feature.icon} alt={feature.title} style={styles.icon} />
            
            <p style={styles.desc}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '60px 40px',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '40px',
    color: '#3b2ba5',
  },
  featureContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '90px',
    flexWrap: 'wrap',
  },
  card: {
    flex: '1',
    minWidth: '280px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(155, 71, 188, 0.05)',
    border: '2px solid #b5a8d5', // warna ungu soft, bisa diganti
  },
  
  icon: {
    width: '100px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#222',
  },
  desc: {
    fontSize: '15px',
    color: '#555',
  },
};

export default FeatureSection;
