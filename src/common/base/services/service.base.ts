import { QueryParamsDto } from 'src/domain/dtos';
import { FindAllResultEntity } from 'src/domain/entities';

export abstract class ServiceBase<Entity, CreateDto = void, UpdateDto = void> {
  abstract create?(dto: CreateDto): Promise<Entity>;
  abstract findById?(id: string): Promise<Entity>;
  abstract findAll?(
    queryParams: QueryParamsDto,
  ): Promise<FindAllResultEntity<Entity>>;
  abstract update?(dto: UpdateDto): Promise<Entity>;
  abstract remove?(id: string): Promise<boolean>;
}
