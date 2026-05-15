import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const USERS = [
  { email: 'hello@hmhlabz.com', role: 'SUPERADMIN', name: 'HMH Admin' },
  { email: 'steve@hmhlabz.com', role: 'MODERATOR', name: 'Steve' }
];

async function main() {
  console.log('🛡️  Seeding/Updating User Roles...');
  const defaultPassword = await bcrypt.hash('Labz2024!', 12);

  for (const user of USERS) {
    try {
      const existing = await prisma.user.findUnique({ where: { email: user.email } });
      
      if (existing) {
        await prisma.user.update({
          where: { email: user.email },
          data: { role: user.role }
        });
        console.log(`✅ Updated ${user.email} to ${user.role}`);
      } else {
        await prisma.user.create({
          data: {
            email: user.email,
            password: defaultPassword,
            name: user.name,
            role: user.role
          }
        });
        console.log(`🚀 Created ${user.email} with role ${user.role} (Default Pass: Labz2024!)`);
      }
    } catch (err) {
      console.error(`❌ Operation failed for ${user.email}:`, err.message);
    }
  }
}

main()
  .catch((e) => {
    console.error('❌ Sync failed:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
