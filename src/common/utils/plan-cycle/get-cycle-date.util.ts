import { addMonths, addWeeks, addYears } from 'date-fns';

export function getCycleDate(cycle: string): Date {
  switch (cycle) {
    case 'WEEKLY':
      return addWeeks(new Date(), 1);
    case 'BIWEEKLY':
      return addWeeks(new Date(), 2);
    case 'MONTHLY':
      return addMonths(new Date(), 1);
    case 'BIMONTHLY':
      return addMonths(new Date(), 2);
    case 'QUARTERLY':
      return addMonths(new Date(), 3);
    case 'SEMIANNUALLY':
      return addMonths(new Date(), 6);
    case 'YEARLY':
      return addYears(new Date(), 1);
    default:
      return new Date();
  }
}
