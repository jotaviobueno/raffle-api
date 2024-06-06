import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ nullable: true })
  sellerId: string;
}
