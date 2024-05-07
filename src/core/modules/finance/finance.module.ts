import { Module } from '@nestjs/common';
import { FinanceController } from './controllers/finance.controller';
import { FinanceRepository } from './repositories/finance.repository';
import { FinanceService } from './services/finance.service';

@Module({
  controllers: [FinanceController],
  providers: [FinanceRepository, FinanceService],
  exports: [FinanceRepository],
})
export class FinanceModule {}
