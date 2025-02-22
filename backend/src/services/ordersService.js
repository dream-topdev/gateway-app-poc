const SellingPartnerAPI = require('amazon-sp-api');
const spApiConfig = require('../config/spApiConfig');

class OrdersService {
  constructor() {
    this.spApi = new SellingPartnerAPI(spApiConfig);
  }

  async getOrders() {
    try {
      const response = await this.spApi.callAPI({
        operation: 'getOrders',
        endpoint: 'orders',
        query: {
          MarketplaceIds: ['ATVPDKIKX0DER'], // US marketplace
          CreatedAfter: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // Last 30 days
        }
      });
      return response.Orders || [];
    } catch (error) {
      console.error('SP-API Error:', error);
      throw error;
    }
  }
}

module.exports = new OrdersService(); 