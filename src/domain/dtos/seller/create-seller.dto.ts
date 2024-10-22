import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSellerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsUUID()
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  fileId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  logo: string;

  @IsUUID()
  @IsNotEmpty()
  themeId: string;
}
