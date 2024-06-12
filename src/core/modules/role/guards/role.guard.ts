import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../auth/decorators';
import { ROLE_KEY } from '../decorators/role.decorator';
import { UserWithRelationsEntity } from 'src/domain/entities';
import { PERMISSION_KEY } from '../decorators';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const user = context.switchToHttp().getRequest()
      ?.user as UserWithRelationsEntity;

    const requiredRoles: string[] = this.reflector.getAllAndOverride(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const requiredPermissions: string[] = this.reflector.getAllAndOverride(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!user) return false;

    let hasPermission = false;

    for (const userRole of user.userRoles) {
      if (requiredPermissions?.length >= 1)
        for (const { permission } of userRole.role.rolePermissions) {
          if (
            requiredPermissions.some(
              (requiredPermission) => requiredPermission === permission.code,
            )
          )
            hasPermission = true;
        }

      if (
        requiredRoles?.length >= 1 &&
        requiredRoles.some(
          (requiredRole) =>
            requiredRole === userRole.role.code &&
            userRole.expiresAt &&
            userRole.expiresAt >= new Date(),
        )
      )
        hasPermission = true;
    }

    return hasPermission;
  }
}
