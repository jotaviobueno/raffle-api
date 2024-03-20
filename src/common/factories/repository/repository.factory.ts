import { Inject } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

export class RepositoryFactory<K, T = void, J = void> {
  @Inject(PrismaService)
  protected readonly prismaService: PrismaService;

  constructor(public model: string) {}

  create(data: T): Promise<K> {
    return this.prismaService[this.model].create({
      data: {
        ...data,
        deletedAt: null,
      },
    });
  }

  update({ id, ...data }: J & { id: string }): Promise<K | null> {
    return this.prismaService[this.model].update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  count(): Promise<number> {
    return this.prismaService[this.model].count();
  }

  softDelete(id: string): Promise<K | null> {
    return this.prismaService[this.model].update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
