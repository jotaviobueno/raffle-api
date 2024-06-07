import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { GatewayEntity } from 'src/domain/entities';
import { GatewayRepository } from '../repositories/gateway.repository';

@Injectable()
export class GatewayService implements ServiceBase<GatewayEntity> {
  constructor(private readonly gatewayRepository: GatewayRepository) {}

  async findByCode(code: string): Promise<GatewayEntity> {
    const gateway = await this.gatewayRepository.findByCode(code);

    if (!gateway)
      throw new HttpException('Gateway not found', HttpStatus.NOT_FOUND);

    return gateway;
  }

  async findById(id: string): Promise<GatewayEntity> {
    const gateway = await this.gatewayRepository.findById(id);

    if (!gateway)
      throw new HttpException('Gateway not found', HttpStatus.NOT_FOUND);

    return gateway;
  }
}
