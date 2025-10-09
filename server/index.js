const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3001;

// 环境变量
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'indexoob@2025';

// 中间件
app.use(cors());
app.use(express.json());

// 数据文件路径
const DB_PATH = path.join(__dirname, 'db.json');
const CONTACT_PATH = path.join(__dirname, 'contact-messages.json');

// 初始化数据文件
async function initializeData() {
  try {
    // 初始化产品数据库
    if (!fs.existsSync(DB_PATH)) {
      const defaultProducts = {
        products: [
          {
            id: 1,
            name: "智能办公系统",
            description: "基于AI的企业办公自动化解决方案，提升工作效率300%",
            image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=500",
            category: "企业软件",
            features: ["AI智能助手", "流程自动化", "数据分析"],
            link: "#",
            createdAt: "2024-01-15"
          },
          {
            id: 2,
            name: "移动商城App",
            description: "全功能电商平台，支持多端同步，日处理订单10万+",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500",
            category: "移动应用",
            features: ["多端同步", "支付集成", "实时物流"],
            link: "#",
            createdAt: "2024-01-20"
          },
          {
            id: 3,
            name: "企业数据分析平台",
            description: "实时数据可视化，助力企业精准决策",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
            category: "数据服务",
            features: ["实时分析", "可视化报表", "预测模型"],
            link: "#",
            createdAt: "2024-01-25"
          }
        ]
      };
      fs.writeFileSync(DB_PATH, JSON.stringify(defaultProducts, null, 2));
    }

    // 初始化联系消息文件
    if (!fs.existsSync(CONTACT_PATH)) {
      fs.writeFileSync(CONTACT_PATH, JSON.stringify({ contactMessages: [] }, null, 2));
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}

// 读取数据文件
function readData(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return filePath === DB_PATH ? { products: [] } : { contactMessages: [] };
  }
}

// 写入数据文件
function writeData(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing data file:', error);
    return false;
  }
}

// 获取下一个ID
function getNextId(items) {
  const maxId = Math.max(...items.map(item => parseInt(item.id) || 0), 0);
  return maxId + 1;
}

// 认证中间件
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

// === 公开路由 ===

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', server: 'Express', timestamp: new Date().toISOString() });
});

// 获取所有产品
app.get('/api/products', (req, res) => {
  try {
    const db = readData(DB_PATH);
    res.set('X-Total-Count', db.products.length.toString());
    res.json(db.products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 获取单个产品
app.get('/api/products/:id', (req, res) => {
  try {
    const db = readData(DB_PATH);
    const product = db.products.find(p => p.id == req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// 提交联系表单
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const contactData = readData(CONTACT_PATH);
    const newMessage = {
      id: getNextId(contactData.contactMessages),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      read: false
    };

    contactData.contactMessages.push(newMessage);
    if (writeData(CONTACT_PATH, contactData)) {
      res.status(201).json({
        success: true,
        message: 'Contact form submitted successfully',
        data: newMessage
      });
    } else {
      res.status(500).json({ error: 'Failed to save message' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// === 认证路由 ===

// 登录
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // 环境变量验证
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        { username, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      return res.json({ token, username, role: 'admin' });
    }

    res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// 验证认证
app.post('/api/verify-auth', authenticateToken, (req, res) => {
  if (req.user && req.user.role === 'admin') {
    res.json({ valid: true, user: req.user });
  } else {
    res.status(403).json({ error: 'Unauthorized access' });
  }
});

// === 管理员路由（需要认证）===

// 产品 CRUD
app.post('/admin/products', authenticateToken, (req, res) => {
  try {
    const db = readData(DB_PATH);
    const newProduct = {
      ...req.body,
      id: getNextId(db.products),
      createdAt: new Date().toISOString()
    };
    db.products.push(newProduct);

    if (writeData(DB_PATH, db)) {
      res.status(201).json(newProduct);
    } else {
      res.status(500).json({ error: 'Failed to create product' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/admin/products/:id', authenticateToken, (req, res) => {
  try {
    const db = readData(DB_PATH);
    const index = db.products.findIndex(p => p.id == req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updatedProduct = {
      ...db.products[index],
      ...req.body,
      id: db.products[index].id,
      updatedAt: new Date().toISOString()
    };

    db.products[index] = updatedProduct;

    if (writeData(DB_PATH, db)) {
      res.json(updatedProduct);
    } else {
      res.status(500).json({ error: 'Failed to update product' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/admin/products/:id', authenticateToken, (req, res) => {
  try {
    const db = readData(DB_PATH);
    const index = db.products.findIndex(p => p.id == req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    db.products.splice(index, 1);

    if (writeData(DB_PATH, db)) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// 联系消息管理
app.get('/api/admin/contact-messages', authenticateToken, (req, res) => {
  try {
    const contactData = readData(CONTACT_PATH);
    res.set('X-Total-Count', contactData.contactMessages.length.toString());
    res.json(contactData.contactMessages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.put('/api/admin/contact-messages/:id/read', authenticateToken, (req, res) => {
  try {
    const contactData = readData(CONTACT_PATH);
    const message = contactData.contactMessages.find(m => m.id == req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    message.read = true;

    if (writeData(CONTACT_PATH, contactData)) {
      res.json({ success: true, message: 'Message marked as read' });
    } else {
      res.status(500).json({ error: 'Failed to update message' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update message' });
  }
});

app.delete('/api/admin/contact-messages/:id', authenticateToken, (req, res) => {
  try {
    const contactData = readData(CONTACT_PATH);
    const index = contactData.contactMessages.findIndex(m => m.id == req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Message not found' });
    }

    contactData.contactMessages.splice(index, 1);

    if (writeData(CONTACT_PATH, contactData)) {
      res.json({ success: true, message: 'Message deleted' });
    } else {
      res.status(500).json({ error: 'Failed to delete message' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

app.delete('/api/admin/contact-messages', authenticateToken, (req, res) => {
  try {
    const contactData = readData(CONTACT_PATH);
    contactData.contactMessages = [];

    if (writeData(CONTACT_PATH, contactData)) {
      res.json({ success: true, message: 'All messages cleared' });
    } else {
      res.status(500).json({ error: 'Failed to clear messages' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear messages' });
  }
});

// 错误处理
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// 静态文件服务（用于生产环境）
app.use(express.static(path.join(__dirname, '../build')));

// SPA 路由支持
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// 启动服务器
async function startServer() {
  await initializeData();

  app.listen(port, () => {
    console.log(`🚀 Express server running on port ${port}`);
    console.log(`📡 API: http://localhost:${port}/api`);
    console.log(`🔐 Login: http://localhost:${port}/api/login`);
    console.log(`🎯 Health: http://localhost:${port}/api/health`);
    console.log(`📱 Frontend: http://localhost:3000`);
    console.log(`🔑 Admin Username: ${ADMIN_USERNAME}`);
    console.log(`✅ Pure Express server (replacing JSON Server)`);
  });
}

startServer();