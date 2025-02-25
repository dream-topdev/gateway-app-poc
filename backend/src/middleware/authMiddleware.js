const authMiddleware = (req, res, next) => {
  const sellerId = req.query.sellerId || req.body.sellerId;
  const authHeader = req.headers.authorization;

  if (!sellerId || !authHeader) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Invalid token format' });
  }

  // Store the sellerId and token in the request for use in protected routes
  req.sellerId = sellerId;
  req.token = token;

  next();
};

module.exports = authMiddleware; 