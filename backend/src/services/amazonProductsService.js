const SellingPartnerAPI = require('amazon-sp-api');
const spApiConfig = require('../config/spApiConfig');

class AmazonProductsService {
  constructor() {
    this.spApiConfig = spApiConfig;
    this.includedData = ['summaries', 'offers', 'fulfillmentAvailability', 'issues', 'identifiers'];
    this.marketplaceIds = ['ATVPDKIKX0DER'];
    this.mode = 'VALIDATION_PREVIEW';
  }

  async getSpApi(accessToken) {
    return new SellingPartnerAPI({
      ...this.spApiConfig,
      access_token: accessToken
    });
  }

  async createProduct(productData, sellerId, accessToken) {
    try {
      const spApi = await this.getSpApi(accessToken);
      const requestBody = {
        productType: productData.productType,
        requirements: 'LISTING_PRODUCT_ONLY',
        attributes: {
          condition_type: [{ value: "new", marketplace_id: this.marketplaceIds[0] }],
          item_name: [{ value: String(productData.name).substring(0, 200), marketplace_id: this.marketplaceIds[0], language_tag: "en_US" }],
          brand: [{ value: String(productData.brand), marketplace_id: this.marketplaceIds[0] }],
          product_description: [{
            value: String(productData.description || 'A test product for Gateway-app-poc').substring(0, 2000),
            marketplace_id: this.marketplaceIds[0],
            language_tag: "en_US"
          }],
          externally_assigned_product_identifier: [{
            identifier_type: productData.identifierType || "UPC",
            value: productData.identifierValue || "123456789012",
            marketplace_id: this.marketplaceIds[0]
          }],
          merchant_suggested_asin: [{ value: productData.suggestedAsin || "B000123456", marketplace_id: this.marketplaceIds[0] }],
          purchasable_offer: [{
            currency: "USD",
            our_price: [{
              schedule: [{
                value_with_tax: parseInt(productData.price * 100)
              }]
            }],
            marketplace_id: this.marketplaceIds[0]
          }],
          list_price: [{
            value: parseInt(productData.price * 100),
            currency: "USD",
            marketplace_id: this.marketplaceIds[0]
          }],
          item_dimensions: [{
            length: { value: 10, unit: "inches" },
            width: { value: 10, unit: "inches" },
            height: { value: 10, unit: "inches" },
            marketplace_id: this.marketplaceIds[0]
          }],
          batteries_required: [{ value: false, marketplace_id: this.marketplaceIds[0] }],
          safety_warning: [{ value: "No warnings applicable", marketplace_id: this.marketplaceIds[0] }],
          included_components: [{ value: "Main item", marketplace_id: this.marketplaceIds[0] }],
          manufacturer_minimum_age: [{ value: 3, unit: "years", marketplace_id: this.marketplaceIds[0] }],
          part_number: [{ value: productData.partNumber || "PART-001", marketplace_id: this.marketplaceIds[0] }],
          model_name: [{ value: productData.modelName || "MODEL-001", marketplace_id: this.marketplaceIds[0] }],
          manufacturer: [{ value: productData.manufacturer || productData.brand, marketplace_id: this.marketplaceIds[0] }],
          supplier_declared_dg_hz_regulation: [{ value: "not_applicable", marketplace_id: this.marketplaceIds[0] }],
          target_gender: [{ value: "unisex", marketplace_id: this.marketplaceIds[0] }],
          item_package_dimensions: [{
            length: { value: 12, unit: "inches" },
            width: { value: 12, unit: "inches" },
            height: { value: 12, unit: "inches" },
            marketplace_id: this.marketplaceIds[0]
          }],
          cpsia_cautionary_statement: [{ value: "no_warning_applicable", marketplace_id: this.marketplaceIds[0] }],
          target_audience_keyword: [{ value: "adult", marketplace_id: this.marketplaceIds[0] }],
          is_assembly_required: [{ value: false, marketplace_id: this.marketplaceIds[0] }],
          item_package_weight: [{ value: 1, unit: "pounds", marketplace_id: this.marketplaceIds[0] }],
          country_of_origin: [{ value: "US", marketplace_id: this.marketplaceIds[0] }],
          educational_objective: [{ value: "General use", marketplace_id: this.marketplaceIds[0] }],
          manufacturer_maximum_age: [{ value: 99, unit: "years", marketplace_id: this.marketplaceIds[0] }],
          bullet_point: [
            { value: "Feature 1", marketplace_id: this.marketplaceIds[0], language_tag: "en_US" },
            { value: "Feature 2", marketplace_id: this.marketplaceIds[0], language_tag: "en_US" }
          ],
          number_of_items: [{ value: 1, marketplace_id: this.marketplaceIds[0] }],
          material: [{ value: "plastic", marketplace_id: this.marketplaceIds[0] }],
          number_of_boxes: [{ value: 1, marketplace_id: this.marketplaceIds[0] }],
          generic_keyword: [{ value: "test product", marketplace_id: this.marketplaceIds[0] }],
          age_range_description: [{ value: "3 years and up", marketplace_id: this.marketplaceIds[0] }],
          item_type_keyword: [{ value: productData.itemType || "generic-item", marketplace_id: this.marketplaceIds[0] }]
        }
      };
      const request = {
        operation: 'putListingsItem',
        endpoint: 'listingsItems',
        path: {
          sku: productData.sku,
          sellerId: sellerId
        },
        query: {
          marketplaceIds: this.marketplaceIds.join(','),
          includedData: this.includedData.join(','),
          mode: this.mode
        },
        body: requestBody
      };

      const response = await spApi.callAPI(request);
      console.log(request);
      return response;
    } catch (error) {
      this.handleError('Create Product', error);
    }
  }

