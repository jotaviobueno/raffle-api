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
        text: data.text,
        background: data.background,
        foreground: data.foreground,
        sellerId: data.sellerId,
        deletedAt: null,
        secondaryTheme: {
          create: {
            primary: data.parent.primary,
            text: data.parent.text,
            background: data.parent?.background,
            foreground: data.parent?.foreground,
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
