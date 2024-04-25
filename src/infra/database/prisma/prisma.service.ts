import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { firstLetterToLowerCaseUtil } from 'src/common/utils';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ log: ['error', 'query', 'info', 'warn'] });
  }

  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      await this.$transaction(
        async (tx) => {
          await this.handleCreateLog(params, tx);
        },
        {
          maxWait: 5000000000,
          timeout: 5500000000,
        },
      );

      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }

  private async handleCreateLog(
    params: Prisma.MiddlewareParams,
    tx: Omit<
      PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
      '$on' | '$connect' | '$disconnect' | '$use' | '$transaction' | '$extends'
    >,
  ) {
    switch (params.action) {
      case 'create': {
        if (!params.runInTransaction) return this.handleCreate(params, tx);
      }
      case 'update':
        if (!params.runInTransaction) return this.handleUpdate(params, tx);
    }
  }

  private async handleCreate(
    params: Prisma.MiddlewareParams,
    tx: Omit<
      PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
      '$on' | '$connect' | '$disconnect' | '$use' | '$transaction' | '$extends'
    >,
  ) {
    const entity = firstLetterToLowerCaseUtil(params.model);

    let data = params.args.data;

    if (entity === 'user' && data?.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...value } = data;

      data = value;
    }

    await tx.log.create({
      data: {
        query: params.args,
        entity,
        action: 'create',
        newValue: data,
        deletedAt: null,
      },
    });
  }

  private async handleUpdate(
    params: Prisma.MiddlewareParams,
    tx: Omit<
      PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
      '$on' | '$connect' | '$disconnect' | '$use' | '$transaction' | '$extends'
    >,
  ) {
    const entity = firstLetterToLowerCaseUtil(params.model);

    let data = params.args.data;

    const oldValue =
      params.args?.where?.id &&
      (await tx[entity].findUnique({
        where: {
          id: params.args.where.id,
        },
      }));

    if (entity === 'user' && data?.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...value } = data;

      data = value;
    }

    await tx.log.create({
      data: {
        query: params.args,
        entity,
        action: 'update',
        oldValue: oldValue,
        newValue: params.args['data'],
        entityId: params.args.where.id,
        deletedAt: null,
      },
    });
  }
}
