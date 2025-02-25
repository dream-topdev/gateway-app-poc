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
          MarketplaceIds: ['ATVPDKIKX0DER_SANDBOX'],
          SellerId: sellerId,
          CreatedAfter: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
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