const express = require('express');
const jsonServer = require('json-server');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

app.use(cors());
app.use(express.json());

const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const db = JSON.parse(fs.readFileSync('db.json', 'UTF-8'));

app.use('/api', middlewares);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  if (username === db.auth.admin.username) {
    const isValid = await bcrypt.compare(password, db.auth.admin.password);
    if (isValid) {
      const token = jwt.sign(
        { username, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      return res.json({ token, username, role: 'admin' });
    }
  }

  res.status(401).json({ error: 'Invalid credentials' });
});

app.post('/api/verify-auth', authenticateToken, (req, res) => {
  // Double-check that the user is actually an admin
  if (req.user && req.user.role === 'admin') {
    res.json({ valid: true, user: req.user });
  } else {
    res.status(403).json({ error: 'Unauthorized access' });
  }
});

// 公开访问的产品数据
app.get('/api/products', (req, res) => {
  res.json(db.products);
});

// 需要认证的API
app.use('/api/admin', authenticateToken, router);

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📡 API: http://localhost:${port}/api`);
  console.log(`🎯 Login: http://localhost:${port}/api/login`);
  console.log(`📱 Frontend: http://localhost:3000`);
});