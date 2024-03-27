import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateSpecificationDto } from 'src/domain/dtos/specification';
import { UpdateSpecification } from 'src/domain/dtos/specification/update-specification.dto';
import { SpecificationEntity } from 'src/domain/entities';
import { ProductService } from './product.service';
import { SpecificationRepository } from '../repository/specification.repository';

@Injectable()
export class SpecificationService
  implements
    ServiceBase<
      SpecificationEntity,
      CreateSpecificationDto,
      UpdateSpecification
    >
{
  constructor(
    private readonly productService: ProductService,
    private readonly specificationRepository: SpecificationRepository,
  ) {}

  async create(dto: CreateSpecificationDto): Promise<SpecificationEntity> {
    const product = await this.productService.findById(dto.productId);

    const specificationAlreadyExist =
      await this.specificationRepository.findByProductId(product.id);

    if (specificationAlreadyExist)
      throw new HttpException(
        'Product specification already exist',
        HttpStatus.BAD_REQUEST,
      );

    const specification = await this.specificationRepository.create({
      ...dto,
      productId: product.id,
    });

    return specification;
  }
}
