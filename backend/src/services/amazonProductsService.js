const SellingPartnerAPI = require('amazon-sp-api');
const spApiConfig = require('../config/spApiConfig');

class AmazonProductsService {
  constructor() {
    this.spApi = new SellingPartnerAPI(spApiConfig);
  }

  async createProduct(productData, sellerId, marketplaceIds = ['ATVPDKIKX0DER']) {
    try {
      console.log(`Creating product for seller: ${sellerId}`);
      
      const requestBody = {
        productType: productData.productType, // e.g., "LUGGAGE"
        requirements: 'LISTING_PRODUCT_ONLY',
        attributes: {
          condition_type: [{ value: "new", marketplace_id: marketplaceIds[0] }],
          item_name: [{ value: String(productData.name).substring(0, 200), marketplace_id: marketplaceIds[0], language_tag: "en_US" }],
          brand: [{ value: String(productData.brand), marketplace_id: marketplaceIds[0] }],
          product_description: [{
            value: String(productData.description || 'A test product for Gateway-app-poc').substring(0, 2000),
            marketplace_id: marketplaceIds[0],
            language_tag: "en_US"
          }],
          externally_assigned_product_identifier: [{
            identifier_type: productData.identifierType || "UPC", // e.g., "UPC", "EAN"
            value: productData.identifierValue || "123456789012", // Valid UPC/EAN
            marketplace_id: marketplaceIds[0]
          }],
          merchant_suggested_asin: [{ value: productData.suggestedAsin || "B000123456", marketplace_id: marketplaceIds[0] }],
          purchasable_offer: [{
            currency: "USD",
            our_price: [{
              schedule: [{
                value_with_tax: parseInt(productData.price * 100)
              }]
            }],
            marketplace_id: marketplaceIds[0]
          }],
          list_price: [{
            value: parseInt(productData.price * 100),
            currency: "USD",
            marketplace_id: marketplaceIds[0]
          }],
          item_dimensions: [{
            length: { value: 10, unit: "inches" },
            width: { value: 10, unit: "inches" },
            height: { value: 10, unit: "inches" },
            marketplace_id: marketplaceIds[0]
          }],
          batteries_required: [{ value: false, marketplace_id: marketplaceIds[0] }],
          safety_warning: [{ value: "No warnings applicable", marketplace_id: marketplaceIds[0] }],
          included_components: [{ value: "Main item", marketplace_id: marketplaceIds[0] }],
          manufacturer_minimum_age: [{ value: 3, unit: "years", marketplace_id: marketplaceIds[0] }],
          part_number: [{ value: productData.partNumber || "PART-001", marketplace_id: marketplaceIds[0] }],
          model_name: [{ value: productData.modelName || "MODEL-001", marketplace_id: marketplaceIds[0] }],
          manufacturer: [{ value: productData.manufacturer || productData.brand, marketplace_id: marketplaceIds[0] }],
          supplier_declared_dg_hz_regulation: [{ value: "not_applicable", marketplace_id: marketplaceIds[0] }],
          target_gender: [{ value: "unisex", marketplace_id: marketplaceIds[0] }],
          item_package_dimensions: [{
            length: { value: 12, unit: "inches" },
            width: { value: 12, unit: "inches" },
            height: { value: 12, unit: "inches" },
            marketplace_id: marketplaceIds[0]
          }],
          cpsia_cautionary_statement: [{ value: "no_warning_applicable", marketplace_id: marketplaceIds[0] }],
          target_audience_keyword: [{ value: "adult", marketplace_id: marketplaceIds[0] }],
          is_assembly_required: [{ value: false, marketplace_id: marketplaceIds[0] }],
          item_package_weight: [{ value: 1, unit: "pounds", marketplace_id: marketplaceIds[0] }],
          country_of_origin: [{ value: "US", marketplace_id: marketplaceIds[0] }],
          educational_objective: [{ value: "General use", marketplace_id: marketplaceIds[0] }],
          manufacturer_maximum_age: [{ value: 99, unit: "years", marketplace_id: marketplaceIds[0] }],
          bullet_point: [
            { value: "Feature 1", marketplace_id: marketplaceIds[0], language_tag: "en_US" },
            { value: "Feature 2", marketplace_id: marketplaceIds[0], language_tag: "en_US" }
          ],
          number_of_items: [{ value: 1, marketplace_id: marketplaceIds[0] }],
          material: [{ value: "plastic", marketplace_id: marketplaceIds[0] }],
          number_of_boxes: [{ value: 1, marketplace_id: marketplaceIds[0] }],
          generic_keyword: [{ value: "test product", marketplace_id: marketplaceIds[0] }],
          age_range_description: [{ value: "3 years and up", marketplace_id: marketplaceIds[0] }],
          item_type_keyword: [{ value: productData.itemType || "generic-item", marketplace_id: marketplaceIds[0] }]
        }
      };

      const response = await this.spApi.callAPI({
        operation: 'putListingsItem',
        endpoint: 'listingsItems',
        path: {
          sku: `TEST-${Date.now()}`,
          sellerId: sellerId
        },
        query: {
          marketplaceIds: marketplaceIds.join(',')
        },
        body: requestBody
      });
      console.log(response);
      console.log(JSON.stringify(requestBody));
      const product = await this.getProduct(response.sku, sellerId);
      return product;
    } catch (error) {
      this.handleError('Create Product', error);
    }
  }

