import { Prisma, PrismaClient } from '@prisma/client';
import { data } from './data';
import { DefaultArgs } from '@prisma/client/runtime/library';

export async function seedMenus(
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
) {
  for (const { subMenus, ...createMenuDto } of data) {
    const menu = await tx.menu.create({
      data: { ...createMenuDto, deletedAt: null },
    });

    if (subMenus && subMenus.length > 0) {
      const createSubMenusDto = subMenus.map((dto) => ({
        ...dto,
        parentId: menu.id,
        deletedAt: null,
      }));

      await tx.menu.createMany({ data: createSubMenusDto });
    }
  }
}
