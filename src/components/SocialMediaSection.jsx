import React from 'react';

const SocialMediaSection = () => {
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <img src="/icons/twitter.png" alt="Twitter" style={styles.icon} />
        <img src="/icons/linkedin.png" alt="LinkedIn" style={styles.icon} />
        <img src="/icons/google.png" alt="Google" style={styles.icon} />
        <img src="/icons/youtube.png" alt="YouTube" style={styles.icon} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px',
    marginBottom: '60px',
  },
  box: {
    backgroundColor: '#e3d5ff',
    padding: '16px 24px',
    borderRadius: '10px',
    display: 'flex',
    gap: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  icon: {
    width: '50px',
    height: '50px',
    cursor: 'pointer',
  },
};

export default SocialMediaSection;
