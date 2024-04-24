import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCartDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  customerId: string;
}
