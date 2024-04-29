import { Module } from '@nestjs/common';
import { AsaasService } from './asaas.service';
import { AsaasGateway } from './gateway/asaas.gateway';

@Module({
  providers: [AsaasService, AsaasGateway],
  exports: [AsaasService, AsaasGateway],
})
export class AsaasModule {}
