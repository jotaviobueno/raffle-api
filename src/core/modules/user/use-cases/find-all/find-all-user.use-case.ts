import { Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { UserEntity } from 'src/domain/entities';
import { UserRepository } from '../../user.repository';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { QueryBuilder } from 'src/common/utils';

@Injectable()
export class FindAllUserUseCase
  implements UseCaseBase<QueryParamsDto, UserEntity[]>
{
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute(data: QueryParamsDto): Promise<UserEntity[]> {
    const cache = await this.cacheManager.get<UserEntity[] | null>('users');

    if (cache) return cache;

    const query = new QueryBuilder(data).pagination().handle();

    const users = await this.userRepository.findAll(query);

    await this.cacheManager.set('users', users);

    return users;
  }
}
