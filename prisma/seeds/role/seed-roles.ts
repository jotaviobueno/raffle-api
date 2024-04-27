import { Prisma, PrismaClient } from '@prisma/client';
import { data } from './data';
import { DefaultArgs } from '@prisma/client/runtime/library';

export async function seedRoles(
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
) {
  for (const role of data) {
    const roleAlreadyExist = await tx.role.findFirst({
      where: {
        code: role.code,
        deletedAt: null,
      },
    });

    if (roleAlreadyExist) return;

    await tx.role.create({ data: { ...role, deletedAt: null } });
  }
}
