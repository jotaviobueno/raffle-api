import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from 'src/domain/dtos';
import { ServiceBase } from 'src/common/base';
import { AuthEntity } from 'src/domain/entities';
import { compare } from 'src/common/utils';
import { AUTH_TYPE_ENUM } from 'src/common/enums';

@Injectable()
export class AuthService implements ServiceBase<AuthEntity, CreateAuthDto> {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateAuthDto): Promise<AuthEntity> {
    switch (dto.type) {
      case AUTH_TYPE_ENUM.CUSTOMER:
        if (!dto.mobilePhone)
          throw new HttpException(
            'Mobile phone not sent',
            HttpStatus.BAD_REQUEST,
          );

        const customer = await this.userService.findCustomerByMobilePhone(
          dto.mobilePhone,
        );

        if (!customer)
          throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);

        return { token: this.generateToken(customer.id) };

      case AUTH_TYPE_ENUM.USER:
        if (!dto.email || !dto.password) {
          throw new HttpException(
            'Email or password not sent',
            HttpStatus.BAD_REQUEST,
          );
        }

        const user = await this.userService.findByEmail(dto.email);

        if (!user)
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        const passwordIsEqual = await compare(dto.password, user.password);

        if (!passwordIsEqual)
          throw new HttpException(
            'Email or password is incorrect',
            HttpStatus.UNAUTHORIZED,
          );

        return { token: this.generateToken(user.id) };

      default:
        throw new HttpException(
          'Invalid authentication type',
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  private generateToken(userId: string): string {
    const token = this.jwtService.sign({
      sub: userId,
    });

    return token;
  }
}
