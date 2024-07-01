import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { NotificationEntity } from 'src/domain/entities';

@Injectable()
export class NotificationRepository extends RepositoryFactory<NotificationEntity> {
  constructor() {
    super('notification');
  }
}
