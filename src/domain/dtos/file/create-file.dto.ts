import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateFileDto {
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ nullable: true })
  userId?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ nullable: true })
  raffleId?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ nullable: true })
  sellerId?: string;
}
