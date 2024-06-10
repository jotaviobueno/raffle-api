import { PrismaClient } from '@prisma/client';
import { data } from './data';

const prisma = new PrismaClient();

export async function seedPlanCycle() {
  return prisma.$transaction(
    async (tx) => {
      await tx.planCycle.createMany({ data });
    },
    {
      maxWait: 20000, // default: 2000
      timeout: 50000, // default: 5000
    },
  );
}
