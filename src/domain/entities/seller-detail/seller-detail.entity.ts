export class SellerDetailEntity {
  week: { last7Days: number; lastWeek: number; percentage: number };
  year: { last365Days: number; lastYear: number; percentage: number };
  month: { last30Days: number; lastMonth: number; percentage: number };
}