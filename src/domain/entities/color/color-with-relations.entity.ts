import { ApiProperty } from '@nestjs/swagger';
import { ColorEntity } from './color.entity';

export class ColorWithRelationsEntity extends ColorEntity {
  @ApiProperty({ type: ColorEntity })
  secundaryColor: ColorEntity;
}
