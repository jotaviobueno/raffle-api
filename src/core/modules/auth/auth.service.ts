import { Injectable } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
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
    const user = await this.userService.findByMobilePhone(dto.mobilePhone);

    // TODO: ARRUMAR LOGICA DO LOGIN, CASO USUARIO SEJA ADMIN NÃO ACEITAR O LOGIN POR APENAS TELEFONE

    const token = this.jwtService.sign({
      sub: user.id,
    });

    return { token };
  }
}
