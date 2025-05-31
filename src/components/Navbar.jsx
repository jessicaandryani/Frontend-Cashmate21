import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const navLinks = [
    { text: 'Home', to: 'hero' },
    { text: 'Features', to: 'features' },
    { text: 'Contact Us', to: 'contact' },
  ];

  return (
    <nav style={styles.wrapper}>
      <div style={styles.navbar}>
        <div style={styles.left}>
          <img src="/logo.png" alt="Logo" style={styles.logo} />
          <span style={styles.brand}>CashMate</span>
        </div>

        <div style={styles.right}>
          {navLinks.map((link, index) => (
            <ScrollLink
              key={index}
              to={link.to}
              smooth={true}
              duration={500}
              spy={true}
              offset={-70}
              onMouseEnter={() => setHoveredLink(index)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                ...styles.link,
                color: hoveredLink === index ? '#ffd700' : 'white',
                textDecoration: hoveredLink === index ? 'underline' : 'none',
              }}
            >
              {link.text}
            </ScrollLink>
          ))}

          <RouterLink
            to="/login"
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            style={{
              ...styles.button,
              backgroundColor: isButtonHovered ? '#f0f0f0' : 'white',
              display: 'inline-block',
              textAlign: 'center',
              textDecoration: 'none',
            }}
          >
            Sign In
          </RouterLink>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#3b2ba5',
    padding: '14px 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  navbar: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logo: {
    height: '70px',
  },
  brand: {
    fontWeight: '600',
    fontSize: '20px',
    color: 'white',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.2s, textDecoration 0.2s',
    cursor: 'pointer',
  },
  button: {
    backgroundColor: 'white',
    color: '#3b2ba5',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default Navbar;
