import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators';
import { WebhookService } from '../services/webhook.service';

@Controller('webhook')
@ApiTags('webhook')
@IsPublic()
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('asaas-charge')
  @HttpCode(HttpStatus.OK)
  asaasCharge(@Body() data) {
    return this.webhookService.asaasCharge(data);
  }
}
