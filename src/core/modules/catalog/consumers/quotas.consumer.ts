import {
  OnQueueError,
  OnQueueFailed,
  OnQueueStalled,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { JOBS_ENUM, QUEUES_ENUM } from 'src/common/enums';
import { addZeroLeft } from 'src/common/utils';
import { JobQuotasDto } from 'src/domain/dtos';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Processor(QUEUES_ENUM.QUOTAS)
export class QuotasConsumer {
  constructor(private readonly prismaService: PrismaService) {}

  @Process(JOBS_ENUM.CREATE_MANY_QUOTAS_JOB)
  async createQuotas({ data }: Job<JobQuotasDto>) {
    const createQuotasDtos = Array.from({
      length: data.dto.quantity,
    }).map(() => ({
      customerId: data.dto.customerId,
      raffleId: data.dto.raffleId,
      number: addZeroLeft(
        data.raffle.initial,
        data.raffle.final,
        data.raffle.digits,
      ),
      deletedAt: null,
    }));

    return this.prismaService.$transaction(
      async (tx) => {
        await tx.quotas.createMany({
          data: createQuotasDtos,
          skipDuplicates: true,
        });

        const values = {
          progressPercentage:
            ((data.raffle.payeds + data.dto.quantity) /
              data.raffle.totalNumbers) *
            100,
          payeds: {
            increment: data.dto.quantity,
          },
        };

        await tx.raffle.update({
          where: {
            id: data.raffle.id,
          },
          data: {
            ...values,
            isFinished: values.progressPercentage >= 100,
          },
        });
      },
      {
        maxWait: 200_000, // default: 2000
        timeout: 500_000, // default: 5000
      },
    );
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job<JobQuotasDto>, error: Error) {
    Logger.error(`Job ${job.id} failed with error: ${error.message}`);

    await this.prismaService.audit.create({
      data: {
        namespace: JOBS_ENUM.CREATE_MANY_QUOTAS_JOB,
        action: 'queue-job-failed',
        resources: job.id.toString(),
        meta: job,
        deletedAt: null,
      },
    });
  }

  @OnQueueError()
  onQueueError(error: Error) {
    Logger.error(`Queue error: ${error.message}`, { error });
  }

  @OnQueueStalled()
  onQueueStalled(job: Job<JobQuotasDto>) {
    Logger.error(`Job ${job.id} stalled`, { job });
  }
}
