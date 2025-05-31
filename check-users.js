// Check what users exist in the database
const Database = require('better-sqlite3');

// Open the database
const db = new Database('./sqlite.db');

try {
  // Get all users
  const users = db.prepare('SELECT * FROM user').all();
  
  console.log('📊 Users in database:');
  console.log('='.repeat(50));
  
  if (users.length === 0) {
    console.log('❌ No users found in database!');
  } else {
    users.forEach((user, index) => {
      console.log(`👤 User ${index + 1}:`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Active: ${user.isActive}`);
      console.log(`   Created: ${user.createdAt}`);
      console.log('');
    });
  }
  
  // Get all accounts
  const accounts = db.prepare('SELECT * FROM account').all();
  
  console.log('🔑 Accounts in database:');
  console.log('='.repeat(50));
  
  if (accounts.length === 0) {
    console.log('❌ No accounts found in database!');
  } else {
    accounts.forEach((account, index) => {
      console.log(`🔐 Account ${index + 1}:`);
      console.log(`   ID: ${account.id}`);
      console.log(`   Provider: ${account.providerId}`);
      console.log(`   User ID: ${account.userId}`);
      console.log(`   Has Password: ${account.password ? 'Yes' : 'No'}`);
      console.log('');
    });
  }
  
} catch (error) {
  console.error('❌ Error checking database:', error.message);
} finally {
  db.close();
}
