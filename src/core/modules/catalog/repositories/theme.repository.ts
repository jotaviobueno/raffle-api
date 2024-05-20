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
        senary: data.senary,
        tertiary: data.tertiary,
        deletedAt: null,
        secondaryTheme: {
          create: {
            primary: data.parent.primary,
            quaternary: data.parent.quaternary,
            quinary: data.parent.quinary,
            secondary: data.parent.secondary,
            senary: data.parent.senary,
            tertiary: data.parent.tertiary,
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
