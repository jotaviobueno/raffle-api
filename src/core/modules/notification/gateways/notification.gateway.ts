import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { NotificationService } from '../services/notification.service';

@WebSocketGateway()
export class NotificationGateway {
  constructor(private readonly notificationService: NotificationService) {}

  // @SubscribeMessage('notification')
  // findOne(@MessageBody() id: number) {
  //   return this.notificationService.findOne(id);
  // }
}
