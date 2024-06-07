import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { environment } from 'src/config';
import {
  CreateAsaasCustomerDto,
  CreateAsaasPaymentDto,
  CreateSubAccountDto,
  UpdateAsaasCustomerDto,
} from 'src/domain/dtos';
import {
  AsaasCustomerEntity,
  AsaasPaymentResponseEntity,
  AssasSubcAccountEntity,
} from 'src/domain/entities';

@Injectable()
export class AsaasService {
  private isProduction = environment.NODE_ENV === 'production';
  private accessToken: string = environment.ASAAS_ACCESS_TOKEN;
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

  public async createSubAccount(
    subAccount: CreateSubAccountDto,
  ): Promise<AssasSubcAccountEntity> {
    try {
      const { data } = await this.setup().post<AssasSubcAccountEntity>(
        '/accounts',
        { ...subAccount },
      );

      return data;
    } catch (e) {
      Logger.error(
        'FAILED TO CREATE SUB ACCOUNT (ASAAS)',
        JSON.stringify(e.response.data),
      );

      throw e;
    }
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
      Logger.error(
        'FAILED TO CREATE CUSTOMER (ASAAS)',
        JSON.stringify(e.response.data),
      );
      throw e;
    }
  }

  public async preAuthorization(
    paymentId: string,
  ): Promise<AsaasPaymentResponseEntity> {
    try {
      const { data } = await this.setup().post<AsaasPaymentResponseEntity>(
        `/payments/${paymentId}/captureAuthorized`,
      );

      return data;
    } catch (e) {
      Logger.error(
        'FAILED PRE-AUTHORIZE PAYMENT (ASAAS)',
        JSON.stringify(e.response.data),
      );
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
      Logger.error(
        'FAILED TO UPDATE CUSTOMER (ASAAS)',
        JSON.stringify(e.response.data),
      );
      throw e;
    }
  }

  public async createPayment(
    dto: CreateAsaasPaymentDto,
  ): Promise<AsaasPaymentResponseEntity> {
    try {
      const { data } = await this.setup().post<AsaasPaymentResponseEntity>(
        '/payments/',
        {
          ...dto,
          interest: { value: this.interest },
          fine: { value: this.fine },
        },
      );

      return data;
    } catch (e) {
      Logger.error(
        'FAILED TO CREATE PAYMENT (ASAAS)',
        JSON.stringify(e.response.data),
      );

      throw e;
    }
  }

  public async getPixById(id: string) {
    try {
      const { data } = await this.setup().get(`/payments/${id}/pixQrCode`);

      return data;
    } catch (e) {
      Logger.error(
        'FAILED TO GET PIX (ASAAS)',
        JSON.stringify(e.response.data),
      );

      throw e;
    }
  }

  public async getStatusByPaymentId(paymentId: string) {
    try {
      const { data } = await this.setup().get(`/payments/${paymentId}/status`);

      return data;
    } catch (e) {
      Logger.error(
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
      Logger.error(
        'FAILED TO GET BANKSLIP (ASAAS)',
        JSON.stringify(e.response.data),
      );

      throw e;
    }
  }
}
