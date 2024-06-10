import { PrismaClient } from '@prisma/client';
import { data } from './data';

const prisma = new PrismaClient();

export async function seedThemes() {
  return prisma.$transaction(
    async (tx) => {
      await tx.theme.createMany({
        data: data.map((code) => ({ code, deletedAt: null })),
      });
    },
    {
      maxWait: 20000, // default: 2000
      timeout: 50000, // default: 5000
    },
  );
}
