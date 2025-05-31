import bcrypt from 'bcryptjs';
import 'dotenv/config';
import { db, usersTable } from './index';

async function seed() {
  console.log('🌱 Starting database seeding...');

  try {

    // Hash password for demo users
    const passwordHash = await bcrypt.hash('password123', 12);

    // Create demo users
    const demoUsers = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
        displayName: 'System Administrator',
        age: 35
      },
      {
        name: 'John Teacher',
        email: 'teacher@example.com',
        firstName: 'John',
        lastName: 'Teacher',
        role: 'TEACHER',
        displayName: 'Mr. Teacher',
        age: 40
      },
      {
        name: 'Jane Student',
        email: 'student@example.com',
        firstName: 'Jane',
        lastName: 'Student',
        role: 'STUDENT',
        displayName: 'Jane S.',
        age: 20
      },
      {
        name: 'Bob Parent',
        email: 'parent@example.com',
        firstName: 'Bob',
        lastName: 'Parent',
        role: 'PARENT',
        displayName: 'Bob Parent',
        age: 45
      },
      {
        name: 'Alice Finance',
        email: 'finance@example.com',
        firstName: 'Alice',
        lastName: 'Finance',
        role: 'FINANCE',
        displayName: 'Alice Finance',
        age: 32
      },
      {
        name: 'Mike Marketing',
        email: 'marketing@example.com',
        firstName: 'Mike',
        lastName: 'Marketing',
        role: 'MARKETING',
        displayName: 'Mike Marketing',
        age: 28
      }
    ];

    for (const userData of demoUsers) {
      const users = await db
        .insert(usersTable)
        .values({
          ...userData,
          passwordHash,
          isActive: true,
          isVerified: true,
        })
        .returning();

      console.log(`✅ Created user: ${users[0].email} (${users[0].role})`);
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Demo Credentials:');
    console.log('Email: admin@example.com | Password: password123');
    console.log('Email: teacher@example.com | Password: password123');
    console.log('Email: student@example.com | Password: password123');
    console.log('Email: parent@example.com | Password: password123');
    console.log('Email: finance@example.com | Password: password123');
    console.log('Email: marketing@example.com | Password: password123');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

// Run the seed function
if (require.main === module) {
  seed()
    .catch((error) => {
      console.error('Seed script failed:', error);
      process.exit(1);
    })
    .finally(() => {
      process.exit(0);
    });
}

export default seed;
