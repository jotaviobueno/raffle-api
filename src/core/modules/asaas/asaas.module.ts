import { Module } from '@nestjs/common';
import { AsaasService } from './asaas.service';

@Module({
  providers: [AsaasService],
  exports: [AsaasService],
})
export class AsaasModule {}
