import { PrismaClient } from '@prisma/client';
import { data } from './data';

const prisma = new PrismaClient();

export async function seedPlan() {
  return prisma.$transaction(
    async (tx) => {
      for (const { planCycleCode, rolePlan, ...value } of data) {
        const planCycle = await tx.planCycle.findFirst({
          where: {
            code: planCycleCode,
            deletedAt: null,
          },
        });

        const role = await tx.role.findFirst({
          where: {
            code: rolePlan.roleCode,
            deletedAt: null,
          },
        });

        await tx.plan.create({
          data: {
            ...value,
            planCycleId: planCycle.id,
            rolePlans: {
              create: {
                roleId: role.id,
              },
            },
          },
        });
      }
    },
    {
      maxWait: 20000, // default: 2000
      timeout: 50000, // default: 5000
    },
  );
}
