import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { ThemeRepository } from '../repositories/theme.repository';
import { FindAllResultEntity, ThemeEntity } from 'src/domain/entities';
import { QueryParamsDto } from 'src/domain/dtos';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { QueryBuilder } from 'src/common/utils';

@Injectable()
export class ThemeService implements ServiceBase<ThemeEntity> {
  constructor(
    private readonly themeRepository: ThemeRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findById(code: string): Promise<ThemeEntity> {
    const theme = await this.themeRepository.findById(code);

    if (!theme)
      throw new HttpException('Theme not found', HttpStatus.NOT_FOUND);

    return theme;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<FindAllResultEntity<ThemeEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    if (queryParams.cache) {
      const cache =
        await this.cacheManager.get<FindAllResultEntity<ThemeEntity> | null>(
          `themes_${queryParamsStringfy}`,
        );

      if (cache) return cache;
    }

    const query = new QueryBuilder(queryParams)
      .sort()
      .date('createdAt')
      .pagination()
      .handle();

    const themes = await this.themeRepository.findAll(query);
    const total = await this.themeRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    if (queryParams.cache)
      await this.cacheManager.set(`themes_${queryParamsStringfy}`, {
        data: themes,
        info,
      });

    return { data: themes, info };
  }
}
