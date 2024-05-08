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
import { SendEmailDto } from 'src/domain/dtos';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { EmailService } from '../services/email.service';

@Processor(QUEUES_ENUM.EMAIL)
export class EmailConsumer {
  constructor(
    private readonly emailService: EmailService,
    private readonly prismaService: PrismaService,
  ) {}

  @Process(JOBS_ENUM.SEND_EMAIL_JOB)
  async sendEmail({ data }: Job<SendEmailDto>) {
    return this.emailService.sendEmail(data);
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job<SendEmailDto>, error: Error) {
    Logger.error(`Job ${job.id} failed with error: ${error.message}`);

    await this.prismaService.audit.create({
      data: {
        namespace: JOBS_ENUM.SEND_EMAIL_JOB,
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
  onQueueStalled(job: Job<SendEmailDto>) {
    Logger.error(`Job ${job.id} stalled`, { job });
  }
}
