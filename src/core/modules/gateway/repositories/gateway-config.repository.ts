import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateGatewayConfigDto } from 'src/domain/dtos';
import { GatewayConfigEntity } from 'src/domain/entities';

@Injectable()
export class GatewayConfigRepository extends RepositoryFactory<
  GatewayConfigEntity,
  CreateGatewayConfigDto
> {
  constructor() {
    super('gatewayConfig');
  }

  findById(id: string): Promise<GatewayConfigEntity | null> {
    return this.prismaService.gatewayConfig.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findByUserId(userId: string): Promise<GatewayConfigEntity | null> {
    return this.prismaService.gatewayConfig.findFirst({
      where: {
        userId,
        deletedAt: null,
      },
    });
  }
}
