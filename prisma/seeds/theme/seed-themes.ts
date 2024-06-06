import { Prisma, PrismaClient } from '@prisma/client';
import { data } from './data';
import { DefaultArgs } from '@prisma/client/runtime/library';

export async function seedThemes(
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
) {
  await tx.theme.createMany({
    data: data.map((code) => ({ code, deletedAt: null })),
  });
}
