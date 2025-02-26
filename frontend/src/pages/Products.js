import React, { useState, useEffect } from 'react';
import { authenticatedRequest } from '../utils/axiosConfig';
import constants from '../../backend/src/config/constants';
function Products() {
  const [amazonProducts, setAmazonProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: 'Test Product XYZ',
    price: '29.99',
    productType: 'TOYS_AND_GAMES',
    brand: 'TestBrand',
    manufacturer: 'TestManufacturer Inc.',
    description: 'A test product description',
    identifierType: 'UPC',
    identifierValue: '012345678901',
    suggestedAsin: 'B000000000',
    sku: ''
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchSku, setSearchSku] = useState('Test-product-sku');
  const initialFetchDone = React.useRef(false);

  useEffect(() => {
    if (!initialFetchDone.current) {
      fetchAmazonProducts();
      initialFetchDone.current = true;
    }
  }, []);

  const fetchAmazonProducts = async () => {
    try {
      const response = await authenticatedRequest({
        method: 'get',
        url: `${constants.API_BASE_URL}/api/sp/products`
      });
      setAmazonProducts(response.data.items || []);
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || error.message || 'An error occurred');
    }
  };

  const handleSubmitToAmazon = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authenticatedRequest({
        method: 'post',
        url: 'http://localhost:5000/api/sp/products',
        data: newProduct
      });
      
      setNewProduct({
        name: '',
        price: '',
        productType: '',
        brand: '',
        manufacturer: '',
        description: '',
        identifierType: 'UPC',
        identifierValue: '',
        suggestedAsin: '',
        sku: ''
      });
      fetchAmazonProducts();
      alert('Product submitted to Amazon successfully!');
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (sku) => {
    setLoading(true);
    try {
      await authenticatedRequest({
        method: 'patch',
        url: `http://localhost:5000/api/sp/products/${sku}`,
        data: selectedProduct
      });
      fetchAmazonProducts();
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (sku) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    setLoading(true);
    try {
      await authenticatedRequest({
        method: 'delete',
        url: `http://localhost:5000/api/sp/products/${sku}`
      });
      fetchAmazonProducts();
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchSku) {
      fetchAmazonProducts(); // If search is empty, fetch all products
      return;
    }

    setLoading(true);
    try {
      const response = await authenticatedRequest({
        method: 'get',
        url: `http://localhost:5000/api/sp/products/${searchSku}`
      });
      setAmazonProducts([response.data]); // Set single product as array
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return (
    <div style={{ 
      backgroundColor: '#ffebee', 
      padding: '10px', 
      borderRadius: '4px',
      marginBottom: '1rem',
      color: '#c62828'
    }}>
      Error: {error}
    </div>
  );

  return (
    <div style={styles.container}>
      <h2>Amazon Products</h2>
      
      <div style={styles.searchForm}>
        <input
          type="text"
          placeholder="Search by SKU"
          value={searchSku}
          onChange={(e) => setSearchSku(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button} onClick={handleSearch}>Search</button>
      </div>

      <form onSubmit={handleSubmitToAmazon} style={styles.form}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Product Type"
          value={newProduct.productType}
          onChange={(e) => setNewProduct({...newProduct, productType: e.target.value})}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Brand"
          value={newProduct.brand}
          onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Manufacturer"
          value={newProduct.manufacturer}
          onChange={(e) => setNewProduct({...newProduct, manufacturer: e.target.value})}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Suggested ASIN"
          value={newProduct.suggestedAsin}
          onChange={(e) => setNewProduct({...newProduct, suggestedAsin: e.target.value})}
          style={styles.input}
        />
        <select
          value={newProduct.identifierType}
          onChange={(e) => setNewProduct({...newProduct, identifierType: e.target.value})}
          style={styles.input}
        >
          <option value="UPC">UPC</option>
          <option value="EAN">EAN</option>
          <option value="ISBN">ISBN</option>
        </select>
        <input
          type="text"
          placeholder="Identifier Value"
          value={newProduct.identifierValue}
          onChange={(e) => setNewProduct({...newProduct, identifierValue: e.target.value})}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="SKU"
          value={newProduct.sku}
          onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Create Amazon Product</button>
      </form>

      <div style={styles.productList}>
        <h3>Amazon Products</h3>
        {amazonProducts
          .filter(product => searchSku === '' || (product.sku || '').toLowerCase().includes((searchSku || '').toLowerCase()))
          .map(product => (
          <div key={product.sku} style={styles.productCard}>
            <h3>{product.summaries?.[0]?.itemName || product.sku}</h3>
            <p>SKU: {product.sku}</p>
            <p>ASIN: {product.summaries?.[0]?.asin || 'N/A'}</p>
            <p>Status: {product.issues?.length ? 'Has Issues' : 'Valid'}</p>
            {product.issues?.length > 0 && (
              <div style={{ color: 'red', marginBottom: '10px' }}>
                {product.issues.map((issue, index) => (
                  <p key={index}>
                    {issue.severity}: {issue.message}
                    {issue.enforcements?.actions?.map(action => 
                      <span key={action.action}> ({action.action})</span>
                    )}
                  </p>
                ))}
              </div>
            )}
            <p>Price: ${product.offers?.[0]?.price?.amount || 'N/A'}</p>
            <button 
              onClick={() => setSelectedProduct(product)}
              style={styles.button}
            >
              Edit
            </button>
            <button 
              onClick={() => handleDeleteProduct(product.sku)}
              style={{...styles.button, backgroundColor: '#dc3545'}}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Edit Product</h3>
            <input
              type="text"
              value={selectedProduct.attributes?.item_name?.[0]?.value || ''}
              onChange={(e) => setSelectedProduct({
                ...selectedProduct,
                attributes: {
                  ...selectedProduct.attributes,
                  item_name: [{
                    value: e.target.value,
                    language_tag: "en_US",
                    marketplace_id: "ATVPDKIKX0DER"
                  }]
                }
              })}
              style={styles.input}
            />
            <input
              type="number"
              value={(selectedProduct.attributes?.list_price?.[0]?.value / 100) || ''}
              onChange={(e) => setSelectedProduct({
                ...selectedProduct,
                attributes: {
                  ...selectedProduct.attributes,
                  list_price: [{
                    value: Math.round(parseFloat(e.target.value) * 100),
                    currency: "USD",
                    marketplace_id: "ATVPDKIKX0DER"
                  }]
                }
              })}
              style={styles.input}
            />
            <button 
              onClick={() => handleUpdateProduct(selectedProduct.sku)}
              style={styles.button}
            >
              Save Changes
            </button>
            <button 
              onClick={() => setSelectedProduct(null)}
              style={{...styles.button, backgroundColor: '#6c757d'}}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem'
  },
  form: {
    marginBottom: '2rem'
  },
  input: {
    marginRight: '1rem',
    padding: '0.5rem'
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px'
  },
  productList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem'
  },
  productCard: {
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '4px',
    minWidth: '300px'
  },
  searchForm: {
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center'
  }
};

export default Products; 