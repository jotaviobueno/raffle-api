import { Prisma, PrismaClient } from '@prisma/client';
import { data } from './data';
import { DefaultArgs } from '@prisma/client/runtime/library';

export async function seedRoles(
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
) {
  await tx.role.createMany({ data });
}
