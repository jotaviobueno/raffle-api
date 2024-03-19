import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../auth/decorators';
import { UserEntity } from 'src/domain/entities';
import { ROLE_KEY } from '../decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const user: UserEntity = context.switchToHttp().getRequest()?.user;

    const requiredRoles: string[] = this.reflector.getAllAndOverride(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!user) return false;

    let hasPermission = false;

    if (user.role === 'ADMIN') hasPermission = true;

    if (
      requiredRoles?.length >= 1 &&
      requiredRoles.some((requiredRole) => requiredRole === user.role)
    )
      hasPermission = true;

    return hasPermission;
  }
}
