import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateCartPaymentDto } from 'src/domain/dtos';
import { CartPaymentEntity } from 'src/domain/entities';

@Injectable()
export class CartPaymentRepository extends RepositoryFactory<
  CartPaymentEntity,
  CreateCartPaymentDto
> {
  constructor() {
    super('cartPayment');
  }
}