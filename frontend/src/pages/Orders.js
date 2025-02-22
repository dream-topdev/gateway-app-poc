import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sp/orders');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching orders');
      setLoading(false);
      console.error('Error:', error);
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h2>Orders</h2>
      <div style={styles.orderList}>
        {orders.map(order => (
          <div key={order.AmazonOrderId} style={styles.orderCard}>
            <h3>Order #{order.AmazonOrderId}</h3>
            <p>Status: {order.OrderStatus}</p>
            <p>Purchase Date: {new Date(order.PurchaseDate).toLocaleDateString()}</p>
            <p>Total: {order.OrderTotal?.Amount} {order.OrderTotal?.CurrencyCode}</p>
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
  orderList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem'
  },
  orderCard: {
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff'
  }
};

export default Orders; 