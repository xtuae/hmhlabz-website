/**
 * Superadmin Seeder Script
 * 
 * Seeds the primary admin user into the Neon PostgreSQL database.
 * Safe to run multiple times — skips creation if user already exists.
 * 
 * Usage:
 *   node scripts/seedAdmin.js
 * 
 * Requires:
 *   - DATABASE_URL set in .env (loaded via dotenv)
 *   - Prisma client generated (npx prisma generate)
 *   - @prisma/adapter-pg and pg installed
 */

import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Create native pg pool with the Neon connection string
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create the Prisma v7 driver adapter
const adapter = new PrismaPg(pool);

// Pass the adapter to PrismaClient (Prisma v7 pattern)
const prisma = new PrismaClient({ adapter });

const ADMIN_EMAIL = 'hello@hmhlabz.com';
const ADMIN_PASSWORD = 'C@rdlm4283';
const ADMIN_ROLE = 'SUPERADMIN';

async function main() {
  console.log('🔍 Checking for existing Superadmin...');

  const existing = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existing) {
    console.log(`✅ User "${ADMIN_EMAIL}" already exists (role: ${existing.role}). Skipping.`);
    return;
  }

  console.log('🔐 Hashing password...');
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

  console.log('📝 Creating Superadmin user...');
  const user = await prisma.user.create({
    data: {
      email: ADMIN_EMAIL,
      password: hashedPassword,
      name: 'HMH Admin',
      role: ADMIN_ROLE,
    },
  });

  console.log(`🚀 Superadmin created successfully!`);
  console.log(`   ID:    ${user.id}`);
  console.log(`   Email: ${user.email}`);
  console.log(`   Role:  ${user.role}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeder failed:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
