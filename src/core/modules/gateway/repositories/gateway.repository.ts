import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { GatewayEntity } from 'src/domain/entities';

@Injectable()
export class GatewayRepository extends RepositoryFactory<GatewayEntity> {
  constructor() {
    super('gateway');
  }

  findByCode(code: string): Promise<GatewayEntity | null> {
    return this.prismaService.gateway.findFirst({
      where: {
        code,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<GatewayEntity | null> {
    return this.prismaService.gateway.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
