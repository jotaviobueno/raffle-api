import { IsNotEmpty, IsString, IsUUID, IsUrl } from 'class-validator';

export class CreateSocialMediaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  href: string;

  @IsUUID()
  @IsNotEmpty()
  sellerId: string;
}
