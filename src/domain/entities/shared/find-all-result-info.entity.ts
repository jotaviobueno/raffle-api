import { ApiProperty } from '@nestjs/swagger';

export class FindAllResultInfoEntity {
  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: Number })
  page: number;

  @ApiProperty({ type: Number })
  pages: number;

  @ApiProperty({ type: Number })
  pageSize: number;
}
