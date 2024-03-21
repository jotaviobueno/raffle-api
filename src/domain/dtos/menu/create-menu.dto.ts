import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMenuDto {
  @IsOptional()
  @IsString()
  label?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsNotEmpty()
  href: string;

  @IsUUID()
  @IsOptional()
  parentId?: string;
}
