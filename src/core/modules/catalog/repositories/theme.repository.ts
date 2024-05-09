import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateThemeDto, UpdateThemeDto } from 'src/domain/dtos';
import { ThemeEntity, QueryBuilderEntity } from 'src/domain/entities';

@Injectable()
export class ThemeRepository extends RepositoryFactory<
  ThemeEntity,
  CreateThemeDto,
  UpdateThemeDto
> {
  constructor() {
    super('theme');
  }

  create(data: CreateThemeDto): Promise<ThemeEntity> {
    return this.prismaService.theme.create({
      data: {
        primary: data.primary,
        sellerId: data.sellerId,
        text: data.text,
        link: data.link,
        font: data.font,
        deletedAt: null,
        secondaryTheme: {
          create: {
            sellerId: data.sellerId,
            primary: data.parent.primary,
            text: data.parent.text,
            link: data.parent.link,
            font: data.parent.font,
            deletedAt: null,
          },
        },
      },
    });
  }

  findAll(query: QueryBuilderEntity): Promise<ThemeEntity[]> {
    return this.prismaService.theme.findMany(query);
  }

  findById(id: string): Promise<ThemeEntity | null> {
    return this.prismaService.theme.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
