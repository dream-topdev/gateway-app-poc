import axios from 'axios';

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

export const authenticatedRequest = async (config) => {
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
}; 