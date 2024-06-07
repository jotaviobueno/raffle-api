import { Prisma, PrismaClient } from '@prisma/client';
import { data } from './data';
import { DefaultArgs } from '@prisma/client/runtime/library';

export async function seedPaymentMethod(
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
) {
  for (const gateway of data) {
    await tx.gateway.upsert({
      where: {
        code: 'asaas',
      },
      update: {
        name: 'Asaas',
        code: 'asaas',
      },
      create: {
        code: 'asaas',
        name: 'Asaas',
        paymentMethods: {
          createMany: {
            data: gateway.methods.map((method) => ({
              code: method.code,
              name: method.name,
              isActive: method.isActive,
              instructions: method.instructions,
              fee: method.fee,
              feePercentage: method.feePercentage,
              deletedAt: null,
            })),
            skipDuplicates: true,
          },
        },
      },
    });
  }
}
