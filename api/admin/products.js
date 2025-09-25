const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

module.exports = (req, res) => {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 认证中间件
  authenticateToken(req, res, () => {
    // 检查是否为管理员
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    try {
      // 读取产品数据库
      const data = fs.readFileSync(path.join(__dirname, '../../server/db.json'), 'UTF-8');
      const db = JSON.parse(data);
      let products = db.products || [];

      if (req.method === 'GET') {
        return res.json(products);
      }

      if (req.method === 'POST') {
        const newProduct = {
          id: Date.now(),
          ...req.body,
          createdAt: new Date().toISOString()
        };

        products.push(newProduct);
        db.products = products;
        fs.writeFileSync(path.join(__dirname, '../../server/db.json'), JSON.stringify(db, null, 2));

        return res.status(201).json(newProduct);
      }

      if (req.method === 'PUT') {
        const productId = parseInt(req.query.id);
        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) {
          return res.status(404).json({ error: 'Product not found' });
        }

        products[productIndex] = { ...products[productIndex], ...req.body };
        db.products = products;
        fs.writeFileSync(path.join(__dirname, '../../server/db.json'), JSON.stringify(db, null, 2));

        return res.json(products[productIndex]);
      }

      if (req.method === 'DELETE') {
        const productId = parseInt(req.query.id);
        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) {
          return res.status(404).json({ error: 'Product not found' });
        }

        products.splice(productIndex, 1);
        db.products = products;
        fs.writeFileSync(path.join(__dirname, '../../server/db.json'), JSON.stringify(db, null, 2));

        return res.json({ success: true, message: 'Product deleted' });
      }

      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
      console.error('Error handling products:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
};