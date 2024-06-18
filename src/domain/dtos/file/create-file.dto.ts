import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateFileDto {
  @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  sellerId?: string;
}
