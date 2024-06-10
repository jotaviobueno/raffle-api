import { PrismaClient } from '@prisma/client';
import { data } from './data';

const prisma = new PrismaClient();

export async function seedTicketStatus() {
  return prisma.$transaction(
    async (tx) => {
      await tx.ticketStatus.createMany({ data });
    },
    {
      maxWait: 20000, // default: 2000
      timeout: 50000, // default: 5000
    },
  );
}
