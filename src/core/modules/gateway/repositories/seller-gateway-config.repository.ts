import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateSellerGatewayConfigDto } from 'src/domain/dtos';
import { SellerGatewayConfigEntity } from 'src/domain/entities';

@Injectable()
export class SellerGatewayConfigRepository extends RepositoryFactory<
  SellerGatewayConfigEntity,
  CreateSellerGatewayConfigDto
> {
  constructor() {
    super('sellerGatewayConfig');
  }

  findBySellerId(sellerId: string): Promise<SellerGatewayConfigEntity | null> {
    return this.prismaService.sellerGatewayConfig.findFirst({
      where: {
        sellerId,
        deletedAt: null,
      },
      include: {
        gateway: true,
      },
    });
  }
}
