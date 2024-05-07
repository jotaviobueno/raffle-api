import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateColorDto, UpdateColorDto } from 'src/domain/dtos';
import { ColorEntity, QueryBuilderEntity } from 'src/domain/entities';

@Injectable()
export class ColorRepository extends RepositoryFactory<
  ColorEntity,
  CreateColorDto,
  UpdateColorDto
> {
  constructor() {
    super('color');
  }

  create(data: CreateColorDto): Promise<ColorEntity> {
    return this.prismaService.color.create({
      data: {
        primary: data.primary,
        secondary: data.secondary,
        sellerId: data.sellerId,
        text: data.text,
        deletedAt: null,
        secondaryColor: {
          create: {
            primary: data.parent.primary,
            secondary: data.parent.secondary,
            text: data.parent.text,
            deletedAt: null,
          },
        },
      },
    });
  }

  findAll(query: QueryBuilderEntity): Promise<ColorEntity[]> {
    return this.prismaService.color.findMany(query);
  }

  findById(id: string): Promise<ColorEntity | null> {
    return this.prismaService.color.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
