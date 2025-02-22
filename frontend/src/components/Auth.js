import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initiateAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/url', {
          params: {
            redirectUrl: 'http://localhost:3000/auth/callback'
          }
        });
        window.location.href = response.data.authUrl;
      } catch (error) {
        console.error('Auth error:', error);
      }
    };

    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('spapi_oauth_code');
      const sellerId = params.get('selling_partner_id');
      
      if (code && sellerId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/auth/callback`, {
            params: {
              code,
              selling_partner_id: sellerId
            }
          });
          localStorage.setItem('sp_api_tokens', JSON.stringify(response.data));
          localStorage.setItem('seller_id', sellerId);
          navigate('/dashboard');
        } catch (error) {
          console.error('Callback error:', error);
        }
      }
    };

    if (location.pathname === '/auth/callback') {
      handleCallback();
    } else {
      initiateAuth();
    }
  }, [location, navigate]);

  return <div>Processing authentication...</div>;
}

export default Auth; 