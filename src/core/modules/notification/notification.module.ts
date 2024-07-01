import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationGateway } from './gateways/notification.gateway';
import { NotificationRepository } from './repositories/notification.repository';

@Module({
  providers: [NotificationGateway, NotificationService, NotificationRepository],
  exports: [NotificationService],
})
export class NotificationModule {}
