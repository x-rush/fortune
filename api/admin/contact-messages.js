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
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
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
      // 读取联系消息数据库
      let contactDb;
      try {
        const data = fs.readFileSync(path.join(__dirname, '../../server/contact-messages.json'), 'UTF-8');
        contactDb = JSON.parse(data);
      } catch (error) {
        contactDb = { contactMessages: [] };
      }

      const contactMessages = contactDb.contactMessages || [];

      if (req.method === 'GET') {
        return res.json(contactMessages);
      }

      if (req.method === 'PUT') {
        const messageId = parseInt(req.query.id);
        const message = contactMessages.find(msg => msg.id === messageId);

        if (!message) {
          return res.status(404).json({ error: 'Message not found' });
        }

        message.read = true;
        fs.writeFileSync(path.join(__dirname, '../../server/contact-messages.json'), JSON.stringify(contactDb, null, 2));

        return res.json({ success: true, message: 'Message marked as read' });
      }

      if (req.method === 'DELETE') {
        if (req.query.id) {
          // 删除单个消息
          const messageId = parseInt(req.query.id);
          const messageIndex = contactMessages.findIndex(msg => msg.id === messageId);

          if (messageIndex === -1) {
            return res.status(404).json({ error: 'Message not found' });
          }

          contactMessages.splice(messageIndex, 1);
        } else {
          // 删除所有消息
          contactMessages = [];
        }

        contactDb.contactMessages = contactMessages;
        fs.writeFileSync(path.join(__dirname, '../../server/contact-messages.json'), JSON.stringify(contactDb, null, 2));

        return res.json({
          success: true,
          message: req.query.id ? 'Message deleted' : 'All messages cleared'
        });
      }

      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
      console.error('Error handling contact messages:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
};