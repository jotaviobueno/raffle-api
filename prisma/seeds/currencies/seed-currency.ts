import { PrismaClient } from '@prisma/client';
import { data } from './data';

const prisma = new PrismaClient();

async function main() {
  return prisma.$transaction(
    async (tx) => {
      await tx.currency.createMany({
        data,
      });
    },
    {
      maxWait: 20000, // default: 2000
      timeout: 50000, // default: 5000
    },
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
