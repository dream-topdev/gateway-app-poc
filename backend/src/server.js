require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');
const ordersService = require('./services/ordersService');
const authController = require('./controllers/authController');
const amazonProductsService = require('./services/amazonProductsService');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Public auth routes
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

app.post('/api/auth/refresh', async (req, res) => {
  try {
    const { refresh_token } = req.body;
    const tokens = await authController.refreshToken(refresh_token);
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Protected routes
app.use('/api/sp', authMiddleware);

// Orders routes
app.get('/api/sp/orders', async (req, res) => {
  try {
    const orders = await ordersService.getOrders(req.sellerId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Products routes
app.post('/api/sp/products', async (req, res) => {
  try {
    const product = await amazonProductsService.createProduct(req.body, req.sellerId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sp/products/:sku', async (req, res) => {
  try {
    const { sku } = req.params;
    const product = await amazonProductsService.getProduct(sku, req.sellerId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/sp/products/:sku', async (req, res) => {
  try {
    const { sku } = req.params;
    const { ...productData } = req.body;
    const product = await amazonProductsService.updateProduct(sku, productData, req.sellerId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/sp/products/:sku', async (req, res) => {
  try {
    const { sku } = req.params;
    const result = await amazonProductsService.deleteProduct(sku, req.sellerId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sp/inventory', async (req, res) => {
  try {
    const inventory = await amazonProductsService.getInventory(req.sellerId);
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 