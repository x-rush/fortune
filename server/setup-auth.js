require('dotenv').config({ path: '../.env' });
const bcrypt = require('bcrypt');
const fs = require('fs');

async function setupAuth() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  // 验证必要的环境变量
  if (!username || !password) {
    console.error('Missing required environment variables: ADMIN_USERNAME, ADMIN_PASSWORD');
    console.error('Please set these variables in your .env file');
    process.exit(1);
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const db = JSON.parse(fs.readFileSync('db.json', 'UTF-8'));

  db.auth = {
    admin: {
      username: username,
      password: hashedPassword
    }
  };

  fs.writeFileSync('db.json', JSON.stringify(db, null, 2));

  // 确保联系消息文件存在
  if (!fs.existsSync('contact-messages.json')) {
    const contactDb = { contactMessages: [] };
    fs.writeFileSync('contact-messages.json', JSON.stringify(contactDb, null, 2));
    console.log('📝 Contact messages database created');
  }

  console.log('✅ Auth setup completed');
  console.log('🔑 Username:', username);
  console.log('🔑 Password:', password);
  console.log('🔐 Password hashed and stored securely');
  console.log('📁 Database files: db.json, contact-messages.json');
  console.log('📝 Admin credentials loaded from environment variables');
}

setupAuth().catch(console.error);