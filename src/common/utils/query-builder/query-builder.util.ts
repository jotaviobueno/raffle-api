import { QueryParamsDto } from 'src/domain/dtos';
import { QueryBuilderEntity } from 'src/domain/entities';

export class QueryBuilder {
  private query: QueryBuilderEntity;

  constructor(private readonly queryParams: QueryParamsDto) {
    this.query = {
      where: {
        deletedAt: null,
      },
    };
  }

  pagination() {
    const { page, pageSize } = this.queryParams;
    const skip =
      (parseInt(page.toString()) - 1) * parseInt(pageSize.toString());

    this.query['skip'] = skip;
    this.query['take'] = Number(pageSize);

    return this;
  }

  where(condition: Record<string, unknown>) {
    this.query.where = { ...this.query.where, ...condition };

    return this;
  }

  handle() {
    return this.query;
  }
}
