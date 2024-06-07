import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateSellerDto,
  SearchSellerDto,
  UpdateSellerDto,
} from 'src/domain/dtos';
import {
  FindAllResultEntity,
  SellerEntity,
  SellerWithRelationsEntity,
} from 'src/domain/entities';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { QueryBuilder } from 'src/common/utils';
import { UserService } from '../../user/services/user.service';
import { SellerRepository } from '../repositories/seller.repository';
import { ThemeService } from './theme.service';
import { AsaasService } from '../../asaas/asaas.service';
import { AddressService } from '../../user/services/address.service';
import { environment } from 'src/config';
import { SellerGatewayConfigService } from '../../gateway/services/seller-gateway-config.service';

@Injectable()
export class SellerService
  implements ServiceBase<SellerEntity, CreateSellerDto, UpdateSellerDto>
{
  constructor(
    private readonly sellerRepository: SellerRepository,
    private readonly addressService: AddressService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly themeService: ThemeService,
    private readonly sellerGatewayConfigService: SellerGatewayConfigService,
    private readonly assasService: AsaasService,
  ) {}

  async create({ addressId, ...dto }: CreateSellerDto): Promise<SellerEntity> {
    const user = await this.userService.findById(dto.userId);

    const address = await this.addressService.findById(addressId);

    const theme = await this.themeService.findById(dto.themeId);

    const data = await this.assasService.createSubAccount({
      name: 'VENDEDOR - ' + dto.name,
      email: user.email,
      cpfCnpj: user.document.replace(/[\.-]/g, ''),
      mobilePhone: user.mobilePhone.replace(/[\D+55]/g, ''),
      phone: user?.phone?.replace(/[\D+55]/g, ''),
      address: address.street,
      addressNumber: address.number,
      complement: address.complement,
      province: address.neighborhood,
      postalCode: address.postcode,
      incomeValue: user.incomeValue,
      companyType: user.type != 'PF' && user.type != 'PJ' ? user.type : null,
      birthDate: user.birthDate,
      webhooks: [
        {
          apiVersion: 3,
          email: environment.ASSAS_WARNING_EMAIL,
          events: [
            'PAYMENT_AUTHORIZED',
            'PAYMENT_APPROVED_BY_RISK_ANALYSIS',
            'PAYMENT_CREATED',
            'PAYMENT_CONFIRMED',
            'PAYMENT_ANTICIPATED',
            'PAYMENT_DELETED',
            'PAYMENT_REFUNDED',
            'PAYMENT_REFUND_DENIED',
            'PAYMENT_CHARGEBACK_REQUESTED',
            'PAYMENT_AWAITING_CHARGEBACK_REVERSAL',
            'PAYMENT_DUNNING_REQUESTED',
            'PAYMENT_CHECKOUT_VIEWED',
            'PAYMENT_PARTIALLY_REFUNDED',
            'PAYMENT_AWAITING_RISK_ANALYSIS',
            'PAYMENT_REPROVED_BY_RISK_ANALYSIS',
            'PAYMENT_UPDATED',
            'PAYMENT_RECEIVED',
            'PAYMENT_OVERDUE',
            'PAYMENT_RESTORED',
            'PAYMENT_REFUND_IN_PROGRESS',
            'PAYMENT_RECEIVED_IN_CASH_UNDONE',
            'PAYMENT_CHARGEBACK_DISPUTE',
            'PAYMENT_DUNNING_RECEIVED',
            'PAYMENT_BANK_SLIP_VIEWED',
            'PAYMENT_CREDIT_CARD_CAPTURE_REFUSED',
          ],
          enabled: true,
          interrupted: false,
          name: 'VENDEDOR - ' + dto.name,
          sendType: 'SEQUENTIALLY',
          url: environment.ASSAS_WEBHOOK_URL,
        },
      ],
    });

    const seller = await this.sellerRepository.create({
      ...dto,
      userId: user.id,
      themeId: theme.id,
    });

    await this.sellerGatewayConfigService.create({ data, seller });

    return seller;
  }

  async findByIdAndPopulate(id: string): Promise<SellerWithRelationsEntity> {
    const seller = await this.sellerRepository.findByIdAndPopulate(id);

    if (!seller)
      throw new HttpException('seller not found', HttpStatus.NOT_FOUND);

    return seller;
  }

  async findById(id: string): Promise<SellerEntity> {
    const seller = await this.sellerRepository.findById(id);

    if (!seller)
      throw new HttpException('seller not found', HttpStatus.NOT_FOUND);

    return seller;
  }

  async findAll(
    queryParams: SearchSellerDto,
  ): Promise<FindAllResultEntity<SellerEntity>> {
    const { name, userId } = queryParams;

    const queryParamsStringfy = JSON.stringify(queryParams);

    if (queryParams.cache) {
      const cache =
        await this.cacheManager.get<FindAllResultEntity<SellerEntity> | null>(
          `sellers_${queryParamsStringfy}`,
        );

      if (cache) return cache;
    }

    const query = new QueryBuilder(queryParams)
      .where({
        name: name && { contains: name },
        userId: userId && userId,
      })
      .sort()
      .date('createdAt')
      .pagination()
      .handle();

    const sellers = await this.sellerRepository.findAll(query);
    const total = await this.sellerRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    if (queryParams.cache)
      await this.cacheManager.set(`sellers_${queryParamsStringfy}`, {
        data: sellers,
        info,
      });

    return { data: sellers, info };
  }

  async update(dto: UpdateSellerDto): Promise<SellerEntity> {
    const seller = await this.findById(dto.id);

    if (dto.themeId) await this.themeService.findById(dto.themeId);

    const update = await this.sellerRepository.update({
      ...dto,
      id: seller.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const seller = await this.findById(id);

    const remove = await this.sellerRepository.softDelete(seller.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
