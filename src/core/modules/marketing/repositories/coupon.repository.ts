import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateCouponDto, UpdateCouponDto } from 'src/domain/dtos';
import {
  CouponEntity,
  QueryBuilderEntity,
  RaffleCouponsEntity,
} from 'src/domain/entities';

@Injectable()
export class CouponRepository extends RepositoryFactory<
  CouponEntity,
  CreateCouponDto,
  UpdateCouponDto
> {
  constructor() {
    super('coupon');
  }

  findAll(query: QueryBuilderEntity): Promise<CouponEntity[]> {
    return this.prismaService.coupon.findMany(query);
  }

  findByCode(
    code: string,
  ): Promise<(CouponEntity & { raffleCoupons: RaffleCouponsEntity[] }) | null> {
    return this.prismaService.coupon.findFirst({
      where: {
        code,
        deletedAt: null,
      },
      include: {
        raffleCoupons: true,
      },
    });
  }

  findById(id: string): Promise<CouponEntity | null> {
    return this.prismaService.coupon.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
