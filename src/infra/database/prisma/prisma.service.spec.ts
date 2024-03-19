import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { prismaModuleMock } from './prisma.module';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(prismaModuleMock).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
