export enum ORDER_STATUS_ENUM {
  PAYMENT_CREATED = 'PAYMENT_CREATED',
  PAYMENT_AWAITING_RISK_ANALYSIS = 'PAYMENT_AWAITING_RISK_ANALYSIS',
  PAYMENT_APPROVED_BY_RISK_ANALYSIS = 'PAYMENT_APPROVED_BY_RISK_ANALYSIS',
  PAYMENT_REPROVED_BY_RISK_ANALYSIS = 'PAYMENT_REPROVED_BY_RISK_ANALYSIS',
  PAYMENT_AUTHORIZED = 'PAYMENT_AUTHORIZED',
  PAYMENT_UPDATED = 'PAYMENT_UPDATED',
  PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  PAYMENT_CREDIT_CARD_CAPTURE_REFUSED = 'PAYMENT_CREDIT_CARD_CAPTURE_REFUSED',
  PAYMENT_ANTICIPATED = 'PAYMENT_ANTICIPATED',
  PAYMENT_OVERDUE = 'PAYMENT_OVERDUE',
  PAYMENT_DELETED = 'PAYMENT_DELETED',
  PAYMENT_RESTORED = 'PAYMENT_RESTORED',
  PAYMENT_REFUNDED = 'PAYMENT_REFUNDED',
  PAYMENT_REFUND_IN_PROGRESS = 'PAYMENT_REFUND_IN_PROGRESS',
  PAYMENT_RECEIVED_IN_CASH_UNDONE = 'PAYMENT_RECEIVED_IN_CASH_UNDONE',
  PAYMENT_CHARGEBACK_REQUESTED = 'PAYMENT_CHARGEBACK_REQUESTED',
  PAYMENT_CHARGEBACK_DISPUTE = 'PAYMENT_CHARGEBACK_DISPUTE',
  PAYMENT_AWAITING_CHARGEBACK_REVERSAL = 'PAYMENT_AWAITING_CHARGEBACK_REVERSAL',
  PAYMENT_DUNNING_RECEIVED = 'PAYMENT_DUNNING_RECEIVED',
  PAYMENT_DUNNING_REQUESTED = 'PAYMENT_DUNNING_REQUESTED',
  PAYMENT_BANK_SLIP_VIEWED = 'PAYMENT_BANK_SLIP_VIEWED',
  PAYMENT_CHECKOUT_VIEWED = 'PAYMENT_CHECKOUT_VIEWED',
}