import { ApiProperty } from '@nestjs/swagger';
import { FileEntity } from '../file';
import { RaffleFileEntity } from './raffle-files.entity';

export class RaffleFileWithRelationsEntity extends RaffleFileEntity {
  @ApiProperty({ type: FileEntity })
  file: FileEntity;
}
