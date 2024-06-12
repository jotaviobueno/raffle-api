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
import { SendEmailDto, UserRoleConsumerDto } from 'src/domain/dtos';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { getCycleDate } from 'src/common/utils';
import { AsaasService } from '../../gateway/services/asaas.service';
import { environment } from 'src/config';

@Processor(QUEUES_ENUM.USER_ROLE)
export class UserRoleConsumer {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly asaasService: AsaasService,
  ) {}

  @Process(JOBS_ENUM.ASSIGN_USER_ROLE_PLAN)
  async assignUserRolePlan({ data }: Job<UserRoleConsumerDto>) {
    return this.prismaService.$transaction(
      async (tx) => {
        for (const plan of data.plans) {
          for (const rolePlan of plan.rolePlans) {
            const userRoleAlreadyExists = await tx.userRole.findFirst({
              where: {
                userId: data.orderCustomer.customerId,
                roleId: rolePlan.roleId,
                deletedAt: null,
              },
            });

            if (userRoleAlreadyExists) {
              await tx.userRole.update({
                where: {
                  id: userRoleAlreadyExists.id,
                },
                data: {
                  expiresAt: getCycleDate(plan.planCycle.code),
                },
              });
            } else {
              await tx.userRole.create({
                data: {
                  roleId: rolePlan.roleId,
                  userId: data.orderCustomer.customerId,
                  expiresAt: getCycleDate(plan.planCycle.code),
                  deletedAt: null,
                },
              });
            }
          }

          const gatewayConfig = await this.prismaService.gateway.findFirst({
            where: {
              code: 'asaas',
            },
            include: {
              paymentMethods: true,
            },
          });

          const userAlreadyHaveGatewayConfig = await tx.gatewayConfig.findFirst(
            {
              where: {
                userId: data.orderCustomer.customerId,
                gatewayId: gatewayConfig.id,
                deletedAt: null,
              },
            },
          );

          if (userAlreadyHaveGatewayConfig) return userAlreadyHaveGatewayConfig;

          const subAccount = await this.asaasService.createSubAccount({
            address: data.address.street,
            addressNumber: data.address.number,
            complement: data.address.complement,
            cpfCnpj: data.orderCustomer.document,
            mobilePhone: data.orderCustomer.mobilePhone?.replace(
              /[\D+55]/g,
              '',
            ),
            phone: data.orderCustomer.phone?.replace(/[\D+55]/g, ''),
            email: data.orderCustomer.email,
            name: data.orderCustomer.name,
            province: data.address.state.name,
            birthDate: data.orderCustomer.birthDate,
            // companyType,
            postalCode: data.address.postcode,
            incomeValue: data.orderCustomer.incomeValue,
            webhooks: [
              {
                apiVersion: 3,
                name: 'Eventos de pagamentos',
                url: environment.ASSAS_WEBHOOK_URL,
                events: [
                  'PAYMENT_CREATED',
                  'PAYMENT_AWAITING_RISK_ANALYSIS',
                  'PAYMENT_APPROVED_BY_RISK_ANALYSIS',
                  'PAYMENT_REPROVED_BY_RISK_ANALYSIS',
                  'PAYMENT_AUTHORIZED',
                  'PAYMENT_UPDATED',
                  'PAYMENT_CONFIRMED',
                  'PAYMENT_RECEIVED',
                  'PAYMENT_CREDIT_CARD_CAPTURE_REFUSED',
                  'PAYMENT_ANTICIPATED',
                  'PAYMENT_OVERDUE',
                  'PAYMENT_DELETED',
                  'PAYMENT_RESTORED',
                  'PAYMENT_REFUNDED',
                  'PAYMENT_PARTIALLY_REFUNDED',
                  'PAYMENT_REFUND_IN_PROGRESS',
                  'PAYMENT_RECEIVED_IN_CASH_UNDONE',
                  'PAYMENT_CHARGEBACK_REQUESTED',
                  'PAYMENT_CHARGEBACK_DISPUTE',
                  'PAYMENT_AWAITING_CHARGEBACK_REVERSAL',
                  'PAYMENT_DUNNING_RECEIVED',
                  'PAYMENT_DUNNING_REQUESTED',
                  'PAYMENT_BANK_SLIP_VIEWED',
                  'PAYMENT_CHECKOUT_VIEWED',
                ],
                email: environment.ASSAS_WARNING_EMAIL,
                sendType: 'SEQUENTIALLY',
                enabled: true,
                interrupted: false,
              },
            ],
          });

          await tx.gatewayConfig.create({
            data: {
              config: {
                toJSON() {
                  return {
                    id: subAccount.id,
                    accountNumber: subAccount.accountNumber,
                    bankSlip: {
                      fine: 2,
                      interest: 1,
                    },
                    walletId: subAccount.walletId,
                    accessToken: subAccount.apiKey,
                    $raw: subAccount,
                  };
                },
              },
              deletedAt: null,
              gatewayId: gatewayConfig.id,
              userId: data.orderCustomer.customerId,
            },
          });

          this.prismaService.setConfig({ accessToken: subAccount.apiKey });
          const fees = await this.asaasService.recoverAccountFees();

          // const creditCardPaymentMethod = gatewayConfig.paymentMethods.find(
          //   (paymentMethod) => paymentMethod.code === 'credit.card',
          // );
          // const pixPaymentMethod = gatewayConfig.paymentMethods.find(
          //   (paymentMethod) => paymentMethod.code === 'pix',
          // );
          // const bankSlipPaymentMethod = gatewayConfig.paymentMethods.find(
          //   (paymentMethod) => paymentMethod.code === 'bank.slip',
          // );

          const values = [];

          for (const paymentMethod of gatewayConfig.paymentMethods) {
            switch (paymentMethod.code) {
              case 'credit.card':
                values.push({
                  gatewayConfigId: gatewayConfig.id,
                  paymentMethodId: paymentMethod.id,
                  fees: fees,
                });
                break;
              case 'pix':
                values.push({
                  gatewayConfigId: gatewayConfig.id,
                  paymentMethodId: paymentMethod.id,
                  fees: fees,
                });
                break;
              case 'bank.slip':
                values.push({
                  gatewayConfigId: gatewayConfig.id,
                  paymentMethodId: paymentMethod.id,
                  fees: fees,
                });
                break;
            }
          }

          await tx.gatewayFee.createMany({ data: values });
        }
      },
      {
        maxWait: 20000, // default: 2000
        timeout: 50000, // default: 5000
      },
    );
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job<SendEmailDto>, error: Error) {
    Logger.error(`Job ${job.id} failed with error: ${error.message}`);

    await this.prismaService.audit.create({
      data: {
        namespace: JOBS_ENUM.ASSIGN_USER_ROLE_PLAN,
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
