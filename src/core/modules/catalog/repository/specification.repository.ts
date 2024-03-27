import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateSpecificationDto } from 'src/domain/dtos/specification';
import { UpdateSpecification } from 'src/domain/dtos/specification/update-specification.dto';
import { SpecificationEntity } from 'src/domain/entities';

@Injectable()
export class SpecificationRepository extends RepositoryFactory<
  SpecificationEntity,
  CreateSpecificationDto,
  UpdateSpecification
> {
  constructor() {
    super('specification');
  }

  findByProductId(productId: string): Promise<SpecificationEntity | null> {
    return this.prismaService.specification.findFirst({
      where: {
        productId,
        deletedAt: null,
      },
    });
  }
}