  async getProduct(sku, sellerId) {
    try {
      console.log(`Fetching product details for SKU: ${sku}`);

      const response = await this.spApi.callAPI({
        operation: 'getListingsItem',
        endpoint: 'listingsItems',
        query: {
          marketplaceIds: 'ATVPDKIKX0DER'
        },
        path: {
          sku: sku,
          sellerId: sellerId
        }
      });
      return response;
    } catch (error) {
      this.handleError('Get Product', error);
    }
  }

  async updateProduct(sku, productData, sellerId) {
    try {
      console.log(`Updating product SKU: ${sku}`);

      const response = await this.spApi.callAPI({
        operation: 'patchListingsItem',
        endpoint: 'listingsItems',
        path: {
          marketplaceId: 'ATVPDKIKX0DER',
          sku: sku,
          sellerId: sellerId
        },
        body: {
          productType: productData.productType,
          patches: [
            {
              op: 'replace',
              path: '/attributes/title',
              value: productData.name
            },
            {
              op: 'replace',
              path: '/attributes/list_price',
              value: {
                amount: productData.price,
                currencyCode: 'USD'
              }
            }
          ]
        }
      });
      return response;
    } catch (error) {
      this.handleError('Update Product', error);
    }
  }

  async deleteProduct(sku, sellerId) {
    try {
      console.log(`Deleting product SKU: ${sku}`);

      const response = await this.spApi.callAPI({
        operation: 'deleteListingsItem',
        endpoint: 'listingsItems',
        path: {
          marketplaceId: 'ATVPDKIKX0DER',
          sku: sku,
          sellerId: sellerId
        }
      });
      return response;
    } catch (error) {
      this.handleError('Delete Product', error);
    }
  }

  async getInventory(sellerId, marketplaceIds = ['ATVPDKIKX0DER']) {
    try {
      console.log(`Fetching inventory for seller: ${sellerId}`);
      let allInventories = [];
      let nextToken = null;

      do {
        const response = await this.spApi.callAPI({
          operation: 'getInventorySummaries',
          endpoint: 'fbaInventory',
          query: {
            marketplaceIds,
            granularityType: 'Marketplace',
            granularityId: marketplaceIds[0],
            nextToken
          }
        });
        allInventories = allInventories.concat(response.inventorySummaries || []);
        nextToken = response.pagination?.nextToken;
      } while (nextToken);

      return allInventories;
    } catch (error) {
      this.handleError('Get Inventory', error);
      throw error;
    }
  }

  handleError(operation, error) {
    console.error(`SP-API ${operation} Error:`, {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw new Error(`Failed to ${operation.toLowerCase()}: ${error.message}`);
  }
}

module.exports = new AmazonProductsService();