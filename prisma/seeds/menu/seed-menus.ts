import { PrismaClient } from '@prisma/client';
import { data } from './data';

const prisma = new PrismaClient();

async function main() {
  return prisma.$transaction(
    async (tx) => {
      for (const { subMenus, ...createMenuDto } of data) {
        const menu = await tx.menu.create({ data: { ...createMenuDto } });

        if (subMenus && subMenus.length > 0) {
          const createSubMenusDto = subMenus.map((dto) => ({
            ...dto,
            parentId: menu.id,
          }));

          await tx.menu.createMany({ data: createSubMenusDto });
        }
      }
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
