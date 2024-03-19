import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CreateUserDto } from 'src/domain/dtos';
import { UserEntity } from 'src/domain/entities';
import { UserRepository } from '../../user.repository';
import { UploadSingleFileUseCase } from 'src/core/modules/s3/use-cases';

@Injectable()
export class CreateUserUseCase
  implements
    UseCaseBase<CreateUserDto & { file: Express.Multer.File }, UserEntity>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly uploadSingleFileUseCase: UploadSingleFileUseCase,
  ) {}

  async execute({
    file,
    ...data
  }: CreateUserDto & { file: Express.Multer.File }): Promise<UserEntity> {
    const avatar = await this.uploadSingleFileUseCase.execute({
      file,
      path: 'user',
    });

    const user = await this.userRepository.create({ ...data, avatar });

    return user;
  }
}
