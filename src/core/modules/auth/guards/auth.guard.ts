import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators';
import { JwtService } from '@nestjs/jwt';
import { environment } from 'src/config';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request.headers);

    if (!token)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: environment.JWT_SECRET,
      });

      const user = await this.userService.findById(payload.sub);

      request['user'] = user;
    } catch (e) {
      Logger.debug('FAILED TO AUTH', e.message);

      throw new HttpException('Failed to auth', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }

  private extractTokenFromHeader(headers: any): string | undefined {
    if (!headers?.authorization) return undefined;

    const [type, authorization] = headers.authorization.split(' ');

    return type === 'Bearer' ? authorization : undefined;
  }
}
