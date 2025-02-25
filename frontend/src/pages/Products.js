import React, { useState, useEffect } from 'react';
import { authenticatedRequest } from '../utils/axiosConfig';

function Products() {
  const [amazonProducts, setAmazonProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: 'Test Product XYZ',
    price: '29.99',
    stock: '100',
    productType: 'TOYS_AND_GAMES',
    brand: 'TestBrand',
    manufacturer: 'TestManufacturer Inc.',
    browseNodeId: '165793011',
    identifierType: 'UPC',
    identifierValue: '012345678901'
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAmazonProducts();
  }, []);

  const fetchAmazonProducts = async () => {
    try {
      const response = await authenticatedRequest({
        method: 'get',
        url: 'http://localhost:5000/api/sp/inventory'
      });
      setAmazonProducts(response.data.payload || []);
    } catch (error) {
      console.error('Error fetching Amazon products:', error);
      setError('Failed to fetch Amazon products');
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
        stock: '',
        productType: '',
        brand: '',
        manufacturer: '',
        browseNodeId: '',
        identifierType: 'UPC',
        identifierValue: ''
      });
      fetchAmazonProducts();
      alert('Product submitted to Amazon successfully!');
    } catch (error) {
      console.error('Error creating Amazon product:', error);
      setError(error.message || 'Error creating product on Amazon');
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
      console.error('Error updating product:', error);
      setError('Failed to update product');
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
      console.error('Error deleting product:', error);
      setError('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h2>Amazon Products</h2>
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
          placeholder="Browse Node ID"
          value={newProduct.browseNodeId}
          onChange={(e) => setNewProduct({...newProduct, browseNodeId: e.target.value})}
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
        <button type="submit" style={styles.button}>Create Amazon Product</button>
      </form>

      <div style={styles.productList}>
        <h3>Amazon Products</h3>
        {amazonProducts.map(product => (
          <div key={product.sku} style={styles.productCard}>
            <h3>{product.details?.title || product.sku}</h3>
            <p>SKU: {product.sku}</p>
            <p>Status: {product.status}</p>
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
              value={selectedProduct.details?.title || ''}
              onChange={(e) => setSelectedProduct({
                ...selectedProduct,
                details: { ...selectedProduct.details, title: e.target.value }
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
  }
};

export default Products; 