import { Prisma, PrismaClient } from '@prisma/client';
import { data } from './data';
import { DefaultArgs } from '@prisma/client/runtime/library';

export async function seedOrderStatus(
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
) {
  for (const name of data) {
    const orderStatusAlreadyExist = await tx.orderStatus.findFirst({
      where: {
        name,
        deletedAt: null,
      },
    });

    if (orderStatusAlreadyExist) return;

    await tx.orderStatus.create({ data: { name, deletedAt: null } });
  }
}
