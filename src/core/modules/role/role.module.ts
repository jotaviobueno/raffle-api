import { Global, Module } from '@nestjs/common';
import { RoleGuard } from './guards';

@Global()
@Module({
  providers: [RoleGuard],
  exports: [RoleGuard],
})
export class RoleModule {}
