import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateMenuDto } from 'src/domain/dtos';
import { UpdateMenuDto } from 'src/domain/dtos/menu/update-menu.dto';
import { MenuEntity, QueryBuilderEntity } from 'src/domain/entities';

@Injectable()
export class MenuRepository extends RepositoryFactory<
  MenuEntity,
  CreateMenuDto,
  UpdateMenuDto
> {
  constructor() {
    super('menu');
  }

  findById(id: string): Promise<MenuEntity | null> {
    return this.prismaService.menu.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findAll(query: QueryBuilderEntity): Promise<MenuEntity[]> {
    return this.prismaService.menu.findMany({
      ...query,
      include: {
        subMenus: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
  }
}
