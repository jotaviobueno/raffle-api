import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../auth/decorators';
import { ROLE_KEY } from '../decorators/role.decorator';
import { UserService } from '../../user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const userId = context.switchToHttp().getRequest()?.userId;

    if (!userId) return false;

    const user = await this.userService.findByIdAndPopulate(userId);

    const requiredRoles: string[] = this.reflector.getAllAndOverride(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!user) return false;

    let hasPermission = false;

    for (const userRole of user.userRoles) {
      if (userRole.role.name === 'ADMIN' || userRole.role.name === 'DEV')
        hasPermission = true;

      if (
        requiredRoles?.length >= 1 &&
        requiredRoles.some(
          (requiredRole) => requiredRole === userRole.role.name,
        )
      )
        hasPermission = true;
    }

    return hasPermission;
  }
}
