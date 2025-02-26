const SellingPartnerAPI = require('amazon-sp-api');
const spApiConfig = require('../config/spApiConfig');

class OrdersService {
  constructor() {
    this.spApi = new SellingPartnerAPI(spApiConfig);
  }

  async getOrders(sellerId) {
    try {
      console.log(`Fetching orders for seller: ${sellerId}`);
      
      const response = await this.spApi.callAPI({
        operation: 'getOrders',
        endpoint: 'orders',
        query: {
          MarketplaceIds: ['ATVPDKIKX0DER'],
        }
      });
      return response.Orders || [];
    } catch (error) {
      console.error(`SP-API Error for seller ${sellerId}:`, error);
      throw error;
    }
  }
}

module.exports = new OrdersService(); 