import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'src/common/utils';
import { CreateAuthDto } from 'src/domain/dtos';
import { ServiceBase } from 'src/common/base';
import { AuthEntity } from 'src/domain/entities';

@Injectable()
export class AuthService implements ServiceBase<AuthEntity, CreateAuthDto> {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateAuthDto): Promise<AuthEntity> {
    const user = await this.userService.findByEmail(dto.email);

    const passwordIsEqual = await compare(dto.password, user.password);

    if (!passwordIsEqual)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    const token = this.jwtService.sign({
      sub: user.id,
    });

    return { token };
  }
}
