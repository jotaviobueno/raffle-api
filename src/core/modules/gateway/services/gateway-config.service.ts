import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { GatewayConfigEntity } from 'src/domain/entities';
import { GatewayConfigRepository } from '../repositories/gateway-config.repository';
import { CreateGatewayConfigDto } from 'src/domain/dtos';
import { AsaasService } from './asaas.service';

@Injectable()
export class GatewayConfigService
  implements ServiceBase<GatewayConfigEntity, CreateGatewayConfigDto>
{
  constructor(
    private readonly gatewayConfigRepository: GatewayConfigRepository,
    private readonly asaasService: AsaasService,
  ) {}

  create(dto: CreateGatewayConfigDto): Promise<GatewayConfigEntity> {
    return this.gatewayConfigRepository.create(dto);
  }

  async findByUserId(userId: string): Promise<GatewayConfigEntity> {
    const gatewayConfig =
      await this.gatewayConfigRepository.findByUserId(userId);

    if (!gatewayConfig)
      throw new HttpException('Gateway config not found', HttpStatus.NOT_FOUND);

    return gatewayConfig;
  }

  async findById(id: string): Promise<GatewayConfigEntity> {
    const gatewayConfig = await this.gatewayConfigRepository.findById(id);

    if (!gatewayConfig)
      throw new HttpException('Gateway config not found', HttpStatus.NOT_FOUND);

    return gatewayConfig;
  }
}
