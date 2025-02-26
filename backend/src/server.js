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
    const accessToken = req.headers.authorization.split(' ')[1];
    const orders = await ordersService.getOrders(req.sellerId, accessToken);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Products routes
app.post('/api/sp/products', async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const product = await amazonProductsService.createProduct(
      req.body,
      req.sellerId,
      accessToken
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sp/products/:sku', async (req, res) => {
  try {
    const { sku } = req.params;
    const accessToken = req.headers.authorization.split(' ')[1];
    const product = await amazonProductsService.getProductListings(req.sellerId, accessToken, ['ATVPDKIKX0DER'], [sku]);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/sp/products/:sku', async (req, res) => {
  try {
    const { sku } = req.params;
    const { ...productData } = req.body;
    const accessToken = req.headers.authorization.split(' ')[1];
    const product = await amazonProductsService.updateProduct(sku, productData, req.sellerId, accessToken);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/sp/products/:sku', async (req, res) => {
  try {
    const { sku } = req.params;
    const accessToken = req.headers.authorization.split(' ')[1];
    const result = await amazonProductsService.deleteProduct(sku, req.sellerId, accessToken);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sp/products', async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const products = await amazonProductsService.getAllProductListings(req.sellerId, accessToken);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 