import { Prisma, PrismaClient } from '@prisma/client';
import { data } from './data';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { environment } from '../../../src/config';
import { PaymentGatewayConfigEntity } from 'src/domain/entities';

export async function seedPaymentMethod(
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
) {
  let asaasPaymentGatewayConfig: PaymentGatewayConfigEntity;

  const configExist = await tx.paymentGatewayConfig.findFirst({
    where: {
      code: 'asaas',
      deletedAt: null,
    },
  });

  if (configExist) asaasPaymentGatewayConfig = configExist;
  asaasPaymentGatewayConfig = await tx.paymentGatewayConfig.create({
    data: {
      code: 'asaas',
      name: 'Asaas',
      config: {
        accessToken: environment.ASAAS_ACCESS_TOKEN,
        fine: environment.ASAAS_FINE,
        interest: environment.ASAAS_INTEREST,
      },
    },
  });

  for (const paymentMethod of data) {
    const paymentMethodAlreadyExist = await tx.paymentMethod.findFirst({
      where: {
        code: paymentMethod.code,
        deletedAt: null,
      },
    });

    if (paymentMethodAlreadyExist) return;

    await tx.paymentMethod.create({
      data: {
        ...paymentMethod,
        paymentGatewayConfigId: asaasPaymentGatewayConfig.id,
        deletedAt: null,
      },
    });
  }
}
