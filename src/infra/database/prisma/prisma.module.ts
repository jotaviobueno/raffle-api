import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

export const prismaModuleMock = {
  providers: [PrismaService],
  exports: [PrismaService],
};

@Global()
@Module(prismaModuleMock)
export class PrismaModule {}
