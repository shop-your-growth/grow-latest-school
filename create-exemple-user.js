// Create user with the email you're actually typing
const Database = require('better-sqlite3');
const crypto = require('crypto');

// Open the database
const db = new Database('./sqlite.db');

// Hash password function (simple for demo)
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Generate random ID
function generateId() {
  return crypto.randomBytes(16).toString('hex');
}

try {
  // Create admin user with the email you're typing
  const userId = generateId();
  const hashedPassword = hashPassword('password123');
  
  // Insert user
  const insertUser = db.prepare(`
    INSERT INTO user (id, name, email, emailVerified, image, createdAt, updatedAt, role, firstName, lastName, avatar, isActive)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const now = new Date().toISOString();
  
  insertUser.run(
    userId,
    'Admin User',
    'admin@exemple.com', // The email you're actually typing
    now, // emailVerified
    null, // image
    now, // createdAt
    now, // updatedAt
    'admin', // role
    'Admin', // firstName
    'User', // lastName
    null, // avatar
    1 // isActive
  );
  
  // Insert account (for email/password auth)
  const insertAccount = db.prepare(`
    INSERT INTO account (id, accountId, providerId, userId, accessToken, refreshToken, idToken, accessTokenExpiresAt, refreshTokenExpiresAt, scope, password, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  insertAccount.run(
    generateId(), // id
    generateId(), // accountId
    'credential', // providerId
    userId, // userId
    null, // accessToken
    null, // refreshToken
    null, // idToken
    null, // accessTokenExpiresAt
    null, // refreshTokenExpiresAt
    null, // scope
    hashedPassword, // password
    now, // createdAt
    now // updatedAt
  );
  
  console.log('✅ Admin user created successfully!');
  console.log('📧 Email: admin@exemple.com');
  console.log('🔑 Password: password123');
  
} catch (error) {
  if (error.message.includes('UNIQUE constraint failed')) {
    console.log('✅ User already exists with email: admin@exemple.com');
    console.log('🔑 Password: password123');
  } else {
    console.error('❌ Error creating admin user:', error.message);
  }
} finally {
  db.close();
}
