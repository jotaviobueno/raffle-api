import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateMenuDto, QueryParamsDto } from 'src/domain/dtos';
import { UpdateMenuDto } from 'src/domain/dtos/menu/update-menu.dto';
import { FindAllResultEntity, MenuEntity } from 'src/domain/entities';
import { MenuRepository } from '../repositories/menu.repository';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { QueryBuilder } from 'src/common/utils';

@Injectable()
export class MenuService
  implements ServiceBase<MenuEntity, CreateMenuDto, UpdateMenuDto>
{
  constructor(
    private readonly menuRepository: MenuRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateMenuDto): Promise<MenuEntity> {
    if (dto.parentId) await this.findById(dto.parentId);

    const menu = await this.menuRepository.create(dto);

    return menu;
  }

  async findById(id: string): Promise<MenuEntity> {
    const menu = await this.menuRepository.findById(id);

    if (!menu) throw new HttpException('menu not found', HttpStatus.NOT_FOUND);

    return menu;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<FindAllResultEntity<MenuEntity>> {
    const cache =
      await this.cacheManager.get<FindAllResultEntity<MenuEntity> | null>(
        'menus',
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams)
      .where({ parentId: null })
      .pagination()
      .handle();

    const menus = await this.menuRepository.findAll(query);
    const total = await this.menuRepository.count();

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set('menus', { data: menus, info });

    return { data: menus, info };
  }

  async update(dto: UpdateMenuDto): Promise<MenuEntity> {
    const menu = await this.findById(dto.id);

    if (dto.parentId) await this.findById(dto.parentId);

    const update = await this.menuRepository.update({ ...dto, id: menu.id });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const menu = await this.findById(id);

    const remove = await this.menuRepository.softDelete(menu.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
