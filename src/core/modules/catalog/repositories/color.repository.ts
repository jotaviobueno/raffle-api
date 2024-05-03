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
        secundary: data.secundary,
        sellerId: data.sellerId,
        text: data.text,
        deletedAt: null,
        secundaryColor: {
          create: {
            primary: data.parent.primary,
            secundary: data.parent.secundary,
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
