import { PrismaClient } from '@prisma/client';
import { seedCountries } from './country/seed-countries';
import { seedCurrencies } from './currency/seed-currencies';
import { seedMenus } from './menu/seed-menus';
import { seedRoles } from './role/seed-roles';

const prisma = new PrismaClient();

async function main() {
  return prisma.$transaction(
    async (tx) => {
      await seedCountries(tx);
      await seedCurrencies(tx);
      await seedMenus(tx);
      await seedRoles(tx);
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