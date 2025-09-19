const bcrypt = require('bcrypt');
const fs = require('fs');

async function setupAuth() {
  const password = 'indexoob@2025';
  const hashedPassword = await bcrypt.hash(password, 10);

  const db = JSON.parse(fs.readFileSync('db.json', 'UTF-8'));

  db.auth = {
    admin: {
      username: 'admin',
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
  console.log('🔑 Username: admin');
  console.log('🔑 Password: indexoob@2025');
  console.log('🔐 Password hashed and stored securely');
  console.log('📁 Database files: db.json, contact-messages.json');
}

setupAuth().catch(console.error);