import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { FindAllResultEntity } from 'src/domain/entities';

export const ApiOkFindAllResult = <Entity extends Type<unknown>>(
  entity: Entity,
) =>
  applyDecorators(
    ApiExtraModels(FindAllResultEntity, entity),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(FindAllResultEntity) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(entity) },
              },
            },
          },
        ],
      },
    }),
  );
