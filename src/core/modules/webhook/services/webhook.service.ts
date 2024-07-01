import { Injectable } from '@nestjs/common';
import { WebhookRepository } from '../repositories/webhook.repository';
import { AsaasEventDto } from 'src/domain/entities';
import { OrderService } from '../../order/services/order.service';
import { OrderStatusService } from '../../order/services/order-status.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly webhookRepository: WebhookRepository,
    private readonly orderService: OrderService,
    private readonly orderStatusService: OrderStatusService,
  ) {}

  async asaasCharge(data: AsaasEventDto) {
    await this.webhookRepository.create({ data, event: data.event });

    const orderStatus = await this.orderStatusService.findByCode(data.event);

    const order = await this.orderService.findByExternalReference(
      data.payment.externalReference,
    );

    return this.orderService.asaasCharge({ order, data, orderStatus });
  }
}
