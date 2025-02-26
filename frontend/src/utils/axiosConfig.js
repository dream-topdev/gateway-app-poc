import axios from 'axios';
import config from '../config/api';

const getAuthHeaders = () => {
  const tokens = localStorage.getItem('sp_api_tokens');
  const sellerId = localStorage.getItem('seller_id');
  
  if (!tokens || !sellerId) {
    return null;
  }

  const { access_token } = JSON.parse(tokens);
  return {
    headers: {
      Authorization: `Bearer ${access_token}`
    },
    params: {
      sellerId
    }
  };
};

const refreshToken = async () => {
  const tokens = JSON.parse(localStorage.getItem('sp_api_tokens'));
  if (!tokens?.refresh_token) {
    throw new Error('No refresh token available');
  }

  const response = await axios.post(`${config.API_URL}/api/auth/refresh`, {
    refresh_token: tokens.refresh_token
  });

  localStorage.setItem('sp_api_tokens', JSON.stringify(response.data));
  return response.data.access_token;
};

export const authenticatedRequest = async (config) => {
  try {
    const authConfig = getAuthHeaders();
    if (!authConfig) {
      throw new Error('No authentication credentials found');
    }

    return axios({
      ...config,
      headers: {
        ...config.headers,
        ...authConfig.headers
      },
      params: {
        ...config.params,
        ...authConfig.params
      }
    });
  } catch (error) {
    if (error.response?.status === 401) {
      const newToken = await refreshToken();
      // Retry request with new token
      return authenticatedRequest({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${newToken}`
        }
      });
    }
    throw error;
  }
}; 