const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function seed() {
  const email = 'admin@example.com';
  const password = 'admin123';
  
  // Check if admin already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log('Admin user already exists');
    await prisma.$disconnect();
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create admin user
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  });

  console.log('Admin user created successfully!');
  console.log(`Email: ${email}`);
  console.log('Password: admin123');
  console.log('\nPlease change the password after first login.\n');

  await prisma.$disconnect();
}

seed().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
