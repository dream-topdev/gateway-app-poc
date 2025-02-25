const axios = require('axios');

const AMAZON_AUTH_URL = 'https://sellercentral.amazon.com/apps/authorize/consent';
const SP_API_TOKEN_URL = 'https://api.amazon.com/auth/o2/token';

class AuthController {
  generateAuthUrl() {
    const params = new URLSearchParams({
      application_id: process.env.SP_API_APP_ID,
      state: Math.random().toString(36).substring(7),
      version: 'beta'
    });
    
    return `${AMAZON_AUTH_URL}?${params.toString()}`;
  }

  async handleCallback(code, sellingPartnerId) {
    try {
      const response = await axios.post(SP_API_TOKEN_URL, {
        grant_type: 'authorization_code',
        code,
        client_id: process.env.SP_API_CLIENT_ID,
        client_secret: process.env.SP_API_CLIENT_SECRET
      });

      // Add expiration time (typically 1 hour from now)
      const expiresAt = new Date(Date.now() + 3600 * 1000).toISOString();

      return {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        selling_partner_id: sellingPartnerId,
        expires_at: expiresAt
      };
    } catch (error) {
      console.error('Token exchange error:', error);
      throw error;
    }
  }

  async refreshToken(refreshToken) {
    try {
      const response = await axios.post(SP_API_TOKEN_URL, {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.SP_API_CLIENT_ID,
        client_secret: process.env.SP_API_CLIENT_SECRET
      });

      const expiresAt = new Date(Date.now() + 3600 * 1000).toISOString();

      return {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        expires_at: expiresAt
      };
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  }
}

module.exports = new AuthController(); 