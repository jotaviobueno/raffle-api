import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateCouponDto,
  SearchCouponDto,
  UpdateCouponDto,
} from 'src/domain/dtos';
import {
  CouponEntity,
  FindAllResultEntity,
  RaffleCouponsEntity,
} from 'src/domain/entities';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { UtmCampaignService } from './utm-campaign.service';
import { CouponRepository } from '../repositories/coupon.repository';

@Injectable()
export class CouponService
  implements ServiceBase<CouponEntity, CreateCouponDto, UpdateCouponDto>
{
  constructor(
    private readonly utmCampaignService: UtmCampaignService,
    private readonly couponRepository: CouponRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateCouponDto): Promise<CouponEntity> {
    const codeAlreadyExist = await this.couponRepository.findByCode(dto.code);

    if (codeAlreadyExist)
      throw new HttpException('Code already exist', HttpStatus.CONFLICT);

    const utmCampaign = await this.utmCampaignService.findById(
      dto.utmCampaignId,
    );

    const coupon = await this.couponRepository.create({
      ...dto,
      utmCampaignId: utmCampaign.id,
    });

    return coupon;
  }

  async findAll({
    code,
    from,
    isActive,
    name,
    to,
    utmCampaignId,
    ...queryParams
  }: SearchCouponDto): Promise<FindAllResultEntity<CouponEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<CouponEntity> | null>(
        `coupons_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams)
      .where({
        code: code && { contains: code },
        name: name && { contains: name },
        isActive: isActive && isActive,
        utmCampaignId: utmCampaignId && utmCampaignId,
        to: to && { lte: to },
        from: from && { gte: from },
      })
      .sort()
      .pagination()
      .handle();

    const coupons = await this.couponRepository.findAll(query);
    const total = await this.couponRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`coupons_${queryParamsStringfy}`, {
      data: coupons,
      info,
    });

    return { data: coupons, info };
  }

  async findByCode(
    code: string,
  ): Promise<CouponEntity & { raffleCoupons: RaffleCouponsEntity[] }> {
    const coupon = await this.couponRepository.findByCode(code);

    if (!coupon)
      throw new HttpException('Coupon not found', HttpStatus.NOT_FOUND);

    return coupon;
  }

  async findById(id: string): Promise<CouponEntity> {
    const coupon = await this.couponRepository.findById(id);

    if (!coupon)
      throw new HttpException('Coupon not found', HttpStatus.NOT_FOUND);

    return coupon;
  }

  async update(
    dto: UpdateCouponDto & { usages?: number },
  ): Promise<CouponEntity> {
    const coupon = await this.findById(dto.id);

    if (dto.code) {
      const codeAlreadyExist = await this.couponRepository.findByCode(dto.code);

      if (codeAlreadyExist)
        throw new HttpException('Code already exist', HttpStatus.CONFLICT);
    }

    const update = await this.couponRepository.update({
      ...dto,
      id: coupon.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const coupon = await this.findById(id);

    const remove = await this.couponRepository.softDelete(coupon.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
