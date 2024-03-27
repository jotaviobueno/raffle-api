import { PartialType } from '@nestjs/swagger';
import { CreateSpecificationDto } from './create-specification.dto';

export class UpdateSpecification extends PartialType(CreateSpecificationDto) {
  id: string;
}
