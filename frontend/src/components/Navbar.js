import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Dashboard</Link>
      <Link to="/products" style={styles.link}>Products</Link>
      <Link to="/orders" style={styles.link}>Orders</Link>
      <Link to="/auth" style={styles.link}>Auth</Link>
    </nav>
  );
}

const styles = {
  nav: {
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    marginBottom: '2rem'
  },
  link: {
    marginRight: '1rem',
    textDecoration: 'none',
    color: '#007bff'
  }
};

export default Navbar; 