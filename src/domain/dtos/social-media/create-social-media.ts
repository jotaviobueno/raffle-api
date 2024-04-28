import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsUrl } from 'class-validator';

export class CreateSocialMediaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  href: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  sellerId: string;
}
