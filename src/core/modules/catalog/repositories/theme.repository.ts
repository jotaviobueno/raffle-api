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
        quaternary: data.quaternary,
        quinary: data.quinary,
        secondary: data.secondary,
        tertiary: data.tertiary,
        senary: data.senary,
        sellerId: data.sellerId,
        deletedAt: null,
        secondaryTheme: {
          create: {
            primary: data.primary,
            quaternary: data.quaternary,
            tertiary: data.tertiary,
            quinary: data.quinary,
            secondary: data.secondary,
            senary: data.senary,
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
