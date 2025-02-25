import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function Auth() {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const spApiCode = params.get('spapi_oauth_code');
    const state = params.get('state');
    const sellingPartnerId = params.get('selling_partner_id');
    console.log({ spApiCode, state, sellingPartnerId });

    if (spApiCode && sellingPartnerId) {
      handleCallback(spApiCode, sellingPartnerId, state);
    } else {
      checkAuthStatus();
    }
  }, [location]);

  const checkAuthStatus = () => {
    const sellerId = localStorage.getItem('seller_id');
    const tokens = localStorage.getItem('sp_api_tokens');

    if (sellerId && tokens) {
      try {
        const tokenData = JSON.parse(tokens);
        const expirationTime = new Date(tokenData.expires_at).getTime();
        const now = new Date().getTime();

        if (now < expirationTime) {
          setIsAuthenticated(true);
          navigate('/');
        } else {
          handleLogout();
        }
      } catch (error) {
        handleLogout();
      }
    }
    setLoading(false);
  };

  const handleCallback = async (spApiCode, sellingPartnerId, state) => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/callback', {
        params: {
          code: spApiCode,
          selling_partner_id: sellingPartnerId,
          state: state
        }
      });

      localStorage.setItem('sp_api_tokens', JSON.stringify(response.data));
      localStorage.setItem('seller_id', sellingPartnerId);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Callback error:', error);
      setLoading(false);
    }
  };

  const handleAuth = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/auth/url', {
        params: {
          redirectUrl: 'http://localhost:3000/auth/callback'
        }
      });
      window.location.href = response.data.authUrl;
    } catch (error) {
      console.error('Authentication error:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('seller_id');
    localStorage.removeItem('sp_api_tokens');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h2>Amazon Seller Authentication</h2>
      {isAuthenticated ? (
        <div>
          <p>You are authenticated with Amazon Seller Central</p>
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p>Please authenticate with your Amazon Seller Central account</p>
          <button onClick={handleAuth} style={styles.button}>
            Connect with Amazon
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center'
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ff9900',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem'
  }
};

export default Auth; 