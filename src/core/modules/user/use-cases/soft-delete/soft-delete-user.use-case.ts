import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UserRepository } from '../../user.repository';
import { FindByIdUserUseCase } from '../find-by-id';

@Injectable()
export class SoftDeleteUserUseCase implements UseCaseBase<string, boolean> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const user = await this.findByIdUserUseCase.execute(data);

    const remove = await this.userRepository.softDelete(user.id);

    if (!remove)
      throw new HttpException('Failed to remove.', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
