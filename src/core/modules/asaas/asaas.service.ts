import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { environment } from 'src/config';
import {
  CreateAsaasCustomerDto,
  CreateAsaasPaymentDto,
  UpdateAsaasCustomerDto,
} from 'src/domain/dtos';
import {
  AsaasCustomerEntity,
  PaymentAsaasResponseEntity,
} from 'src/domain/entities';

@Injectable()
export class AsaasService {
  private isProduction = environment.NODE_ENV === 'production';
  private accessToken: string;
  private interest = 0;
  private fine = 0;

  public setConfig(config: any): void {
    this.accessToken = config.accessToken;
    this.interest = config.interest || 0;
    this.fine = config.fine || 0;
  }

  setup() {
    if (this.isProduction)
      return axios.create({
        headers: {
          'Content-Type': 'application/json',
          access_token: this.accessToken,
        },
        baseURL: 'https://api.asaas.com/v3/',
        maxBodyLength: Infinity,
      });

    return axios.create({
      headers: {
        'Content-Type': 'application/json',
        access_token: this.accessToken,
      },
      maxBodyLength: Infinity,
      baseURL: 'https://sandbox.asaas.com/api/v3/',
    });
  }

  public async createCustomer(
    customer: CreateAsaasCustomerDto,
  ): Promise<AsaasCustomerEntity> {
    try {
      const { data } = await this.setup().post<AsaasCustomerEntity>(
        '/customers',
        { ...customer },
      );

      return data;
    } catch (e) {
      Logger.debug('FAILED TO CREATE CUSTOMER (ASAAS)', e.response.data);
      throw e;
    }
  }

  public async updateCustomer({
    id,
    ...dto
  }: UpdateAsaasCustomerDto): Promise<AsaasCustomerEntity> {
    try {
      const { data } = await this.setup().put<AsaasCustomerEntity>(
        `/customers/${id}`,
        {
          ...dto,
        },
      );

      return data;
    } catch (e) {
      Logger.debug('FAILED TO UPDATE CUSTOMER (ASAAS)', e.response.data);
      throw e;
    }
  }

  public async createPayment(
    dto: CreateAsaasPaymentDto,
  ): Promise<PaymentAsaasResponseEntity> {
    try {
      const { data } = await this.setup().post<PaymentAsaasResponseEntity>(
        '/payments',
        {
          customer: dto.customer.id,
          billingType: dto.billingType,
          value: dto.value,
          dueDate: dto.dueDate,
        },
      );

      switch (dto.billingType) {
        case 'BOLETO':
          data.interest = { value: +this.interest };
          data.fine = { value: +this.fine };
        case 'CREDIT_CARD':
          if (dto.creditCardToken) {
            data.creditCardToken = dto.creditCardToken;
          } else {
            data.creditCard = dto.creditCard;
            data.creditCardHolderInfo = dto.creditCardHolderInfo;
          }
      }

      console.log(data);

      return data;
    } catch (e) {
      Logger.debug('FAILED TO CREATE PAYMENT (ASAAS)', e.response.data);

      throw e;
    }
  }

  public async getPixById(id: string) {
    try {
      const { data } = await this.setup().get(`/payments/${id}/pixQrCode`);

      return data;
    } catch (e) {
      Logger.debug('FAILED TO GET PIX (ASAAS)', e.response.data);

      throw e;
    }
  }

  public async getStatusByPaymentId(paymentId: string) {
    try {
      const { data } = await this.setup().get(`/payments/${paymentId}/status`);

      return data;
    } catch (e) {
      Logger.debug(
        'FAILED TO GET STATUS BY PAYMENT ID (ASAAS)',
        e.response.data,
      );

      throw e;
    }
  }

  public async getBankSlip(id: string) {
    try {
      const { data } = await this.setup().get(
        `/payments/${id}/identificationField`,
      );

      return data;
    } catch (e) {
      Logger.debug('FAILED TO GET BANKSLIP (ASAAS)', e.response.data);

      throw e;
    }
  }
}
