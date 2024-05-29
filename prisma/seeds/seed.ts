import { PrismaClient } from '@prisma/client';
import { seedCountries } from './country/seed-countries';
import { seedRoles } from './role/seed-roles';
import { seedOrderStatus } from './order-status/seed-order-status';
import { seedPaymentMethod } from './payment-method/seed-payment-method';
import { seedTicketStatus } from './ticket-status/seed-ticket-status';
import { seedPlanCycle } from './plan-cycle/seed-plan-cycle';
import { seedOrderType } from './order-type/seed-order-type';

const prisma = new PrismaClient();

async function main() {
  return prisma.$transaction(
    async (tx) => {
      await seedCountries(tx);
      await seedRoles(tx);
      await seedOrderStatus(tx);
      await seedPaymentMethod(tx);
      await seedTicketStatus(tx);
      await seedPlanCycle(tx);
      await seedOrderType(tx);
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
