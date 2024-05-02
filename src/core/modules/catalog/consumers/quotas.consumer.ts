import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { JOBS_ENUM, QUEUES_ENUM } from 'src/common/enums';
import { addZeroLeft, randomNumberWithRangeUtil } from 'src/common/utils';
import { CreateQuotasDto } from 'src/domain/dtos';
import { RaffleEntity } from 'src/domain/entities';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Processor(QUEUES_ENUM.QUOTAS)
export class QuotasConsumer {
  constructor(private readonly prismaService: PrismaService) {}

  @Process(JOBS_ENUM.CREATE_MANY_QUOTAS_JOB)
  async createQuotas({
    data,
  }: Job<{
    raffle: RaffleEntity;
    dto: CreateQuotasDto;
  }>) {
    const createQuotasDtos = Array.from({
      length: data.dto.quantity,
    }).map(() => ({
      customerId: data.dto.customerId,
      raffleId: data.dto.raffleId,
      number: addZeroLeft(
        +randomNumberWithRangeUtil(
          data.raffle.initial,
          data.raffle.final,
          data.raffle.digits,
        ),
        data.raffle.digits,
      ),
      deletedAt: null,
    }));

    await this.prismaService.quotas.createMany({
      data: createQuotasDtos,
      skipDuplicates: true,
    });
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}
