import { CreateAsaasPaymentCreditCardHolderInfoDto } from 'src/domain/dtos';
import { AsaasBaseEntity } from '../base-entity';
import {
  AsaasBankSlipEntity,
  AsaasCreditCardEntity,
  AsaasDiscountEntity,
  AsaasFineEntity,
  AsaasInterestEntity,
  AsaasPixEntity,
  AsaasSplitEntity,
} from '../shared';

type BillingType = 'BOLETO' | 'CREDIT_CARD' | 'PIX';
type Cycle =
  | 'WEEKLY'
  | 'BIWEEKLY'
  | 'MONTHLY'
  | 'BIMONTHLY'
  | 'QUARTERLY'
  | 'SEMIANNUALLY'
  | 'YEARLY';
type Status = 'ACTIVE' | 'INACTIVE' | 'EXPIRED';

export class AsaasSubscriptionEntity extends AsaasBaseEntity<AsaasSubscriptionEntity> {
  id: string;
  dateCreated: Date;
  customer: string;
  paymentLink: string;
  billingType: BillingType;
  cycle: Cycle;
  value: number;
  nextDueDate: Date;
  endDate: Date;
  description: string;
  status: Status;
  discount?: AsaasDiscountEntity;
  fine?: AsaasFineEntity;
  interest?: AsaasInterestEntity;
  deleted: boolean;
  maxPayments: number;
  externalReference?: string;
  split?: AsaasSplitEntity[];
  bankSlip?: AsaasBankSlipEntity;
  pix?: AsaasPixEntity;
  creditCard?: AsaasCreditCardEntity;
  creditCardHolderInfo?: CreateAsaasPaymentCreditCardHolderInfoDto;
  creditCardToken?: string;
}
