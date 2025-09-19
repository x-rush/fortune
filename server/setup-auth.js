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
  console.log('✅ Auth setup completed');
  console.log('🔑 Username: admin');
  console.log('🔑 Password: indexoob@2025');
  console.log('🔐 Password hashed and stored securely');
}

setupAuth().catch(console.error);