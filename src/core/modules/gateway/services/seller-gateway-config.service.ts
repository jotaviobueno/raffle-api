import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GatewayRepository } from '../repositories/gateway.repository';
import {
  AssasSubcAccountEntity,
  SellerEntity,
  SellerGatewayConfigEntity,
} from 'src/domain/entities';
import { SellerGatewayConfigRepository } from '../repositories/seller-gateway-config.repository';

@Injectable()
export class SellerGatewayConfigService {
  constructor(
    private readonly gatewayRepository: GatewayRepository,
    private readonly sellerGatewayConfigRepository: SellerGatewayConfigRepository,
  ) {}

  async create(dto: { data: AssasSubcAccountEntity; seller: SellerEntity }) {
    const gateway = await this.gatewayRepository.findByCode('asaas');

    const sellerGatewayConfig = await this.sellerGatewayConfigRepository.create(
      {
        gatewayId: gateway.id,
        sellerId: dto.seller.id,
        data: dto.data,
      },
    );

    return sellerGatewayConfig;
  }

  async findBySellerId(sellerId: string): Promise<SellerGatewayConfigEntity> {
    const sellerGatewayConfig =
      await this.sellerGatewayConfigRepository.findBySellerId(sellerId);

    if (!sellerGatewayConfig)
      throw new HttpException(
        'Seller gateway config not found',
        HttpStatus.NOT_FOUND,
      );

    return sellerGatewayConfig;
  }
}
