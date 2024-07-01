import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateWebhookDto } from 'src/domain/dtos';
import { WebhookEntity } from 'src/domain/entities';

@Injectable()
export class WebhookRepository extends RepositoryFactory<
  WebhookEntity,
  CreateWebhookDto
> {
  constructor() {
    super('webhook');
  }

  create(data: CreateWebhookDto): Promise<WebhookEntity> {
    return this.prismaService.webhook.create({
      data: {
        data: {
          toJSON() {
            return data.data;
          },
        },
        event: data.event,
      },
    });
  }

  findById(id: string): Promise<WebhookEntity | null> {
    return this.prismaService.webhook.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
