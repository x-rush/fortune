const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // 获取配置的用户名和密码
    const configuredUsername = process.env.ADMIN_USERNAME;
    const configuredPassword = process.env.ADMIN_PASSWORD;
    const JWT_SECRET = process.env.JWT_SECRET;

    // 验证必要的环境变量
    if (!configuredUsername || !configuredPassword || !JWT_SECRET) {
      console.error('Missing required environment variables: ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // 动态获取数据库文件路径
    const dbPath = path.join(__dirname, '../server/db.json');
    let db;

    try {
      const data = fs.readFileSync(dbPath, 'UTF-8');
      db = JSON.parse(data);
    } catch (error) {
      // 如果数据库文件不存在，直接使用环境变量验证
      if (username === configuredUsername) {
        const isValid = password === configuredPassword;
        if (isValid) {
          const token = jwt.sign(
            { username, role: 'admin' },
            JWT_SECRET,
            { expiresIn: '24h' }
          );
          return res.json({ token, username, role: 'admin' });
        }
      }
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 验证用户名和密码
    if (username === configuredUsername && username === db.auth.admin.username) {
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

    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};