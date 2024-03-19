import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/domain/dtos';
import { UserEntity } from 'src/domain/entities';
import { UserRepository } from '../../user.repository';
import { FindByIdUserUseCase } from '../find-by-id';
import { UseCaseBase } from 'src/common/base';
import { UploadSingleFileUseCase } from 'src/core/modules/s3/use-cases';

@Injectable()
export class UpdateUserUseCase
  implements
    UseCaseBase<UpdateUserDto & { file?: Express.Multer.File }, UserEntity>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
    private readonly uploadSingleFileUseCase: UploadSingleFileUseCase,
  ) {}

  async execute({
    file,
    ...data
  }: UpdateUserDto & { file?: Express.Multer.File }): Promise<UserEntity> {
    const user = await this.findByIdUserUseCase.execute(data.id);

    const avatar =
      file &&
      (await this.uploadSingleFileUseCase.execute({ file, path: 'user' }));

    const update = await this.userRepository.update({
      ...data,
      id: user.id,
      avatar,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
