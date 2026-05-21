import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Clearing global AboutContent...');
  try {
    await prisma.aboutContent.delete({
      where: { id: 'global' },
    });
    console.log('Successfully cleared global AboutContent.');
  } catch (error) {
    console.log('AboutContent global record not found or already deleted:', error.message);
  }
}

main()
  .catch((e) => {
    console.error('Failed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
