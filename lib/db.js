import { PrismaClient } from '@prisma/client';

let prisma;

export const getPrisma = () => {
  if (!prisma) {
    prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
    });
  }
  return prisma;
};

export default getPrisma;
