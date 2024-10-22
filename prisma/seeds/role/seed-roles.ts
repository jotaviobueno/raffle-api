import { PrismaClient } from '@prisma/client';
import { data } from './data';

const prisma = new PrismaClient();

export async function seedRoles() {
  return prisma.$transaction(
    async (tx) => {
      for (const { name, code, permissions } of data) {
        const nameAlreadyExist = await tx.role.findFirst({
          where: {
            name: name,
            deletedAt: null,
          },
        });

        if (nameAlreadyExist) return nameAlreadyExist;

        const role = await tx.role.create({
          data: {
            name,
            code,
            deletedAt: null,
          },
        });

        const permissionsCreated = await Promise.all(
          permissions.map(async (permission) => {
            const nameAlreadyExist = await tx.permission.findFirst({
              where: {
                code: permission,
                deletedAt: null,
              },
            });

            if (nameAlreadyExist) return nameAlreadyExist;

            return tx.permission.create({
              data: {
                code: permission,
                deletedAt: null,
              },
            });
          }),
        );

        await Promise.all(
          permissionsCreated.map(async (permissionCreated) => {
            const roleAlreadyThisPermission = await tx.rolePermission.findFirst(
              {
                where: {
                  permissionId: permissionCreated.id,
                  roleId: role.id,
                  deletedAt: null,
                },
              },
            );

            if (roleAlreadyThisPermission) return nameAlreadyExist;

            return tx.rolePermission.create({
              data: {
                permissionId: permissionCreated.id,
                roleId: role.id,
                deletedAt: null,
              },
            });
          }),
        );
      }
    },
    {
      maxWait: 20000, // default: 2000
      timeout: 50000, // default: 5000
    },
  );
}
