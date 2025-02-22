const spApiConfig = {
  region: 'na', // North America region
  refresh_token: process.env.SP_API_REFRESH_TOKEN,
  credentials: {
    SELLING_PARTNER_APP_CLIENT_ID: process.env.SP_API_CLIENT_ID,
    SELLING_PARTNER_APP_CLIENT_SECRET: process.env.SP_API_CLIENT_SECRET,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_SELLING_PARTNER_ROLE: process.env.AWS_SELLING_PARTNER_ROLE
  }
};

module.exports = spApiConfig; 