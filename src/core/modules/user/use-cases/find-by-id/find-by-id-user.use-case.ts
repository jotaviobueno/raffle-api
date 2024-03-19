import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UserEntity } from 'src/domain/entities';
import { UserRepository } from '../../user.repository';

@Injectable()
export class FindByIdUserUseCase implements UseCaseBase<string, UserEntity> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(data);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }
}
