import { Inject, Injectable } from '@nestjs/common';
import { SellerService } from './seller.service';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { subMonths, subWeeks, subYears } from 'date-fns';
import { SellerDetailEntity } from 'src/domain/entities';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class SellerDetailService {
  constructor(
    private readonly sellerService: SellerService,
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findByIdAndType(
    sellerId: string,
    type: string,
  ): Promise<SellerDetailEntity> {
    const seller = await this.sellerService.findById(sellerId);

    const cache = await this.cacheManager.get<SellerDetailEntity | null>(
      `seller_detail_${sellerId}_${type}`,
    );

    if (cache) return cache;

    let data = {} as SellerDetailEntity;

    if (type === 'customers')
      data = await this.handler(seller.id, 'findCustomersDetails');
    else if (type === 'sales')
      data = await this.handler(seller.id, 'findOrdersDetails');
    else data = await this.handler(seller.id, 'findSalesDetails');

    await this.cacheManager.set(`seller_detail_${sellerId}_${type}`, data);

    return data;
  }

  private async handler(
    sellerId: string,
    getDetails: string,
  ): Promise<{
    week: { last7Days: number; lastWeek: number; percentage: number };
    month: { last30Days: number; lastMonth: number; percentage: number };
    year: { last365Days: number; lastYear: number; percentage: number };
  }> {
    const last7Days = await this[getDetails](
      sellerId,
      new Date(),
      subWeeks(new Date(), 1),
    );
    const lastWeek = await this[getDetails](
      sellerId,
      subWeeks(new Date(), 1),
      subWeeks(new Date(), 2),
    );

    const last30Days = await this[getDetails](
      sellerId,
      new Date(),
      subMonths(new Date(), 1),
    );
    const lastMonth = await this[getDetails](
      sellerId,
      subMonths(new Date(), 1),
      subMonths(new Date(), 2),
    );

    const last365Days = await this[getDetails](
      sellerId,
      new Date(),
      subYears(new Date(), 1),
    );
    const lastYear = await this[getDetails](
      sellerId,
      subYears(new Date(), 1),
      subYears(new Date(), 2),
    );

    const weekPercentage = ((last7Days - lastWeek) / lastWeek) * 100;
    const monthPercentage = ((last30Days - lastMonth) / lastMonth) * 100;
    const yearPercentage = ((last365Days - lastYear) / lastYear) * 100;

    return {
      week: {
        last7Days,
        lastWeek,
        percentage:
          weekPercentage === Infinity || Number.isNaN(weekPercentage)
            ? 0
            : weekPercentage,
      },
      month: {
        last30Days,
        lastMonth,
        percentage:
          monthPercentage === Infinity || Number.isNaN(monthPercentage)
            ? 0
            : monthPercentage,
      },
      year: {
        last365Days,
        lastYear,
        percentage:
          yearPercentage === Infinity || Number.isNaN(yearPercentage)
            ? 0
            : yearPercentage,
      },
    };
  }

  async findCustomersDetails(sellerId: string, lte: Date, gte: Date) {
    const details = await this.prismaService.customerSeller.count({
      where: {
        sellerId,
        deletedAt: null,
        createdAt: { lte, gte },
      },
    });

    return details ? details : 0;
  }

  async findOrdersDetails(sellerId: string, lte: Date, gte: Date) {
    const details = await this.prismaService.order.count({
      where: {
        sellerId,
        deletedAt: null,
        createdAt: { lte, gte },
      },
    });

    return details ? details : 0;
  }

  async findSalesDetails(
    sellerId: string,
    lte: Date,
    gte: Date,
  ): Promise<number> {
    const details = await this.prismaService.orderTotal.aggregate({
      where: {
        order: {
          sellerId,
          deletedAt: null,
          createdAt: { lte, gte },
        },
        deletedAt: null,
      },
      _sum: {
        total: true,
      },
    });

    return details._sum.total ? details._sum.total : 0;
  }
}
