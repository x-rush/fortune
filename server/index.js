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

// 联系消息数据库
let contactDb;
try {
  contactDb = JSON.parse(fs.readFileSync('contact-messages.json', 'UTF-8'));
} catch (error) {
  contactDb = { contactMessages: [] };
  fs.writeFileSync('contact-messages.json', JSON.stringify(contactDb, null, 2));
}

// 保存联系消息数据库
const saveContactDb = () => {
  fs.writeFileSync('contact-messages.json', JSON.stringify(contactDb, null, 2));
};

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

// 联系表单提交（公开访问）
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newMessage = {
      id: Date.now(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      read: false
    };

    contactDb.contactMessages = contactDb.contactMessages || [];
    contactDb.contactMessages.unshift(newMessage);

    // 保存到联系消息数据库文件
    saveContactDb();

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: newMessage
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 联系消息管理API（需要认证）
app.get('/api/admin/contact-messages', authenticateToken, (req, res) => {
  try {
    const messages = contactDb.contactMessages || [];
    res.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/admin/contact-messages/:id/read', authenticateToken, (req, res) => {
  try {
    const messageId = parseInt(req.params.id);
    const message = contactDb.contactMessages.find(msg => msg.id === messageId);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    message.read = true;
    saveContactDb();

    res.json({ success: true, message: 'Message marked as read' });
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/admin/contact-messages/:id', authenticateToken, (req, res) => {
  try {
    const messageId = parseInt(req.params.id);
    const messageIndex = contactDb.contactMessages.findIndex(msg => msg.id === messageId);

    if (messageIndex === -1) {
      return res.status(404).json({ error: 'Message not found' });
    }

    contactDb.contactMessages.splice(messageIndex, 1);
    saveContactDb();

    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/admin/contact-messages', authenticateToken, (req, res) => {
  try {
    contactDb.contactMessages = [];
    saveContactDb();

    res.json({ success: true, message: 'All messages cleared' });
  } catch (error) {
    console.error('Error clearing messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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