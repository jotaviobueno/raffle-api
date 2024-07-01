import { Module } from '@nestjs/common';
import { WebhookController } from './controllers/webhook.controller';
import { WebhookService } from './services/webhook.service';
import { WebhookRepository } from './repositories/webhook.repository';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [OrderModule],
  controllers: [WebhookController],
  providers: [WebhookService, WebhookRepository],
  exports: [WebhookService],
})
export class WebhookModule {}
