import { PrismaClient } from '@prisma/client';
import { seedCountries } from './country/seed-countries';
import { seedRoles } from './role/seed-roles';
import { seedOrderStatus } from './order-status/seed-order-status';
import { seedTicketStatus } from './ticket-status/seed-ticket-status';
import { seedPlanCycle } from './plan-cycle/seed-plan-cycle';
import { seedThemes } from './theme/seed-themes';
import { seedGateway } from './gateway/seed-gateway';
import { seedPlan } from './plan/seed-plan';

const prisma = new PrismaClient();

async function main() {
  await seedCountries();
  await seedRoles();
  await seedOrderStatus();
  await seedGateway();
  await seedTicketStatus();
  await seedPlanCycle();
  await seedThemes();
  await seedPlan();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
