import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', newProduct);
      setNewProduct({ name: '', price: '', stock: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Products</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Product</button>
      </form>

      <div style={styles.productList}>
        {products.map(product => (
          <div key={product.id} style={styles.productCard}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
          </div>
        ))}
      </div>
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
  }
};

export default Products; 