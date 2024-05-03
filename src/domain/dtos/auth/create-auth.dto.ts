import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsMobilePhone()
  @IsNotEmpty()
  @ApiProperty()
  mobilePhone: string;
}
