import { PrismaClient } from '@prisma/client';
import { data } from './data';

const prisma = new PrismaClient();

export async function seedGateway() {
  return prisma.$transaction(
    async (tx) => {
      for (const gateway of data) {
        await tx.gateway.upsert({
          where: {
            code: gateway.code,
          },
          update: {
            name: gateway.name,
            code: gateway.code,
          },
          create: {
            code: gateway.code,
            name: gateway.name,
            paymentMethods: {
              createMany: {
                data: gateway.methods.map((method) => ({
                  code: method.code,
                  name: method.name,
                  isActive: method.isActive,
                  instructions: method.instructions,
                  deletedAt: null,
                })),
                skipDuplicates: true,
              },
            },
          },
        });
      }
    },
    {
      maxWait: 20000, // default: 2000
      timeout: 50000, // default: 5000
    },
  );
}
