import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { environment } from 'src/config';
import { CreateAsaasCustomerDto, CreateAsaasPaymentDto } from 'src/domain/dtos';
import { AsaasCustomerEntity, AsaasPaymentEntity } from 'src/domain/entities';

@Injectable()
export class AsaasService {
  setup() {
    if (environment.NODE_ENV === 'production')
      return axios.create({
        headers: {
          'Content-Type': 'application/json',
          access_token: environment.ASAAS_ACCESS_TOKEN,
        },
        baseURL: 'https://api.asaas.com/v3/',
        maxBodyLength: Infinity,
      });

    return axios.create({
      headers: {
        'Content-Type': 'application/json',
        access_token: environment.ASAAS_ACCESS_TOKEN,
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
        {
          name: customer.name,
          cpfCnpj: customer.cpfCnpj.replace(/\D/g, ''),
        },
      );

      return data;
    } catch (e) {
      Logger.debug('FAILED TO CREATE CUSTOMER (ASAAS)', e.message);
      throw e;
    }
  }

  public async createPayment(
    dto: CreateAsaasPaymentDto,
  ): Promise<AsaasPaymentEntity> {
    try {
      const { data } = await this.setup().post('/payments', {
        customer: dto.customer.id,
        billingType: dto.billingType,
        value: dto.value,
        dueDate: dto.dueDate,
      });

      switch (dto.billingType) {
        case 'BOLETO':
          data.interest = { value: environment.ASAAS_INTEREST };
          data.fine = { value: environment.ASAAS_FINE };
        case 'CREDIT_CARD':
          if (dto.creditCardToken) {
            data.creditCardToken = dto.creditCardToken;
          } else {
            data.creditCard = dto.creditCard;
            data.creditCardHolderInfo = dto.creditCardHolderInfo;
          }
      }

      return data;
    } catch (e) {
      Logger.debug('FAILED TO CREATE PAYMENT (ASAAS)', e.message);

      throw e;
    }
  }

  public async getPixById(id: string) {
    try {
      const { data } = await this.setup().get(`/payments/${id}/pixQrCode`);

      return data;
    } catch (e) {
      Logger.debug('FAILED TO GET PIX (ASAAS)', e.message);

      throw e;
    }
  }

  public async getStatusByPaymentId(paymentId: string) {
    try {
      const { data } = await this.setup().get(`/payments/${paymentId}/status`);

      return data;
    } catch (e) {
      Logger.debug('FAILED TO GET STATUS BY PAYMENT ID (ASAAS)', e.message);

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
      Logger.debug('FAILED TO GET BANKSLIP (ASAAS)', e.message);

      throw e;
    }
  }
}
