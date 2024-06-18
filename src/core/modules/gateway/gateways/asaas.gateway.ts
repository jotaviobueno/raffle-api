import { Injectable } from '@nestjs/common';
import { AsaasGatewayEntity } from 'src/domain/entities';
import { AsaasGatewayDto } from 'src/domain/dtos';
import { AsaasService } from '../services/asaas.service';
import { PaymentGateway } from '../../payment/gateway/payment.gateway';
import { CreateAsaasCustomerUseCase } from '../use-cases/customer';
import { AsaasHandlerUseCase } from '../use-cases/handler';

@Injectable()
export class AsaasGateway extends PaymentGateway<AsaasGatewayEntity> {
  private code: 'asaas';
  private config = {};

  constructor(
    private readonly asaasService: AsaasService,
    private readonly createAsaasCustomerUseCase: CreateAsaasCustomerUseCase,
    private readonly asaasHandlerUseCase: AsaasHandlerUseCase,
  ) {
    super();
  }

  public getCode(): string {
    return this.code;
  }

  public setConfig(config: any): void {
    this.config = config;
  }

  public async process(data: AsaasGatewayDto): Promise<AsaasGatewayEntity> {
    this.asaasService.setConfig(this.config);

    const customer = await this.createAsaasCustomerUseCase.execute(data);

    return this.asaasHandlerUseCase.execute({
      customer,
      ...data,
    });
  }
}
