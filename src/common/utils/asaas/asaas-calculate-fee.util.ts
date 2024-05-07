import { PaymentMethodEntity } from 'src/domain/entities';

export function asaasCalculateFeeUtil(
  paymentMethod: PaymentMethodEntity,
  value: number,
): number {
  let fee = 0;

  switch (paymentMethod.code) {
    case 'credit.card':
      if (value <= paymentMethod.fee) fee = paymentMethod.fee;
      else if (value <= 100) fee = value * 0.0299 + paymentMethod.fee;
      else if (value <= 200) fee = value * 0.0349 + paymentMethod.fee;
      else fee = value * 0.0399 + paymentMethod.fee;
      break;
    default:
      fee = paymentMethod.fee;
      break;
  }

  return fee;
}
