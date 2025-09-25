const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // 读取联系消息数据库
      let contactDb;
      try {
        const data = fs.readFileSync(path.join(__dirname, '../server/contact-messages.json'), 'UTF-8');
        contactDb = JSON.parse(data);
      } catch (error) {
        contactDb = { contactMessages: [] };
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
      fs.writeFileSync(path.join(__dirname, '../server/contact-messages.json'), JSON.stringify(contactDb, null, 2));

      return res.status(201).json({
        success: true,
        message: 'Contact form submitted successfully',
        data: newMessage
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  res.setHeader('Allow', ['POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
};