  async getProduct(sku, sellerId, accessToken) {
    try {
      const spApi = await this.getSpApi(accessToken);
      const response = await spApi.callAPI({
        operation: 'getListingsItem',
        endpoint: 'listingsItems',
        path: {
          sellerId: sellerId,
          sku: sku
        },
        query: {
          marketplaceIds: this.marketplaceIds.join(',')
        }
      });
      return response;
    } catch (error) {
      this.handleError('Get Product', error);
    }
  }

  async updateProduct(sku, productData, sellerId, accessToken) {
    try {
      const spApi = await this.getSpApi(accessToken);
      const requestBody = {
        productType: productData.productType,
        patches: [
          {
            op: 'replace',
            path: '/attributes/item_name',
            value: [{ value: String(productData.name).substring(0, 200), marketplace_id: this.marketplaceIds[0], language_tag: 'en_US' }]
          },
          {
            op: 'replace',
            path: '/attributes/list_price',
            value: [{
              value: parseInt(productData.price * 100),
              currency: 'USD',
              marketplace_id: this.marketplaceIds[0]
            }]
          }
        ]
      };

      const response = await spApi.callAPI({
        operation: 'patchListingsItem',
        endpoint: 'listingsItems',
        path: {
          sellerId: sellerId,
          sku: sku
        },
        query: {
          marketplaceIds: this.marketplaceIds.join(',')
        },
        body: requestBody
      });
      return response;
    } catch (error) {
      this.handleError('Update Product', error);
    }
  }

  async deleteProduct(sku, sellerId, accessToken) {
    try {
      const spApi = await this.getSpApi(accessToken);
      const response = await spApi.callAPI({
        operation: 'deleteListingsItem',
        endpoint: 'listingsItems',
        path: {
          sellerId: sellerId,
          sku: sku
        },
        query: {
          marketplaceIds: this.marketplaceIds.join(',')
        }
      });
      return response;
    } catch (error) {
      this.handleError('Delete Product', error);
    }
  }

  async getAllProductListings(sellerId, accessToken) {
    try {
      const spApi = await this.getSpApi(accessToken);
      const response = await spApi.callAPI({
        operation: 'searchListingsItems',
        endpoint: 'listingsItems',
        path: {
          sellerId: sellerId
        },
        query: {
          marketplaceIds: this.marketplaceIds.join(','),
          includedData: this.includedData.join(','),
          identifiers: identifiers.join(','),
          identifiersType: 'SKU',
          pageSize: 1,
        }
      });
      return response;
    } catch (error) {
      this.handleError('Get Product Listings', error);
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