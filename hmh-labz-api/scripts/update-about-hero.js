import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Load .env variables
dotenv.config({ path: path.resolve('.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function run() {
  console.log("Updating aboutContent 'global' record...");
  try {
    const updated = await prisma.aboutContent.upsert({
      where: { id: 'global' },
      update: {
        heroTitle: "A studio that<br class=\"hidden md:block\" /> <span class=\"frauncesItalic text-terra\">tells&nbsp;you</span> what to do,<br class=\"hidden md:block\" /> and then does it.",
        heroBadge: "ISSUE # 26.05",
        heroText: "HMH Labz is a small strategy & build studio for legal, recruitment and professional-services firms. We diagnose, recommend, and ship — under one roof, on one contract.",
        heroStats: [
          { id: "1", value: "2023", label: "FOUNDED . DUBAI" },
          { id: "2", value: "38", label: "ENGAGEMENTS SHIPPED" },
          { id: "3", value: "06", label: "ACTIVE CLIENTS - HARD CAP" },
          { id: "4", value: "02", label: "HUBS - DUBAI & CHENNAI" }
        ]
      },
      create: {
        id: 'global',
        heroTitle: "A studio that<br class=\"hidden md:block\" /> <span class=\"frauncesItalic text-terra\">tells&nbsp;you</span> what to do,<br class=\"hidden md:block\" /> and then does it.",
        heroBadge: "ISSUE # 26.05",
        heroText: "HMH Labz is a small strategy & build studio for legal, recruitment and professional-services firms. We diagnose, recommend, and ship — under one roof, on one contract.",
        heroStats: [
          { id: "1", value: "2023", label: "FOUNDED . DUBAI" },
          { id: "2", value: "38", label: "ENGAGEMENTS SHIPPED" },
          { id: "3", value: "06", label: "ACTIVE CLIENTS - HARD CAP" },
          { id: "4", value: "02", label: "HUBS - DUBAI & CHENNAI" }
        ]
      }
    });
    console.log("Database updated successfully!", JSON.stringify(updated, null, 2));
  } catch (error) {
    console.error("Failed to update database:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

run();
