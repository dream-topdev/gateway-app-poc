require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ordersService = require('./services/ordersService');
const authController = require('./controllers/authController');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock data for POC
const products = [];
const orders = [];

// Routes
app.post('/api/auth', (req, res) => {
  // Mock OAuth authentication
  res.json({ success: true, token: 'mock_token_123' });
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const product = {
    id: Date.now(),
    ...req.body
  };
  products.push(product);
  res.json(product);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.get('/api/sp/orders', async (req, res) => {
  try {
    const orders = await ordersService.getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/auth/url', (req, res) => {
  const authUrl = authController.generateAuthUrl();
  res.json({ authUrl });
});

app.get('/api/auth/callback', async (req, res) => {
  try {
    const { code, selling_partner_id } = req.query;
    const tokens = await authController.handleCallback(code, selling_partner_id);
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 