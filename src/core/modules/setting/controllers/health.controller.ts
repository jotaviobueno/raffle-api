import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { environment } from 'src/config';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly database: PrismaHealthIndicator,
    private readonly prismaService: PrismaService,
  ) {}

  @Get('ping')
  @HealthCheck()
  healthCheck() {
    return {
      status: 'pong',
      version: environment.VERSION,
    };
  }

  @Get('prisma')
  @HealthCheck()
  async checkReadiness() {
    return this.healthCheckService.check([
      async () => this.database.pingCheck('prisma', this.prismaService),
    ]);
  }
}